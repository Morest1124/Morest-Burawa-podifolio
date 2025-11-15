import requests
from django.conf import settings
from dateutil.parser import parse
from .models import Project

def fetch_and_save_github_projects():
    """
    Fetches GitHub repositories and saves them as projects in the database.
    This is a reusable function based on the fetch_github_projects management command.
    """
    username = settings.GITHUB_USERNAME
    token = settings.GITHUB_TOKEN
    
    api_url = f"https://api.github.com/users/{username}/repos"
    headers = {
        "Authorization": f"token {token}",
        "Accept": "application/vnd.github.v3+json",
    }
    
    try:
        response = requests.get(api_url, headers=headers, params={'sort': 'pushed', 'per_page': 50})
        response.raise_for_status()
        repos = response.json()
        print(f"Found {len(repos)} repositories on GitHub.")

        for repo in repos:
            if repo.get('fork'):
                continue

            Project.objects.update_or_create(
                name=repo['name'],
                defaults={
                    'description': repo['description'],
                    'html_url': repo['html_url'],
                    'language': repo['language'],
                    'created_at': parse(repo['created_at']),
                    'updated_at': parse(repo['updated_at']),
                }
            )
        print("GitHub projects fetched and saved successfully.")
    except requests.exceptions.RequestException as e:
        print(f"Failed to connect to GitHub API: {e}")
    except Exception as e:
        print(f"An unexpected error occurred during GitHub fetch: {e}")

