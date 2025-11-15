from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Project
from .serializers import ProjectSerializer

import subprocess
import os
import hashlib
import hmac
import json
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings

@csrf_exempt
def github_webhook(request):
    # Verify the request is from GitHub
    signature_header = request.headers.get('X-Hub-Signature-256')
    if not signature_header:
        return HttpResponse('Unauthorized', status=401)

    hash_object = hmac.new(
        settings.GITHUB_WEBHOOK_SECRET.encode('utf-8'),
        msg=request.body,
        digestmod=hashlib.sha256
    )
    expected_signature = "sha256=" + hash_object.hexdigest()

    if not hmac.compare_digest(expected_signature, signature_header):
        return HttpResponse('Unauthorized', status=401)

    # If the signature is valid, process the webhook
    if request.method == 'POST':
        event = request.headers.get('X-GitHub-Event', 'ping')

        if event == 'ping':
            return HttpResponse('pong')
        
        if event == 'push':
            # The main logic for updating the portfolio will go here
            try:
                # Change to the project directory
                project_dir = settings.BASE_DIR
                
                # Pull the latest changes from the git repository
                subprocess.run(['git', 'pull', 'origin', 'main'], cwd=project_dir, check=True)
                
                # Install python dependencies
                pip_path = os.path.join(project_dir, '.venv', 'Scripts', 'pip')
                requirements_path = os.path.join(project_dir, 'requirements.txt')
                subprocess.run([pip_path, 'install', '-r', requirements_path], cwd=project_dir, check=True)
                
                # Install frontend dependencies and build
                frontend_dir = os.path.join(project_dir, 'FMyPortfolio')
                subprocess.run(['npm', 'install'], cwd=frontend_dir, check=True, shell=True)
                subprocess.run(['npm', 'run', 'build'], cwd=frontend_dir, check=True, shell=True)

                # Run database migrations
                python_path = os.path.join(project_dir, '.venv', 'Scripts', 'python')
                manage_py_path = os.path.join(project_dir, 'manage.py')
                subprocess.run([python_path, manage_py_path, 'migrate'], cwd=project_dir, check=True)

                print("Portfolio updated successfully.")
                return HttpResponse('Portfolio updated successfully', status=200)
            except subprocess.CalledProcessError as e:
                print(f"Error updating portfolio: {e}")
                return HttpResponse('Error updating portfolio', status=500)
            except Exception as e:
                print(f"An unexpected error occurred: {e}")
                return HttpResponse('An unexpected error occurred', status=500)

    return HttpResponse('Invalid request method', status=405)


from .utils import fetch_and_save_github_projects

# Create your views here.
class ProjectListCreateView(generics.ListCreateAPIView):
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        """
        If no projects are in the database, fetch them from GitHub first.
        """
        if not Project.objects.exists():
            print("No projects found in the database. Fetching from GitHub...")
            fetch_and_save_github_projects()
        return Project.objects.all()