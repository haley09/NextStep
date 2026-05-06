from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Job, Swipe, Match, Message
from .serializers import JobSerializer


class JobListView(generics.ListAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer

class SwipeView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        job_id = request.data.get("job_id")
        liked = request.data.get("liked")

        Swipe.objects.create(
            user=request.user,
            job_id=job_id,
            liked=liked
        )

        if liked:
            # Check for a match (for simplicity, we assume the company also "likes" the user)
            Match.objects.get_or_create(
                user=request.user,
                job_id=job_id
            )

        return Response({"message": "Swipe saved"})
    
class ResetSwipesView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        Swipe.objects.filter(user=request.user).delete()
        return Response({"message": "All swipes reset"})

class LikedJobsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        swipes = Swipe.objects.filter(user=request.user, liked=True)
        jobs = [swipe.job for swipe in swipes]

        serializer = JobSerializer(jobs, many=True)
        return Response(serializer.data)

class MatchListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        matches = Match.objects.filter(user=request.user)
        jobs = [match.job for match in matches]

        serializer = JobSerializer(jobs, many=True)
        return Response(serializer.data)
    
class MessageView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, job_id):
        messages = Message.objects.filter(job_id=job_id)
        data = [
            {
                "id" : m.id,
                "sender": m.sender.email,
                "content": m.content,
                "created_at": m.created_at
            }
            for m in messages
        ]
        return Response(data)
    
    def post(self, request, job_id):
        content = request.data.get("content")
        
        Message.objects.create(
            sender=request.user,
            job_id=job_id,
            content=content
        )
        return Response({"message": "Message sent"})
    
class CreateJobView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        if request.user.role != "employer":
            return Response({"error": "Only employers can create jobs"}, status=403)

        job = Job.objects.create(
            employer=request.user,
            title=request.data.get("title"),
            company=request.data.get("company"),
            description=request.data.get("description"),
            location=request.data.get("location")
        )

        serializer = JobSerializer(job)
        return Response({"message": "Job created", "job": serializer.data}, status=201)