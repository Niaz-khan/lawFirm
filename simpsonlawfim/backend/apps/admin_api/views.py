from rest_framework import viewsets, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from apps.practice_areas.models import PracticeArea
from apps.team.models import TeamMember
from apps.testimonials.models import Testimonial
from apps.inquiries.models import ContactInquiry
from apps.offices.models import Office
from apps.pages.models import StaticPage

from .serializers import (
    AdminPracticeAreaSerializer,
    AdminTeamMemberSerializer,
    AdminTestimonialSerializer,
    AdminContactInquirySerializer,
    AdminOfficeSerializer,
    AdminStaticPageSerializer,
)


class IsAdminUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated


class AdminPracticeAreaViewSet(viewsets.ModelViewSet):
    queryset = PracticeArea.objects.all().order_by("order")
    serializer_class = AdminPracticeAreaSerializer
    permission_classes = [IsAdminUser]
    lookup_field = "slug"


class AdminTeamMemberViewSet(viewsets.ModelViewSet):
    queryset = TeamMember.objects.all().order_by("order")
    serializer_class = AdminTeamMemberSerializer
    permission_classes = [IsAdminUser]
    lookup_field = "slug"


class AdminTestimonialViewSet(viewsets.ModelViewSet):
    queryset = Testimonial.objects.all()
    serializer_class = AdminTestimonialSerializer
    permission_classes = [IsAdminUser]


class AdminContactInquiryViewSet(viewsets.ModelViewSet):
    queryset = ContactInquiry.objects.all()
    serializer_class = AdminContactInquirySerializer
    permission_classes = [IsAdminUser]
    http_method_names = ["get", "patch", "delete", "head", "options"]


class AdminOfficeViewSet(viewsets.ModelViewSet):
    queryset = Office.objects.all()
    serializer_class = AdminOfficeSerializer
    permission_classes = [IsAdminUser]


class AdminStaticPageViewSet(viewsets.ModelViewSet):
    queryset = StaticPage.objects.all()
    serializer_class = AdminStaticPageSerializer
    permission_classes = [IsAdminUser]
    lookup_field = "slug"


@api_view(["GET"])
@permission_classes([IsAdminUser])
def admin_dashboard(request):
    return Response({
        "practice_areas": PracticeArea.objects.count(),
        "team_members": TeamMember.objects.count(),
        "testimonials": Testimonial.objects.count(),
        "inquiries_total": ContactInquiry.objects.count(),
        "inquiries_new": ContactInquiry.objects.filter(status="new").count(),
        "offices": Office.objects.count(),
        "pages": StaticPage.objects.count(),
    })
