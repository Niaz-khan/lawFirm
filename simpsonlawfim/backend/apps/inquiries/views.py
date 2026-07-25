from rest_framework import generics, throttling
from rest_framework.response import Response

from .models import ContactInquiry
from .serializers import ContactInquirySerializer


class InquiryCreateView(generics.CreateAPIView):
    serializer_class = ContactInquirySerializer
    throttle_classes = [throttling.AnonRateThrottle]
    throttle_scope = "inquiry"

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"status": "received"}, status=201)
