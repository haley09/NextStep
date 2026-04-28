# NextStep — Technical Specification

## 1. Overview

This document defines the technical architecture and implementation plan for **NextStep** Version 1.

NextStep is a two-sided job matching platform where:

* job seekers swipe on job postings
* employers swipe on candidates for a specific job
* a mutual right swipe creates a match
* matched users can message each other and coordinate next steps

Version 1 will be built as a modern full-stack web application using:

* **React** for the frontend
* **Django REST Framework** for the backend
* **PostgreSQL** for the database
* **JWT authentication** for secure login/session handling

---

## 2. Technical Goals

### Primary Goals

* Build a clean, modular, maintainable application
* Support two user roles with different flows
* Implement a reliable matching system tied to specific job postings
* Separate frontend and backend clearly for scalability

### Secondary Goals

* Make the app easy to document and extend
* Keep Version 1 realistic in scope
* Use industry-relevant technologies suitable for a showcase project

---

## 3. System Architecture

## High-Level Architecture

```text
React Frontend
    |
    | HTTP Requests (Axios / Fetch)
    v
Django REST API
    |
    v
PostgreSQL Database
```

### Responsibilities

## Frontend

* renders UI
* handles page routing
* manages auth state in the client
* displays swipe cards, dashboards, and messages
* sends API requests to backend

## Backend

* handles authentication and authorization
* validates requests
* applies business logic
* creates matches based on swipe behavior
* stores and returns application data

## Database

* stores users, profiles, jobs, swipes, matches, and messages
* enforces relationships and constraints

---

## 4. Tech Stack

## Frontend

* React
* React Router
* Axios
* Tailwind CSS

## Backend

* Python
* Django
* Django REST Framework
* djangorestframework-simplejwt
* django-cors-headers

## Database

* PostgreSQL

## Development Tools

* Git / GitHub
* VS Code
* Postman or Insomnia for API testing

---

## 5. Project Structure

## Root Structure

```text
nextstep/
  frontend/
  backend/
  docs/
  README.md
```

---

## Frontend Structure

```text
frontend/
  src/
    components/
    pages/
    layouts/
    context/
    hooks/
    services/
    utils/
    assets/
    App.jsx
    main.jsx
```

### Suggested frontend folders

## `components/`

Reusable UI pieces:

* Navbar
* JobCard
* CandidateCard
* MatchCard
* MessageThread
* ProtectedRoute
* LoadingSpinner
* EmptyState

## `pages/`

Main route-level pages:

* LandingPage
* LoginPage
* RegisterPage
* JobSeekerDashboard
* EmployerDashboard
* DiscoverJobsPage
* DiscoverCandidatesPage
* MatchesPage
* MessagesPage
* ProfilePage

## `layouts/`

Role-based/shared page wrappers:

* MainLayout
* AuthLayout
* DashboardLayout

## `context/`

App-wide state:

* AuthContext

## `services/`

API calls:

* authService
* profileService
* jobService
* swipeService
* matchService
* messageService

## `hooks/`

Custom hooks:

* useAuth
* useFetch
* useProtectedRoute

## `utils/`

Helpers:

* token helpers
* formatting helpers
* constants

---

## Backend Structure

```text
backend/
  manage.py
  nextstep/
    settings.py
    urls.py
    wsgi.py
    asgi.py
  users/
  profiles/
  jobs/
  swipes/
  matches/
  messages/
```

### Suggested backend apps

## `users/`

Responsibilities:

* user model / auth support
* role field
* registration/login logic
* current-user endpoint

## `profiles/`

Responsibilities:

* job seeker profiles
* employer profiles

## `jobs/`

Responsibilities:

* job posting CRUD
* employer job management
* public job listing endpoints

## `swipes/`

Responsibilities:

* store seeker swipes
* store employer swipes
* evaluate whether a match should be created

## `matches/`

Responsibilities:

* list matches
* retrieve match details
* update match statuses

## `messages/`

Responsibilities:

* message threads per match
* send/retrieve messages

---

## 6. Authentication Design

## Method

JWT authentication using:

* access token
* refresh token

## Flow

1. User registers or logs in
2. Backend returns JWT tokens
3. Frontend stores tokens securely
4. Frontend sends access token with protected requests
5. Refresh token is used to obtain a new access token when needed

## Role Handling

Each user has a role:

* `job_seeker`
* `employer`

Role determines:

* allowed endpoints
* available pages
* dashboard type
* available swipe actions

---

## 7. Data Model Responsibilities

## User

Handles:

* email
* password
* role
* account status

## JobSeekerProfile

Handles:

* candidate identity
* job preferences
* resume/profile details

## EmployerProfile

Handles:

* company identity
* recruiter information
* hiring focus

## JobPosting

Handles:

* role-specific employer job data
* discovery content for seekers

## JobSeekerSwipe

Tracks:

* seeker interest in jobs

## EmployerSwipe

Tracks:

* employer interest in candidates for a specific job

## Match

Tracks:

* successful mutual interest
* status of relationship between job seeker and employer for one job

## Message

Tracks:

* post-match communication

---

## 8. Match Logic

## Rule

A match is created only when:

* a job seeker swipes right on a job posting
* the employer swipes right on that job seeker for the same job posting

## Implementation Approach

When a swipe is created:

1. Save the swipe
2. Check for an opposite right swipe already in the database
3. If found, create a `Match` if one does not already exist

## Why this matters

This keeps the system:

* consistent
* role-aware
* realistic to recruiting workflows

The match is tied to a **specific job**, not just two users in general.

---

## 9. Authorization Rules

## Public Routes

Accessible without login:

* landing page
* register
* login

## Job Seeker Protected Features

* create/edit seeker profile
* browse jobs
* swipe on jobs
* view seeker matches
* send messages in seeker matches

## Employer Protected Features

* create/edit employer profile
* create/manage jobs
* browse candidates for a job
* swipe on candidates
* view employer matches
* send messages in employer matches

## Shared Protected Features

* current user
* messages
* match details

---

## 10. Frontend Routing Plan

## Public

* `/`
* `/login`
* `/register`

## Job Seeker

* `/job-seeker/dashboard`
* `/job-seeker/profile`
* `/job-seeker/discover`
* `/jobs/:id`
* `/matches`
* `/messages`
* `/messages/:matchId`

## Employer

* `/employer/dashboard`
* `/employer/profile`
* `/employer/jobs`
* `/employer/jobs/new`
* `/employer/jobs/:id`
* `/employer/jobs/:id/discover`
* `/employer/candidates/:id`
* `/matches`
* `/messages`
* `/messages/:matchId`

---

## 11. Backend API Organization

## Auth

* register
* login
* token refresh
* current user

## Profiles

* create/update/get job seeker profile
* create/update/get employer profile

## Jobs

* public job list
* job details
* employer job CRUD

## Swipes

* seeker swipe endpoint
* employer swipe endpoint

## Matches

* list matches
* get match detail
* update match status

## Messages

* list match messages
* create message

---

## 12. Validation Rules

## Authentication

* email must be unique
* password must meet minimum requirements
* role must be valid

## Profiles

* user must match the profile type being created
* required fields must be present

## Jobs

* only employers can create jobs
* only owner employer can update or close their job
* status must be valid

## Swipes

* one swipe per user/target combination
* employer swipe must reference a valid job owned by that employer
* direction must be `left` or `right`

## Matches

* only participants in a match can view it
* only participants can send messages
* status changes must use valid values

---

## 13. State Management Approach

## Frontend Auth State

Use React Context for:

* current user
* tokens
* login state
* logout behavior

## Local Component State

Use page/component state for:

* forms
* swipe decks
* message input
* job/candidate cards

## Possible Future Upgrade

If app complexity increases:

* Redux or Zustand could be introduced
* not needed in Version 1

---

## 14. UI/UX Technical Decisions

## Swipe Interface

For Version 1:

* support swipe-like card UI
* also support explicit buttons:

  * Interested
  * Pass

This improves accessibility and makes the feature easier to implement.

## Messaging

Version 1 should use standard REST polling rather than realtime sockets.

Reason:

* simpler implementation
* enough for MVP
* easier to document and test

## Dashboard Design

Dashboards should be role-aware and display:

* key summaries
* navigation shortcuts
* recent activity

---

## 15. Build Phases

## Phase 1 — Project Setup and Auth

* initialize React app
* initialize Django backend
* configure PostgreSQL
* configure CORS
* install JWT auth
* create user model / role handling
* build register/login flow

## Phase 2 — Profiles and Jobs

* build seeker profile endpoints and forms
* build employer profile endpoints and forms
* build employer job posting CRUD
* build public job listing and job detail pages

## Phase 3 — Swipes and Match Creation

* implement seeker swipe endpoint
* implement employer swipe endpoint
* implement backend match creation logic
* build swipe card interfaces

## Phase 4 — Matches and Messaging

* build matches list
* build match detail page
* build message thread retrieval and sending
* add match status updates

## Phase 5 — Polish and Documentation

* UI cleanup
* loading and empty states
* validation improvements
* test/demo seed data
* screenshots
* final README

---

## 16. Testing Plan

## Backend Testing

* test auth endpoints
* test profile creation/update
* test job creation and update permissions
* test swipe creation and duplicate prevention
* test match creation logic
* test message permissions

## Frontend Testing

* test login/register flows
* test route protection
* test role-based navigation
* test swipe buttons
* test messaging form behavior
* test empty states and loading states

## Manual Testing

Use seeded demo accounts:

* one job seeker
* one employer
* one or more job postings
* one successful match flow

---

## 17. Security and Configuration Notes

## Environment Variables

Backend should use environment variables for:

* secret key
* database credentials
* JWT settings
* allowed hosts

Frontend should use environment variables for:

* API base URL

## Sensitive Data

Do not hard-code:

* database credentials
* secret keys
* tokens

## CORS

Allow only the frontend origin in development/production config.

---

## 18. Future Expansion Paths

Potential future technical improvements:

* realtime chat with WebSockets
* recommendation engine
* resume parsing service
* interview scheduling workflow
* notifications
* admin moderation dashboard

---

## 19. Recommended Deliverables

For a complete showcase-ready project, the final repository should include:

* working frontend
* working backend
* documentation folder
* setup instructions
* screenshots
* demo credentials or seed data
* polished README

---

## 20. Author

Haley Abel
Informatics Student — Indiana University Indianapolis
