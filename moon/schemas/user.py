from django.db import models
from django.core.validators import MinLengthValidator
from django.utils import timezone


class User(models.Model):
    ADMIN = 2
    EDITOR = 1
    GENERAL = 0
    ROLES = (
        (ADMIN, 2),
        (EDITOR, 1),
        (GENERAL, 0),
    )

    email = models.EmailField(max_length=100)
    username = models.CharField(max_length=100, validators=[MinLengthValidator(4)])
    password = models.CharField(max_length=100, validators=[MinLengthValidator(6)])
    role = models.CharField(max_length=2, choices=ROLES, default=GENERAL)
    logined_at = models.DateTimeField(blank=True, null=True, default=timezone.now())
    created_at = models.DateTimeField(default=timezone.now())
    updated_at = models.DateTimeField(default=timezone.now())
    deleted_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        indexes = [
            models.Index(fields=['email']),
            models.Index(fields=['username']),
            models.Index(fields=['role']),
            models.Index(fields=['deleted_at']),
        ]
