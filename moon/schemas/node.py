from django.db import models
from django.utils import timezone

from .user import User


class Node(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='nodes')
    type = models.CharField(max_length=50)
    revision = models.OneToOneField(
        'NodeRevision',
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        related_name='latest_version'
    )
    parent = models.ForeignKey('self', on_delete=models.CASCADE, blank=True, null=True, related_name='children')
    title = models.CharField(max_length=255)
    tags = models.ManyToManyField('Tag', through='NodeTag')
    created_at = models.DateTimeField(default=timezone.now, blank=True, null=True)
    updated_at = models.DateTimeField(default=timezone.now, blank=True, null=True)
    deleted_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        indexes = [
            models.Index(fields=['user']),
            models.Index(fields=['type']),
            models.Index(fields=['parent']),
            models.Index(fields=['revision']),
            models.Index(fields=['deleted_at']),
        ]
