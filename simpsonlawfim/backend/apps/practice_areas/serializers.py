from rest_framework import serializers

from .models import PracticeArea


class PracticeAreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = PracticeArea
        fields = "__all__"
