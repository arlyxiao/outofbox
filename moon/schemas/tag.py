from django.db import models

from .node import Node


class Tag(models.Model):
    name = models.CharField(max_length=50)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, blank=True, null=True, related_name='children')
    nodes = models.ManyToManyField(Node, through='NodeTag')

    class Meta:
        indexes = [
            models.Index(fields=['name']),
            models.Index(fields=['parent']),
        ]
