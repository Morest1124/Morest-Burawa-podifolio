# Morest Burawa — Portfolio

This repository contains a single-page portfolio built with React + Vite and Tailwind CSS. The site showcases services, projects and blog posts, and includes a contact form. The front-end is currently using mock data for projects and blog posts while the planned back-end is being developed.

Contents
--------
- `src/` — React source files and components
- `public/` — static assets
- `package.json` — scripts & dependencies

Why a backend?
---------------
The ultimate goal is to have a small backend service that:

- Serves project metadata and image URLs (so adding a project in your GitHub or CMS updates the site automatically)
- Serves blog post data (slug, HTML/markdown content and metadata)
- Accepts contact form submissions (POST endpoint) and optionally forwards them to email or stores them

Because the UI is data-driven, connecting the front-end to an API means the site will update automatically when new project data appears on your back-end or repository.

Current status
--------------
- Front-end: single-page layout with sections: Services, About, My Work, Contacts, Blog
- UI features: project carousel, project modal case studies, reveal-on-scroll animation
- Data: mock arrays used inside components (e.g. `src/components/MyWork.jsx`) while the backend is not yet available

Suggested API contract
----------------------
These example endpoints describe how the front-end will communicate with your backend. Adapt them to your chosen server framework.

GET /api/projects
- Response: 200 OK
- Body: { projects: [ { id, title, category, desc, images:[], link, repo, date, tags } ] }

GET /api/projects/:id
- Response: single project with full data and case-study content

GET /api/blog
- Response: list of blog posts (id, title, excerpt, publishedAt, slug)

GET /api/blog/:slug
- Response: full blog post content (markdown or HTML)

POST /api/contact
- Request: { name, email, message }
- Response: { status: 'ok' }

Example JSON for /api/projects

```
{
	"projects": [
		{
			"id": "landing-redesign",
			"title": "Landing Page Redesign",
			"category": "frontend",
			"desc": "Responsive landing page with animations.",
			"images": ["https://.../1a.jpg","https://.../1b.jpg"],
			"link": "https://live.example",
			"repo": "https://github.com/your/repo",
			"date": "2025-10-01",
			"tags": ["react","tailwind"]
		}
	]
}
```

How to migrate the front-end from mock data to the backend
---------------------------------------------------------
1. Replace the mock array (for example `ALL_PROJECTS` in `src/components/MyWork.jsx`) with a fetch call:

```js
useEffect(() => {
	fetch('/api/projects')
		.then(r => r.json())
		.then(data => setProjects(data.projects || data))
		.catch(err => console.error(err));
}, []);
```

2. Ensure the returned JSON matches the front-end's expected schema (images array, title, category, description, link).

3. If your images are hosted externally (S3, GitHub, CDN), use stable URLs in the `images` array.

Local development
-----------------
Install dependencies:

```powershell
npm install
```

Start dev server:

```powershell
npm run dev
```

Build for production:

```powershell
npm run build
```

Preview production build locally:

```powershell
npm run preview
```

Minimal backend example (Node + Express)
---------------------------------------
This is a tiny reference to get you started quickly — extend it to read from a database, GitHub or a headless CMS.

```js
const express = require('express');
const app = express();
app.use(express.json());

app.get('/api/projects', (req, res) => {
	res.json({ projects: require('./data/projects.json') });
});

app.post('/api/contact', (req, res) => {
	// validate & forward message
	console.log(req.body);
	res.json({ status: 'ok' });
});

app.listen(3000, () => console.log('api listening on 3000'));
```

Notes & recommendations
-----------------------
- Fonts: the site references fonts (e.g. 'Qurova', 'Goote'). Add them via CDN or local files and `@font-face` in `src/index.css`.
- CORS: if your backend is hosted separately, enable CORS for the front-end domain.
- Security: add input validation and rate-limiting on the contact endpoint; consider reCAPTCHA if you get spam.
- Hosting: the front-end is easy to host on Vercel, Netlify or any static host. The backend can be on Render, Railway, Heroku, or a VPS.

Want me to scaffold the backend?
-------------------------------
If you'd like, I can scaffold a minimal Node/Express backend for you, or generate boilerplate for Django REST / FastAPI / Rails. Tell me which framework you prefer and I will create a starter and an example `data/projects.json` you can immediately use.

---
This README was tailored to describe how the portfolio will move from mock data to a dynamic site backed by an API. If you want it shorter or focused on deployment to a specific provider, I can adapt it.
