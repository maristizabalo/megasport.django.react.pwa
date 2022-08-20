from django.db import models
from datetime import datetime
from apps.category.models import Category

class Product(models.Model):
    name = models.CharField(max_length=255)
    photo = models.ImageField(upload_to ='photos/%Y/%m/')
    description = models.TextField()
    price = models.IntegerField()
    compare_price = models.IntegerField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=0)
    sold = models.IntegerField(default=0)
    date_created = models.DateTimeField(default=datetime.now)

    def __str__(self):
        return self.name


