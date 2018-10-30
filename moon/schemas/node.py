from django.db import models
from django.utils import timezone

from .user import User


class Node(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    type = models.CharField(max_length=50)
    revision = models.OneToOneField(
        'Node',
        on_delete=models.SET_NULL,
        blank=True,
        null=True
    )
    parent = models.ForeignKey('self', on_delete=models.CASCADE, blank=True, null=True, related_name='children')
    title = models.CharField(max_length=255)
    tags = models.ManyToManyField('Tag', through='NodeTag')
    created_at = models.DateTimeField(default=timezone.now())
    updated_at = models.DateTimeField(default=timezone.now())
    deleted_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        indexes = [
            models.Index(fields=['user']),
            models.Index(fields=['type']),
            models.Index(fields=['parent']),
            models.Index(fields=['revision']),
            models.Index(fields=['deleted_at']),
        ]
