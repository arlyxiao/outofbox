from django.db import models
from django.utils import timezone

from .node import Node


class NodeRevision(models.Model):
    node = models.ForeignKey(Node, on_delete=models.CASCADE, related_name='revisions')
    body = models.TextField()
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)

    class Meta:
        db_table = 'moon_node_revision'

        indexes = [
            models.Index(fields=['node']),
        ]
