# NextStep — API Specification

## 1. Overview

This document defines the Version 1 API contract for **NextStep**.

The API supports:

* authentication
* profile management
* job posting management
* swipe actions
* match creation/retrieval
* messaging

Version 1 assumes:

* a React frontend
* a Django REST Framework backend
* JWT authentication
* PostgreSQL database

Base API path example:

```text
/api/
```

---

## 2. Authentication

Authentication is handled with JWT.

### Auth Header Format

```http
Authorization: Bearer <access_token>
```

---

## 3. Auth Endpoints

## 3.1 Register User

**POST** `/api/auth/register/`

### Description

Create a new user account and assign a role.

### Request Body

```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "confirm_password": "SecurePassword123!",
  "role": "job_seeker"
}
```

### Valid roles

* `job_seeker`
* `employer`

### Success Response

**201 Created**

```json
{
  "message": "User registered successfully.",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "role": "job_seeker"
  }
}
```

### Error Response

**400 Bad Request**

```json
{
  "errors": {
    "email": ["A user with this email already exists."],
    "password": ["Password must meet complexity requirements."]
  }
}
```

---

## 3.2 Login User

**POST** `/api/auth/login/`

### Description

Authenticate a user and return JWT tokens.

### Request Body

```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

### Success Response

**200 OK**

```json
{
  "access": "jwt_access_token",
  "refresh": "jwt_refresh_token",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "role": "job_seeker"
  }
}
```

### Error Response

**401 Unauthorized**

```json
{
  "detail": "Invalid credentials."
}
```

---

## 3.3 Refresh Token

**POST** `/api/auth/token/refresh/`

### Request Body

```json
{
  "refresh": "jwt_refresh_token"
}
```

### Success Response

**200 OK**

```json
{
  "access": "new_access_token"
}
```

---

## 3.4 Get Current User

**GET** `/api/auth/me/`

### Description

Return the currently authenticated user.

### Success Response

**200 OK**

```json
{
  "id": 1,
  "email": "user@example.com",
  "role": "job_seeker"
}
```

---

## 4. Job Seeker Profile Endpoints

## 4.1 Create or Update Job Seeker Profile

**POST** `/api/job-seeker/profile/`
**PUT** `/api/job-seeker/profile/`

### Description

Create or update the authenticated job seeker’s profile.

### Request Body

```json
{
  "full_name": "Haley Abel",
  "headline": "Informatics student seeking software roles",
  "location": "Indianapolis, IN",
  "bio": "Student with experience in full-stack development and UI design.",
  "skills": ["JavaScript", "React", "Python", "SQL"],
  "education": "B.S. Informatics, Indiana University Indianapolis",
  "experience_summary": "Built academic and personal software projects.",
  "preferred_job_type": "Internship",
  "preferred_work_mode": "Hybrid",
  "preferred_salary_min": 20000,
  "preferred_salary_max": 50000,
  "resume_url": "https://example.com/resume.pdf"
}
```

### Success Response

**200 OK**

```json
{
  "message": "Profile saved successfully.",
  "profile": {
    "id": 1,
    "full_name": "Haley Abel"
  }
}
```

---

## 4.2 Get Job Seeker Profile

**GET** `/api/job-seeker/profile/`

### Success Response

**200 OK**

```json
{
  "id": 1,
  "full_name": "Haley Abel",
  "headline": "Informatics student seeking software roles",
  "location": "Indianapolis, IN",
  "skills": ["JavaScript", "React", "Python", "SQL"]
}
```

---

## 5. Employer Profile Endpoints

## 5.1 Create or Update Employer Profile

**POST** `/api/employer/profile/`
**PUT** `/api/employer/profile/`

### Request Body

```json
{
  "company_name": "Acme Tech",
  "contact_name": "Jordan Smith",
  "company_description": "A software company focused on modern web products.",
  "industry": "Technology",
  "location": "Chicago, IL",
  "website": "https://acmetech.example",
  "hiring_focus": "Interns and junior frontend developers"
}
```

### Success Response

**200 OK**

```json
{
  "message": "Employer profile saved successfully.",
  "profile": {
    "id": 2,
    "company_name": "Acme Tech"
  }
}
```

---

## 5.2 Get Employer Profile

**GET** `/api/employer/profile/`

### Success Response

**200 OK**

```json
{
  "id": 2,
  "company_name": "Acme Tech",
  "contact_name": "Jordan Smith",
  "industry": "Technology"
}
```

---

## 6. Job Posting Endpoints

## 6.1 Create Job Posting

**POST** `/api/employer/jobs/`

### Description

Create a new job posting for the authenticated employer.

### Request Body

```json
{
  "title": "Frontend Developer Intern",
  "description": "Assist with building React-based features.",
  "location": "Indianapolis, IN",
  "work_mode": "Hybrid",
  "salary_min": 20000,
  "salary_max": 30000,
  "employment_type": "Internship",
  "required_skills": ["React", "JavaScript", "CSS"],
  "status": "open"
}
```

### Success Response

**201 Created**

```json
{
  "message": "Job posting created successfully.",
  "job": {
    "id": 10,
    "title": "Frontend Developer Intern",
    "status": "open"
  }
}
```

---

## 6.2 List Job Postings for Discovery

**GET** `/api/jobs/`

### Description

List open job postings for job seekers.

### Query Parameters

* `location`
* `work_mode`
* `employment_type`
* `search`

### Example

```text
/api/jobs/?work_mode=Hybrid&search=frontend
```

### Success Response

**200 OK**

```json
[
  {
    "id": 10,
    "title": "Frontend Developer Intern",
    "company_name": "Acme Tech",
    "location": "Indianapolis, IN",
    "work_mode": "Hybrid",
    "salary_min": 20000,
    "salary_max": 30000
  }
]
```

---

## 6.3 Get Job Details

**GET** `/api/jobs/:id/`

### Success Response

**200 OK**

```json
{
  "id": 10,
  "title": "Frontend Developer Intern",
  "company_name": "Acme Tech",
  "description": "Assist with building React-based features.",
  "location": "Indianapolis, IN",
  "work_mode": "Hybrid",
  "employment_type": "Internship",
  "required_skills": ["React", "JavaScript", "CSS"],
  "status": "open"
}
```

---

## 6.4 List Employer Job Postings

**GET** `/api/employer/jobs/`

### Description

Return job postings created by the authenticated employer.

### Success Response

**200 OK**

```json
[
  {
    "id": 10,
    "title": "Frontend Developer Intern",
    "status": "open"
  }
]
```

---

## 6.5 Update Job Posting

**PUT** `/api/employer/jobs/:id/`

### Request Body

```json
{
  "title": "Frontend Developer Intern",
  "description": "Updated description",
  "status": "closed"
}
```

### Success Response

**200 OK**

```json
{
  "message": "Job posting updated successfully."
}
```

---

## 7. Swipe Endpoints

## 7.1 Job Seeker Swipe on Job

**POST** `/api/job-seeker/swipes/`

### Description

Record a job seeker swipe on a job posting.

### Request Body

```json
{
  "job_posting_id": 10,
  "direction": "right"
}
```

### Success Response

**201 Created**

```json
{
  "message": "Swipe recorded.",
  "match_created": false
}
```

### Possible Match Response

```json
{
  "message": "Swipe recorded.",
  "match_created": true,
  "match_id": 55
}
```

---

## 7.2 Employer Swipe on Candidate

**POST** `/api/employer/swipes/`

### Description

Record an employer swipe on a candidate for a specific job.

### Request Body

```json
{
  "job_posting_id": 10,
  "job_seeker_profile_id": 44,
  "direction": "right"
}
```

### Success Response

**201 Created**

```json
{
  "message": "Swipe recorded.",
  "match_created": false
}
```

### Possible Match Response

```json
{
  "message": "Swipe recorded.",
  "match_created": true,
  "match_id": 55
}
```

---

## 8. Candidate Discovery Endpoints

## 8.1 List Candidates for Employer Discovery

**GET** `/api/employer/jobs/:jobId/candidates/`

### Description

Return candidate cards for a specific employer job posting.

### Success Response

**200 OK**

```json
[
  {
    "job_seeker_profile_id": 44,
    "full_name": "Haley Abel",
    "headline": "Informatics student seeking frontend roles",
    "location": "Indianapolis, IN",
    "skills": ["React", "JavaScript", "CSS"]
  }
]
```

---

## 8.2 Get Candidate Details

**GET** `/api/employer/candidates/:id/`

### Success Response

**200 OK**

```json
{
  "job_seeker_profile_id": 44,
  "full_name": "Haley Abel",
  "headline": "Informatics student seeking frontend roles",
  "bio": "Student with project experience in web development.",
  "skills": ["React", "JavaScript", "CSS"],
  "education": "Indiana University Indianapolis",
  "experience_summary": "Built portfolio projects and web apps."
}
```

---

## 9. Match Endpoints

## 9.1 List Matches

**GET** `/api/matches/`

### Description

Return matches for the authenticated user.

### Success Response

**200 OK**

```json
[
  {
    "id": 55,
    "job_title": "Frontend Developer Intern",
    "job_seeker_name": "Haley Abel",
    "company_name": "Acme Tech",
    "status": "matched",
    "matched_at": "2026-04-18T14:00:00Z"
  }
]
```

---

## 9.2 Get Match Details

**GET** `/api/matches/:id/`

### Success Response

**200 OK**

```json
{
  "id": 55,
  "job": {
    "id": 10,
    "title": "Frontend Developer Intern"
  },
  "job_seeker": {
    "id": 44,
    "full_name": "Haley Abel"
  },
  "employer": {
    "id": 2,
    "company_name": "Acme Tech"
  },
  "status": "matched"
}
```

---

## 9.3 Update Match Status

**PATCH** `/api/matches/:id/`

### Request Body

```json
{
  "status": "interview_requested"
}
```

### Valid statuses

* `matched`
* `interview_requested`
* `in_review`
* `closed`

### Success Response

**200 OK**

```json
{
  "message": "Match status updated.",
  "status": "interview_requested"
}
```

---

## 10. Messaging Endpoints

## 10.1 List Messages for Match

**GET** `/api/matches/:id/messages/`

### Description

Return the message thread for a match.

### Success Response

**200 OK**

```json
[
  {
    "id": 1,
    "sender_user_id": 2,
    "content": "We’d like to schedule an interview.",
    "created_at": "2026-04-18T14:30:00Z"
  }
]
```

---

## 10.2 Send Message in Match

**POST** `/api/matches/:id/messages/`

### Request Body

```json
{
  "content": "Thank you! I’m available Wednesday and Thursday afternoon."
}
```

### Success Response

**201 Created**

```json
{
  "message": "Message sent successfully.",
  "data": {
    "id": 2,
    "content": "Thank you! I’m available Wednesday and Thursday afternoon."
  }
}
```

---

## 11. Error Handling

## Standard Error Format

```json
{
  "detail": "Error message here."
}
```

## Validation Error Format

```json
{
  "errors": {
    "field_name": ["This field is required."]
  }
}
```

## Common Status Codes

* `200 OK`
* `201 Created`
* `400 Bad Request`
* `401 Unauthorized`
* `403 Forbidden`
* `404 Not Found`

---

## 12. Authorization Rules

### Job Seeker-only endpoints

* `/api/job-seeker/profile/`
* `/api/job-seeker/swipes/`

### Employer-only endpoints

* `/api/employer/profile/`
* `/api/employer/jobs/`
* `/api/employer/swipes/`
* `/api/employer/jobs/:jobId/candidates/`

### Shared authenticated endpoints

* `/api/matches/`
* `/api/messages/`
* `/api/auth/me/`

---

## 13. Version 1 Notes

Version 1 does not include:

* realtime chat
* notifications
* interview scheduling integrations
* AI-based ranking

The API is intentionally scoped to the MVP workflow:

* create users
* create profiles
* create jobs
* swipe
* match
* message

---

## 14. Author

Haley Abel
Informatics Student — Indiana University Indianapolis
