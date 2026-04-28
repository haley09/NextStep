# NextStep — Database Schema

## 1. Overview

NextStep uses a relational database structure because the platform depends on clear relationships between:

* users
* profiles
* job postings
* swipes
* matches
* messages

This document defines the core Version 1 data model for the application.

---

## 2. Entity Relationship Summary

### Main entities

* **User**
* **JobSeekerProfile**
* **EmployerProfile**
* **JobPosting**
* **JobSeekerSwipe**
* **EmployerSwipe**
* **Match**
* **Message**

### Relationship overview

* One **User** has one role
* A **User** can have one **JobSeekerProfile** or one **EmployerProfile**
* One **EmployerProfile** can create many **JobPostings**
* One **JobSeekerProfile** can swipe on many **JobPostings**
* One **EmployerProfile** can swipe on many **JobSeekerProfiles** for a specific **JobPosting**
* One **Match** belongs to one job seeker, one employer, and one job posting
* One **Match** can have many **Messages**

---

## 3. Tables / Models

## 3.1 User

Stores login and account-level information.

| Field         | Type           | Description                |
| ------------- | -------------- | -------------------------- |
| id            | UUID / Integer | Primary key                |
| email         | String         | Unique login email         |
| password_hash | String         | Hashed password            |
| role          | Enum           | `job_seeker` or `employer` |
| is_active     | Boolean        | Account status             |
| created_at    | DateTime       | Record creation time       |
| updated_at    | DateTime       | Record update time         |

### Notes

* Authentication is tied to this table
* Role determines which profile type the user can create

---

## 3.2 JobSeekerProfile

Stores job seeker-specific profile details.

| Field                | Type           | Description                            |
| -------------------- | -------------- | -------------------------------------- |
| id                   | UUID / Integer | Primary key                            |
| user_id              | FK -> User.id  | Associated user                        |
| full_name            | String         | Job seeker name                        |
| headline             | String         | Short professional headline            |
| location             | String         | Current location                       |
| bio                  | Text           | Summary/about section                  |
| skills               | Text / JSON    | Skills list                            |
| education            | Text           | Education summary                      |
| experience_summary   | Text           | Work/project experience                |
| preferred_job_type   | String         | Full-time, part-time, internship, etc. |
| preferred_work_mode  | String         | Remote, hybrid, on-site                |
| preferred_salary_min | Integer        | Minimum desired salary                 |
| preferred_salary_max | Integer        | Maximum desired salary                 |
| resume_url           | String         | Uploaded resume path or external link  |
| created_at           | DateTime       | Record creation time                   |
| updated_at           | DateTime       | Record update time                     |

### Notes

* One user can only have one job seeker profile
* Can later be expanded with portfolio links or certifications

---

## 3.3 EmployerProfile

Stores employer/company information.

| Field               | Type           | Description                       |
| ------------------- | -------------- | --------------------------------- |
| id                  | UUID / Integer | Primary key                       |
| user_id             | FK -> User.id  | Associated user                   |
| company_name        | String         | Company name                      |
| contact_name        | String         | Recruiter or hiring manager       |
| company_description | Text           | About the company                 |
| industry            | String         | Industry/category                 |
| location            | String         | Main location                     |
| website             | String         | Company website                   |
| hiring_focus        | Text           | Types of roles commonly hired for |
| created_at          | DateTime       | Record creation time              |
| updated_at          | DateTime       | Record update time                |

### Notes

* One user can only have one employer profile
* An employer profile can create many job postings

---

## 3.4 JobPosting

Stores jobs created by employers.

| Field               | Type                     | Description                                |
| ------------------- | ------------------------ | ------------------------------------------ |
| id                  | UUID / Integer           | Primary key                                |
| employer_profile_id | FK -> EmployerProfile.id | Creator of the job                         |
| title               | String                   | Job title                                  |
| description         | Text                     | Full job description                       |
| location            | String                   | Job location                               |
| work_mode           | String                   | Remote, hybrid, on-site                    |
| salary_min          | Integer                  | Minimum salary                             |
| salary_max          | Integer                  | Maximum salary                             |
| employment_type     | String                   | Full-time, part-time, internship, contract |
| required_skills     | Text / JSON              | Skills required                            |
| status              | Enum                     | `open` or `closed`                         |
| created_at          | DateTime                 | Record creation time                       |
| updated_at          | DateTime                 | Record update time                         |

### Notes

* One employer can create many jobs
* A job posting is central to the matching workflow

---

## 3.5 JobSeekerSwipe

Stores swipes made by job seekers on jobs.

| Field                 | Type                      | Description        |
| --------------------- | ------------------------- | ------------------ |
| id                    | UUID / Integer            | Primary key        |
| job_seeker_profile_id | FK -> JobSeekerProfile.id | Swiping job seeker |
| job_posting_id        | FK -> JobPosting.id       | Target job         |
| direction             | Enum                      | `left` or `right`  |
| created_at            | DateTime                  | Swipe timestamp    |

### Notes

* A job seeker should only have one swipe per job posting
* Use a unique constraint on `(job_seeker_profile_id, job_posting_id)`

---

## 3.6 EmployerSwipe

Stores swipes made by employers on candidates for a specific job.

| Field                 | Type                      | Description       |
| --------------------- | ------------------------- | ----------------- |
| id                    | UUID / Integer            | Primary key       |
| employer_profile_id   | FK -> EmployerProfile.id  | Swiping employer  |
| job_posting_id        | FK -> JobPosting.id       | Job context       |
| job_seeker_profile_id | FK -> JobSeekerProfile.id | Target candidate  |
| direction             | Enum                      | `left` or `right` |
| created_at            | DateTime                  | Swipe timestamp   |

### Notes

* This swipe is tied to a specific job posting
* Use a unique constraint on `(employer_profile_id, job_posting_id, job_seeker_profile_id)`

---

## 3.7 Match

Created when both sides swipe right for the same job.

| Field                 | Type                      | Description                                             |
| --------------------- | ------------------------- | ------------------------------------------------------- |
| id                    | UUID / Integer            | Primary key                                             |
| job_posting_id        | FK -> JobPosting.id       | Job tied to the match                                   |
| employer_profile_id   | FK -> EmployerProfile.id  | Employer in the match                                   |
| job_seeker_profile_id | FK -> JobSeekerProfile.id | Job seeker in the match                                 |
| status                | Enum                      | `matched`, `interview_requested`, `in_review`, `closed` |
| matched_at            | DateTime                  | Time match was created                                  |
| updated_at            | DateTime                  | Last match update                                       |

### Notes

* A match should be unique per job seeker and job posting
* Use a unique constraint on `(job_posting_id, job_seeker_profile_id)`

---

## 3.8 Message

Stores messages exchanged after a match.

| Field          | Type           | Description    |
| -------------- | -------------- | -------------- |
| id             | UUID / Integer | Primary key    |
| match_id       | FK -> Match.id | Parent match   |
| sender_user_id | FK -> User.id  | Message sender |
| content        | Text           | Message body   |
| created_at     | DateTime       | Time sent      |

### Notes

* Only matched users can send messages
* Messages belong to one match thread

---

## 4. Relationship Rules

## User/Profile Rules

* A user must have exactly one role
* A user can only create one profile matching that role
* A user cannot have both a job seeker and employer profile in Version 1

## Swipe Rules

* Job seekers swipe on jobs
* Employers swipe on job seekers for a specific job
* Duplicate swipes should be prevented with unique constraints

## Match Rules

A match is created only when:

1. job seeker swipes right on a job
2. employer swipes right on that job seeker for the same job

## Messaging Rules

* Messages are only allowed inside a match
* Only users associated with that match can view/send messages

---

## 5. Recommended Enums

## User.role

* `job_seeker`
* `employer`

## JobPosting.status

* `open`
* `closed`

## Swipe.direction

* `left`
* `right`

## Match.status

* `matched`
* `interview_requested`
* `in_review`
* `closed`

---

## 6. Example Data Flow

### Example: Successful Match

1. Employer posts **Frontend Developer Intern**
2. Job seeker swipes right on that posting
3. Employer reviews that candidate in the context of that job
4. Employer swipes right
5. System creates a Match record
6. Messaging is unlocked

---

## 7. Future Schema Expansion

Possible future additions:

* saved jobs
* saved candidates
* interview scheduling
* notifications
* profile media/portfolio links
* skill tags table
* match score table
* admin moderation tools

---

## 8. Implementation Notes

For Django + PostgreSQL:

* use Django’s built-in `User` model extension or a custom user model
* use foreign keys for relationships
* use `choices=` for enum-like fields
* enforce uniqueness with `UniqueConstraint`
* use `created_at` and `updated_at` timestamps consistently

---

## 9. Author

Haley Abel
Informatics Student — Indiana University Indianapolis
