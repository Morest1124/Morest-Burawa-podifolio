from django.db import models
from django.utils import timezone

# ABOUT SECTION (Personal Profile)
class About(models.Model):
    # Basic Info
    full_name = models.CharField(max_length=100, blank=False)
    job_title = models.CharField(max_length=100)
    tagline = models.CharField(max_length=255)
    headshot_url = models.URLField(max_length=200, help_text="URL to your headshot image")
    
    # Detailed Info
    bio = models.TextField()
    interests = models.CharField(max_length=255, help_text="Comma-separated list of interests")
    inspiration = models.TextField()
    
    
    career_highlights = models.TextField(help_text="List your career highlights, one per line.")

    def __str__(self):
        return self.full_name

class Education(models.Model):
    # ForeignKey creates a many-to-one relationship. 
    # One 'About' profile can have multiple 'Education' entries.
    about = models.ForeignKey(About, on_delete=models.CASCADE, related_name='education')
    degree = models.CharField(max_length=255)
    institution = models.CharField(max_length=255)
    years = models.CharField(max_length=20, help_text="e.g., '2018 - 2020'")

    def __str__(self):
        return f"{self.degree} at {self.institution}"

# SOCIAL MEDIA & CONTACT INFO
class SocialProfile(models.Model):
    # Linking to the About model,these are your social profiles
    about = models.ForeignKey(About, on_delete=models.CASCADE, related_name='social_profiles')
    platform = models.CharField(max_length=50)
    username = models.CharField(max_length=100)
    url = models.URLField(max_length=200)
    icon = models.CharField(max_length=50, blank=True, null=True, help_text="e.g., 'fab fa-linkedin'")

    def __str__(self):
        return f"{self.platform}: {self.username}"

# SKILLS
class Skill(models.Model):
    name = models.CharField(max_length=100, unique=True)
    category = models.CharField(max_length=100, help_text="e.g., 'Programming Language', 'Framework', 'Tool'")
    proficiency_level = models.CharField(max_length=50, help_text="e.g., 'Beginner', 'Intermediate', 'Advanced', 'Expert'")
    rating_score = models.IntegerField(help_text="A score from 1 to 5", choices=[(i, str(i)) for i in range(1, 6)])
    years_of_experience = models.IntegerField()
    is_key_skill = models.BooleanField(default=False)
    icon_name = models.CharField(max_length=100, blank=True, null=True, help_text="e.g., 'devicon-python-plain'")

    def __str__(self):
        return self.name

# PROJECTS
class Technology(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name

class Project(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, help_text="URL-friendly version of the title")
    description = models.TextField()
    problem_solved = models.TextField()
    my_role = models.CharField(max_length=100)
    
    # Relationships
    categories = models.ManyToManyField(Category, related_name="projects")
    technologies = models.ManyToManyField(Technology, related_name="projects")
        
    # Project dates
    start_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)
    
    # Project status
    status = models.CharField(max_length=50, default='Ongoing', 
    choices=[('Ongoing', 'Ongoing'), ('Completed', 'Completed'), ('Archived', 'Archived')])
    
    # Featured project
    is_featured = models.BooleanField(default=False)
    
    # A brief summary for listings
    summary = models.CharField(max_length=500, blank=True, null=True)
    
    
    live_link = models.URLField(max_length=200, blank=True, null=True)
    repo_link = models.URLField(max_length=200, blank=True, null=True)
    
    deployment_status = models.CharField(max_length=50, default='In Development')
    hosting_platform = models.CharField(max_length=100, blank=True, null=True)
    test_coverage = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True, help_text="Percentage, e.g., 85.50")
    image_url = models.URLField(max_length=200, blank=True, null=True)

    def __str__(self):
        return self.title

# BLOG
class BlogPost(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    content = models.TextField(help_text="The full content of the blog post.")
    timestamp = models.DateTimeField(default=timezone.now)
    tags = models.CharField(max_length=255, help_text="Comma-separated list of tags")
    view_count = models.IntegerField(default=0)
    meta_description = models.CharField(max_length=160)
    image_url = models.URLField(max_length=200, blank=True, null=True)
    published_date = models.DateTimeField(blank=True, null=True)
    edited_date = models.DateTimeField(blank=True, null=True)
    is_published = models.BooleanField(default=False)
    is_featured = models.BooleanField(default=False)


    def __str__(self):
        return self.title

# GITHUB REPO MODULE
class GithubStats(models.Model):
    # This model is designed to hold a single row of data for your GitHub stats.
    owner_name = models.CharField(max_length=100)
    last_sync = models.DateTimeField()
    total_repos = models.IntegerField()
    public_repos = models.IntegerField()
    private_repos = models.IntegerField()
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"GitHub Stats for {self.owner_name}"

# CONTACT SUBMISSIONS
class ContactSubmission(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    preferred_contact_method = models.CharField(max_length=50, blank=True)

    def __str__(self):
        return f"Message from {self.name} on {self.timestamp.strftime('%Y-%m-%d')}"

# EXPERIENCE / WORK HISTORY
class WorkExperience(models.Model):
    about = models.ForeignKey(About, on_delete=models.CASCADE, related_name='work_experience')
    title = models.CharField(max_length=100)
    company = models.CharField(max_length=100)
    years = models.CharField(max_length=20, help_text="e.g., '2022 - Present'")
    location = models.CharField(max_length=100)
    responsibilities = models.TextField(help_text="List of responsibilities, one per line.")
    tech_stack = models.CharField(max_length=255, help_text="Comma-separated list of technologies")

    def __str__(self):
        return f"{self.title} at {self.company}"

# CERTIFICATIONS & AWARDS
class CertificationAward(models.Model):
    # This can be a standalone list.
    name = models.CharField(max_length=200)
    issuer = models.CharField(max_length=100)
    year = models.IntegerField()
    credential_url = models.URLField(max_length=200, blank=True, null=True)
    
    # Link to a specific skill
    skill = models.ForeignKey(Skill, on_delete=models.SET_NULL, null=True, blank=True, related_name='certifications')

    def __str__(self):
        return self.name

# TESTIMONIALS / RECOMMENDATIONS
class Testimonial(models.Model):
    quote = models.TextField()
    source = models.CharField(max_length=100, help_text="Name of the person giving the testimonial")
    title = models.CharField(max_length=100, help_text="Job title of the source, e.g., 'CEO at ExampleCorp'")
    date = models.DateField(blank=True, null=True)

    def __str__(self):
        return f"Testimonial from {self.source}"
