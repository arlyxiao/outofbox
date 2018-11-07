from django.db import models
from django.utils import timezone

from .node import Node


class NodeAttribute(models.Model):
    node = models.ForeignKey(Node, on_delete=models.CASCADE, related_name='attributes')
    name = models.CharField(max_length=255)
    value = models.TextField()
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)

    class Meta:
        db_table = 'moon_node_attribute'

        indexes = [
            models.Index(fields=['node']),
        ]
