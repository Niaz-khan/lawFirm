from django.db import models


class Testimonial(models.Model):
    quote = models.TextField()
    attribution = models.CharField(max_length=200)
    practice_area = models.ForeignKey(
        "practice_areas.PracticeArea",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    is_published = models.BooleanField(default=True)
    rating = models.IntegerField(default=5)

    class Meta:
        ordering = ["-id"]

    def __str__(self):
        return self.attribution
