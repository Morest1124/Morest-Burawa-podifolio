from django.contrib import admin
from .models import (
    About, Education, SocialProfile, Skill, Technology,
    Category, Project, WorkExperience, CertificationAward,
    Testimonial, BlogPost, GithubStats, ContactSubmission
)

# Register your models here to make them visible in the admin site.
admin.site.register(About)
admin.site.register(Education)
admin.site.register(SocialProfile)
admin.site.register(Skill)
admin.site.register(Technology)
admin.site.register(Category)
admin.site.register(Project)
admin.site.register(WorkExperience)
admin.site.register(CertificationAward)
admin.site.register(Testimonial)
admin.site.register(BlogPost)
admin.site.register(GithubStats)
admin.site.register(ContactSubmission)

