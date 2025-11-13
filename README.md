# My Full-Stack Portfolio

This project is a personal portfolio website built with a React frontend and a Django REST Framework backend. It showcases my skills, projects, work experience, and allows visitors to contact me.

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Django, Django REST Framework

## Folder Structure

The project is organized into two main directories:

-   `FMyPortfolio/`: Contains the React frontend application.
-   `MyPortfolio/`: Contains the Django backend application.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   Node.js and npm
-   Python and pip

### Backend Setup (Django)

1.  Navigate to the backend directory:
    ```sh
    cd MyPortfolio
    ```

2.  Create and activate a virtual environment:
    ```sh
    # For Windows
    python -m venv .venv
    .venv\Scripts\activate

    # For macOS/Linux
    python3 -m venv .venv
    source .venv/bin/activate
    ```

3.  Install the required packages:
    ```sh
    pip install -r requirements.txt
    ```

4.  Apply database migrations:
    ```sh
    python manage.py migrate
    ```

5.  Start the development server (usually on `http://127.0.0.1:8000`):
    ```sh
    python manage.py runserver
    ```

### Frontend Setup (React)

1.  In a new terminal, navigate to the frontend directory:
    ```sh
    cd FMyPortfolio
    ```

2.  Install NPM packages:
    ```sh
    npm install
    ```

3.  Start the development server (usually on `http://localhost:5173`):
    ```sh
    npm run dev
    ```

## API Endpoints

The backend exposes the following API endpoints, all prefixed with `/api/`:

-   `/about/`
-   `/education/`
-   `/social-profiles/`
-   `/skills/`
-   `/technologies/`
-   `/projects/`
-   `/work-experience/`
-   `/certifications/`
-   `/testimonials/`
-   `/blog-posts/`
-   `/github-stats/`
-   `/contact-submissions/`
-   `/categories/`
