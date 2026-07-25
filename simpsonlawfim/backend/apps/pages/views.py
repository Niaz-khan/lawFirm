from rest_framework import viewsets

from .models import StaticPage
from .serializers import StaticPageSerializer


class StaticPageViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = StaticPageSerializer
    lookup_field = "slug"

    def get_queryset(self):
        return StaticPage.objects.filter(is_published=True)
