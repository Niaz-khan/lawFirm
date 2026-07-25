from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/practice-areas/", include("apps.practice_areas.urls")),
    path("api/v1/team/", include("apps.team.urls")),
    path("api/v1/testimonials/", include("apps.testimonials.urls")),
    path("api/v1/inquiries/", include("apps.inquiries.urls")),
    path("api/v1/offices/", include("apps.offices.urls")),
    path("api/v1/pages/", include("apps.pages.urls")),
    path("api/v1/admin/", include("apps.admin_api.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
