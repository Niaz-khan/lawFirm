from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .views import (
    AdminPracticeAreaViewSet,
    AdminTeamMemberViewSet,
    AdminTestimonialViewSet,
    AdminContactInquiryViewSet,
    AdminOfficeViewSet,
    AdminStaticPageViewSet,
    admin_dashboard,
)

router = DefaultRouter()
router.register("practice-areas", AdminPracticeAreaViewSet)
router.register("team", AdminTeamMemberViewSet)
router.register("testimonials", AdminTestimonialViewSet)
router.register("inquiries", AdminContactInquiryViewSet)
router.register("offices", AdminOfficeViewSet)
router.register("pages", AdminStaticPageViewSet)

urlpatterns = [
    path("dashboard/", admin_dashboard, name="admin-dashboard"),
    path("token/", TokenObtainPairView.as_view(), name="token-obtain"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token-refresh"),
    path("", include(router.urls)),
]
