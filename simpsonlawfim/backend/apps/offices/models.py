from django.db import models


class Office(models.Model):
    name = models.CharField(max_length=200)
    address_line1 = models.CharField(max_length=200)
    address_line2 = models.CharField(max_length=200, blank=True)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=50)
    zipcode = models.CharField(max_length=10)
    phone = models.CharField(max_length=20)
    hours = models.JSONField(default=dict)
    lat = models.DecimalField(
        max_digits=9, decimal_places=6, null=True, blank=True
    )
    lng = models.DecimalField(
        max_digits=9, decimal_places=6, null=True, blank=True
    )

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name
