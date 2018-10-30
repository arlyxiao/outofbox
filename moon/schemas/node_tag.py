from django.db import models

from .node import Node
from .tag import Tag


class NodeTag(models.Model):
    node = models.ForeignKey(Node, models.SET_NULL, blank=True, null=True)
    tag = models.ForeignKey(Tag, models.SET_NULL, blank=True, null=True)

    class Meta:
        db_table = 'moon_node_tag'

        indexes = [
            models.Index(fields=['node']),
            models.Index(fields=['tag']),
        ]
