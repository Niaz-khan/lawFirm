from rest_framework import viewsets

from .models import Office
from .serializers import OfficeSerializer


class OfficeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Office.objects.all()
    serializer_class = OfficeSerializer
