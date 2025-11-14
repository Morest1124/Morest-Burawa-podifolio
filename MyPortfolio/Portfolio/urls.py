from django.urls import path
from . import views

urlpatterns = [
    path('about/', views.AboutListCreateView.as_view(), name='about-list'),
    path('education/', views.EducationListCreateView.as_view(), name='education-list'),
    path('social-profiles/', views.SocialProfileListCreateView.as_view(), name='socialprofile-list'),
    path('skills/', views.SkillListCreateView.as_view(), name='skill-list'),
    path('technologies/', views.TechnologyListCreateView.as_view(), name='technology-list'),
    path('projects/', views.ProjectListCreateView.as_view(), name='project-list'),
    path('projects/<slug:slug>/', views.ProjectDetailView.as_view(), name='project-detail'),
    path('work-experience/', views.WorkExperienceListCreateView.as_view(), name='workexperience-list'),
    path('certifications/', views.CertificationAwardListCreateView.as_view(), name='certificationaward-list'),
    path('testimonials/', views.TestimonialListCreateView.as_view(), name='testimonial-list'),
    path('blog-posts/', views.BlogPostListCreateView.as_view(), name='blogpost-list'),
    path('blog-posts/<slug:slug>/', views.BlogPostDetailView.as_view(), name='blogpost-detail'),
    path('github-stats/', views.GithubStatsListCreateView.as_view(), name='githubstats-list'),
    path('contact-submissions/', views.ContactSubmissionListCreateView.as_view(), name='contactsubmission-list'),
    path('categories/', views.CategoryListCreateView.as_view(), name='category-list'),
]
