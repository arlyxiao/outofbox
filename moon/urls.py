from django.urls import path, include, re_path
from rest_framework.urlpatterns import format_suffix_patterns

from .actions import auth
from .actions import node
from .actions import taxon
from .actions import manage_node

urlpatterns = [
    path('manage/nodes/', manage_node.NodeList.as_view()),
    path('manage/nodes/<int:pk>/', manage_node.NodeDetail.as_view()),
    path('manage/nodes/constants', manage_node.NodeConstantList.as_view(), name='index'),

    # Home
    path('home/nodes', node.Home.as_view()),

    # Search
    path('search/nodes', node.Search.as_view()),

    # Taxon
    path('node/list/', taxon.NodeList.as_view()),
    path('node/<int:pk>/', taxon.NodeDetail.as_view()),
    path('node/constants', taxon.NodeConstantList.as_view(), name='index'),
    # url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))

    path('api/login', auth.Login.as_view()),
    path('api/logout', auth.Logout.as_view()),
    path('api/user', auth.User.as_view()),
    path('api/admin-user', auth.AdminUser.as_view())
]
