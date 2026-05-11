from django.urls import path
from .views import EmployerApplicantsView, JobListView, MyPostedJobsView, ResetSwipesView, SwipeView, LikedJobsView, MatchListView, MessageView, CreateJobView

urlpatterns = [
    path("", JobListView.as_view(), name="job-list"),
    path("swipe/", SwipeView.as_view(), name="swipe"),
    path("liked/", LikedJobsView.as_view(), name="liked-jobs"),
    path("matches/", MatchListView.as_view(), name="matches"),
    path("messages/<int:job_id>/", MessageView.as_view(), name="messages"),
    path("reset-swipes/", ResetSwipesView.as_view(), name="reset-swipes"),
    path("create/", CreateJobView.as_view(), name="create-job"),
    path("posted/", MyPostedJobsView.as_view(), name="posted-jobs"),
    path("applicants/", EmployerApplicantsView.as_view(), name="applicants"),
]