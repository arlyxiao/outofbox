from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns

from . import views


urlpatterns = [
    path('nodes/', views.NodeList.as_view()),
    path('nodes/<int:pk>/', views.NodeDetail.as_view()),
    path('nodes/constants', views.NodeConstantList.as_view(), name='index'),
    # url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]

urlpatterns = format_suffix_patterns(urlpatterns)
