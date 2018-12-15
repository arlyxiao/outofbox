from django.db import models
from django.core.validators import MinLengthValidator
from django.utils import timezone


class User(models.Model):
    ADMIN = 'admin'
    EDITOR = 'editor'
    GENERAL = 'general'
    CLOSED = 'closed'
    ROLES = (
        (ADMIN, 'admin'),
        (EDITOR, 'editor'),
        (GENERAL, 'general'),
        (CLOSED, 'closed'),
    )

    email = models.EmailField(max_length=100)
    username = models.CharField(max_length=100, validators=[MinLengthValidator(4)])
    password = models.CharField(max_length=100, validators=[MinLengthValidator(6)])
    role = models.CharField(max_length=20, choices=ROLES, default=GENERAL)
    logined_at = models.DateTimeField(default=timezone.now, blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)

    class Meta:
        indexes = [
            models.Index(fields=['email']),
            models.Index(fields=['username']),
            models.Index(fields=['role']),
        ]
