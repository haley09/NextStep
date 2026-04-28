from django.urls import path
from .views import JobListView, SwipeView, LikedJobsView, MatchListView, MessageView

urlpatterns = [
    path("", JobListView.as_view(), name="job-list"),
    path("swipe/", SwipeView.as_view(), name="swipe"),
    path("liked/", LikedJobsView.as_view(), name="liked-jobs"),
    path("matches/", MatchListView.as_view(), name="matches"),
    path("messages/<int:job_id>/", MessageView.as_view(), name="messages"),
]