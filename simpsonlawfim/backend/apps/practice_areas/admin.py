from django.contrib import admin

from .models import PracticeArea


@admin.register(PracticeArea)
class PracticeAreaAdmin(admin.ModelAdmin):
    list_display = ("title", "slug", "order")
    prepopulated_fields = {"slug": ("title",)}
