from django.db import models


class PracticeArea(models.Model):
    slug = models.SlugField(max_length=100, unique=True)
    title = models.CharField(max_length=200)
    docket_number = models.IntegerField(default=0)
    headline = models.CharField(max_length=300, blank=True)
    summary = models.TextField()
    body = models.TextField(blank=True)
    extra = models.TextField(blank=True)
    services_title = models.CharField(max_length=200, blank=True)
    bullet_points = models.JSONField(default=list)
    stamp_label = models.CharField(max_length=100, blank=True)
    stamp_body = models.TextField(blank=True)
    image = models.ImageField(
        upload_to="practice_areas/", blank=True, null=True
    )
    meta_description = models.TextField(blank=True)
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.title
