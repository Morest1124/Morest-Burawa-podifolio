from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import About, Education, SocialProfile, Skill, Technology, Project, WorkExperience, CertificationAward, Testimonial, BlogPost, GithubStats, ContactSubmission, Category
from .serializers import AboutSerializer, EducationSerializer, SocialProfileSerializer, SkillSerializer, TechnologySerializer, ProjectSerializer, WorkExperienceSerializer, CertificationAwardSerializer, TestimonialSerializer, BlogPostSerializer, GithubStatsSerializer, ContactSubmissionSerializer, CategorySerializer


# Create your views here.
class AboutListCreateView(generics.ListCreateAPIView):
    queryset = About.objects.all()
    serializer_class = AboutSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class EducationListCreateView(generics.ListCreateAPIView):
    queryset = Education.objects.all()
    serializer_class = EducationSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class SocialProfileListCreateView(generics.ListCreateAPIView):
    queryset = SocialProfile.objects.all()
    serializer_class = SocialProfileSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class SkillListCreateView(generics.ListCreateAPIView):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class TechnologyListCreateView(generics.ListCreateAPIView):
    queryset = Technology.objects.all()
    serializer_class = TechnologySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class ProjectListCreateView(generics.ListCreateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class WorkExperienceListCreateView(generics.ListCreateAPIView):
    queryset = WorkExperience.objects.all()
    serializer_class = WorkExperienceSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class CertificationAwardListCreateView(generics.ListCreateAPIView):
    queryset = CertificationAward.objects.all()
    serializer_class = CertificationAwardSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class TestimonialListCreateView(generics.ListCreateAPIView):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class BlogPostListCreateView(generics.ListCreateAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class GithubStatsListCreateView(generics.ListCreateAPIView):
    queryset = GithubStats.objects.all()
    serializer_class = GithubStatsSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

from django.core.mail import send_mail
from django.conf import settings

class ContactSubmissionListCreateView(generics.ListCreateAPIView):
    queryset = ContactSubmission.objects.all()
    serializer_class = ContactSubmissionSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        instance = serializer.save()
        
        # Send an email
        subject = f"New Contact Form Submission from {instance.name}"
        message = f"""
        You have a new submission from your portfolio contact form.

        Name: {instance.name}
        Email: {instance.email}
        
        Message:
        {instance.message}
        """
        from_email = settings.DEFAULT_FROM_EMAIL
        recipient_list = ['morestburawa05@gmail.com']
        
        try:
            send_mail(subject, message, from_email, recipient_list)
        except Exception as e:
            # Log the error, but don't fail the request
            print(f"Error sending email: {e}")


class CategoryListCreateView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]