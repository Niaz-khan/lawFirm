from rest_framework.viewsets import ReadOnlyModelViewSet

from .models import TeamMember
from .serializers import TeamMemberSerializer


class TeamMemberViewSet(ReadOnlyModelViewSet):
    queryset = TeamMember.objects.all()
    serializer_class = TeamMemberSerializer
    lookup_field = "slug"
