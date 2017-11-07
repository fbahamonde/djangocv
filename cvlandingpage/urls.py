from django.conf.urls import url
from . import views
urlpatterns = [
    # post views
    url(r'^$', views.cv_fb, name='cv_fb'),
    url(r'^contact/$', views.contact, name='contact'),
    url(r'^resume/$',views.cvpdf,name='cvpdf')
]
