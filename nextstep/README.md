# NextStep

NextStep is a full-stack job matching platform designed for both job seekers and employers. Job seekers can discover jobs, like opportunities, match with employers, and start conversations. Employers can create job postings, view applicants, and manage conversations with interested candidates.

## Live Demo

- Live Site: Add your Netlify link here
- Backend API: Add your Render backend link here

## Project Overview

NextStep was built as a role-based job matching application. The app supports two user types:

- **Job Seekers**
  - Register and log in
  - Browse available jobs
  - Like or pass on jobs
  - View liked jobs
  - View matches
  - Chat with employers

- **Employers**
  - Register and log in
  - Create job postings
  - View posted jobs
  - View applicants who liked their jobs
  - Chat with applicants

The goal of NextStep is to create a simple two-sided job platform where employers and job seekers can interact through job discovery, matching, and messaging.

## Features

### Authentication
- User registration
- User login
- JWT-based authentication
- Logout functionality
- Role-based user experience

### Job Seeker Features
- Discover available jobs
- Swipe/like job opportunities
- View liked jobs
- View matches
- Open chat conversations with employers

### Employer Features
- Employer dashboard
- Create job postings
- View posted jobs
- View applicants
- Open conversations with applicants

### Messaging
- Job-based conversation system
- Messages between job seekers and employers
- Role-aware conversation labels

### Deployment
- Frontend deployed with Netlify
- Backend deployed with Render
- Database hosted with Neon PostgreSQL

## Tech Stack

### Frontend
- React
- React Router
- JavaScript
- CSS stylesheet
- Fetch-based API helper

### Backend
- Django
- Django REST Framework
- Simple JWT Authentication
- Django CORS Headers
- Gunicorn

### Database
- Neon PostgreSQL

### Deployment
- Netlify
- Render

## Project Structure

```text
NextStep/
├── netlify.toml
├── nextstep/
│   ├── backend/
│   │   ├── jobs/
│   │   ├── users/
│   │   ├── nextstep/
│   │   ├── manage.py
│   │   └── requirements.txt
│   │
│   └── frontend/
│       ├── public/
│       ├── src/
│       │   ├── context/
│       │   ├── hooks/
│       │   ├── pages/
│       │   ├── services/
│       │   ├── App.jsx
│       │   ├── main.jsx
│       │   └── styles.css
│       ├── package.json
│       └── vite.config.js
```

## Main Pages
### Landing Page

Introduces the app and explains the two user types.

### Dashboard

Displays the logged-in user’s role and gives employers access to the job creation form.

### Jobs

Allows job seekers to browse, like, or pass on available jobs.

### Liked Jobs / Jobs Posted

#### Role-based page:
- Job seekers see liked jobs
- Employers see jobs they posted

### Matches / Applicants
#### Role-based page:
- Job seekers see matched jobs
- Employers see applicants who liked their posted jobs

### Chats / Conversations
#### Role-based page:
- Job seekers see chats
- Employers see conversations with applicants

## API Overview
#### Authentication
```bash
POST /api/auth/register/
POST /api/auth/login/
GET  /api/auth/me/
POST /api/auth/token/refresh/
```

#### Jobs
```bash
GET  /api/jobs/
POST /api/jobs/create/
POST /api/jobs/swipe/
POST /api/jobs/reset-swipes/
GET  /api/jobs/liked/
GET  /api/jobs/posted/
GET  /api/jobs/matches/
GET  /api/jobs/applicants/
```

#### Messages
```bash
GET  /api/jobs/messages/:jobId/
POST /api/jobs/messages/:jobId/
```

## Environment Variables
#### Frontend
Netlify environment variable:

```
VITE_API_BASE_URL=https://your-render-backend-url.onrender.com/api
```

#### Backend

Render environment variables:

```
SECRET_KEY=your-secret-key
DEBUG=False
DATABASE_URL=your-neon-postgresql-url
```

## Local Development
#### Backend Setup
```
cd nextstep/backend
py -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
py manage.py migrate
py manage.py runserver
```

Backend runs at:

http://127.0.0.1:8000


#### Frontend Setup
```
cd nextstep/frontend
npm install
npm run dev
```
Frontend runs at:

http://localhost:5173


## Deployment Notes
#### Netlify

Frontend settings:

```
Base directory: nextstep/frontend
Build command: npm run build
Publish directory: dist
```

The project includes a netlify.toml file to make deployment settings consistent.

#### Render

Backend settings:

```
Root directory: nextstep/backend
Build command: pip install -r requirements.txt && python manage.py migrate
Start command: gunicorn nextstep.wsgi:application
```

#### Neon PostgreSQL

The backend uses DATABASE_URL to connect to Neon PostgreSQL in production. Local development can still use SQLite if no DATABASE_URL is provided.

#### Current Status

NextStep is fully deployed and functional as a two-sided job matching platform.

Working features include:

- Authentication
- Role-based navigation
- Employer job posting
- Job seeker job discovery
- Applicants and matches
- Conversations/chat
- Cloud database persistence


## Future Improvements

Planned future improvements include:

- Employer job editing and deletion
- Applicant profile pages
- Resume upload
- Resume autofill for applicant profiles
- More detailed job seeker profiles
- Improved applicant ranking
- Notifications
- Enhanced chat system tied to both job and applicant
- Better dashboard analytics for employers

#### Resume Autofill Future Feature

A future version of NextStep may allow job seekers to upload a resume and automatically fill out their profile information, including:

- skills
- education
- work experience
- location
- portfolio links
- resume summary

This would make the job seeker onboarding process faster and more realistic.

## Author

Created by Haley Abel as a full-stack portfolio project.