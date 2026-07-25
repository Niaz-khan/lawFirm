from rest_framework import serializers

from apps.practice_areas.models import PracticeArea
from apps.team.models import TeamMember
from apps.testimonials.models import Testimonial
from apps.inquiries.models import ContactInquiry
from apps.offices.models import Office
from apps.pages.models import StaticPage


class AdminPracticeAreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = PracticeArea
        fields = "__all__"


class AdminTeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMember
        fields = "__all__"
        extra_kwargs = {
            "photo": {"allow_null": True, "required": False},
        }


class AdminTestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = "__all__"


class AdminContactInquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactInquiry
        fields = "__all__"
        read_only_fields = ["created_at"]


class AdminOfficeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Office
        fields = "__all__"


class AdminStaticPageSerializer(serializers.ModelSerializer):
    class Meta:
        model = StaticPage
        fields = "__all__"
