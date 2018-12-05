from django.urls import path, include, re_path
from rest_framework.urlpatterns import format_suffix_patterns

from .actions import auth
from .actions import front_node
from .actions import manage_node


urlpatterns = [
    path('manage/nodes/', manage_node.NodeList.as_view()),
    path('manage/nodes/<int:pk>/', manage_node.NodeDetail.as_view()),
    path('manage/nodes/constants', manage_node.NodeConstantList.as_view(), name='index'),

    path('node/list/', front_node.NodeList.as_view()),
    path('node/<int:pk>/', front_node.NodeDetail.as_view()),
    path('node/constants', front_node.NodeConstantList.as_view(), name='index'),
    # url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))

    path('api/login', auth.Login.as_view()),
    path('api/user', auth.User.as_view())
]

urlpatterns = format_suffix_patterns(urlpatterns)
