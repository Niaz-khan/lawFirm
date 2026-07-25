from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import PracticeAreaViewSet

router = DefaultRouter()
router.register("", PracticeAreaViewSet, basename="practice-area")

urlpatterns = [
    path("", include(router.urls)),
]
