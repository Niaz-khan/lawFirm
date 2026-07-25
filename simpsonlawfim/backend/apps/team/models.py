from django.db import models


class TeamMember(models.Model):
    AVATAR_COLOR_CHOICES = [
        ("brass-light", "Brass Light"),
        ("moss", "Moss"),
    ]

    slug = models.SlugField(unique=True, max_length=100)
    name = models.CharField(max_length=200)
    role = models.CharField(max_length=200)
    bio = models.TextField()
    initials = models.CharField(max_length=5)
    avatar_color = models.CharField(
        max_length=20, choices=AVATAR_COLOR_CHOICES, default="brass-light"
    )
    order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    photo = models.ImageField(upload_to="team/", blank=True, null=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["order"]
