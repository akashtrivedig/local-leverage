from django.urls import path
from . import views

urlpatterns = [
    path('list-all/', views.CustomerListView.as_view()),
    path('signup/', views.CustomerSignupView.as_view()),
    path('login/', views.CustomerLoginView.as_view()),
    path('order-history/', views.CustomerOrderSummaryView.as_view()),
    path('feedback/list-all/', views.CustomerFeedbackView.as_view()),
    path('profile/update/', views.CustomerProfileUpdateView.as_view()),
    path('all-info/', views.CustomerInfoView.as_view()),
    path('place-order/', views.CustomerOrderView.as_view()),
]
