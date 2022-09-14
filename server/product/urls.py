# date-created: 19-feb-2022
# usage: map the url and views in the app 'product'
# calling function/module: backendroot/urls.py


from django.urls import path
from . import views
from django.conf.urls.static import static
from django.conf import settings
# passing the values from url can be handeled and values are passed to views

urlpatterns = [
    path('tags/list-all/', views.TagListView.as_view()),
    path('list-all/<slug:pincode>/', views.ProductListView.as_view()),
    path('<int:pk>/', views.SingleProductView.as_view()),
    path('add/', views.AddProductView.as_view()),
    path('tag/<int:tagId>/', views.ProductsByTagView.as_view()),
    path('update/', views.UpdateProductView.as_view()),
    path('feedbacks/<int:productId>/', views.FeedbackListView.as_view()),
    path('image/<int:id>/', views.ImageView.as_view()),
    path('testupload/', views.SampleImageUpload.as_view())
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
