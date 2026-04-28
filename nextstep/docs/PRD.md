# NextStep — Product Requirements Document (PRD)

## 1. Overview

**NextStep** is a two-sided job matching platform that allows job seekers and employers to discover each other through swipe-based interactions. When both parties express interest, they form a match and can coordinate next steps such as interviews.

The goal is to simplify the job search process by making it faster, more intuitive, and focused on mutual interest rather than traditional application pipelines.

---

## 2. Problem Statement

### For Job Seekers

* Job searching is time-consuming and repetitive
* Applications often go unanswered
* Hard to know if an employer is genuinely interested

### For Employers

* Reviewing candidates is slow and inefficient
* Many applicants are not a good fit
* Limited insight into candidate interest

---

## 3. Goals

### Primary Goals

* Enable fast discovery of jobs and candidates
* Create a mutual interest-based matching system
* Allow users to move quickly to the next step (interview, discussion)

### Secondary Goals

* Provide a clean, modern user experience
* Demonstrate full-stack development and system design
* Create a scalable foundation for future features

---

## 4. Non-Goals (Version 1)

The following are intentionally excluded from Version 1:

* AI-based recommendations
* Resume parsing
* Video interviews or calls
* Calendar integration
* Email notifications
* Payment/subscription systems
* Advanced analytics

---

## 5. Target Users

### Job Seekers

* Students and recent graduates
* Entry-level professionals
* Individuals actively searching for jobs

### Employers

* Recruiters
* Hiring managers
* Small to mid-sized companies

---

## 6. Core Features (Version 1)

### 6.1 Authentication

* User registration
* Login/logout
* Role selection (Job Seeker or Employer)
* JWT-based authentication

---

### 6.2 Job Seeker Features

* Create and edit profile
* Define job preferences (location, salary, work type)
* Browse job cards
* Swipe left (pass) or right (interested)
* View matches
* Send messages to matched employers

---

### 6.3 Employer Features

* Create company profile
* Create and manage job postings
* Browse candidate cards for a job
* Swipe left (pass) or right (interested)
* View matches
* Send messages to matched candidates

---

### 6.4 Matching System

A match is created when:

* A job seeker swipes right on a job
* The employer swipes right on that candidate for the same job

Matches unlock:

* Messaging
* Status updates (e.g., interview requested)

---

### 6.5 Messaging (Minimal)

* Only available after a match
* Simple message thread per match
* Focused on coordination (not social chat)

---

### 6.6 Dashboards

#### Job Seeker Dashboard

* Profile summary
* Job recommendations (basic list)
* Matches
* Messages

#### Employer Dashboard

* Company overview
* Active job postings
* Candidate pool
* Matches
* Messages

---

## 7. User Flows

### Job Seeker Flow

1. Register → select "Job Seeker"
2. Complete profile
3. Browse jobs (swipe interface)
4. Like or pass jobs
5. Receive matches
6. Message employer
7. Move to next steps

---

### Employer Flow

1. Register → select "Employer"
2. Create company profile
3. Post a job
4. Browse candidates for that job
5. Like or pass candidates
6. Receive matches
7. Message candidate
8. Proceed with hiring steps

---

## 8. Success Criteria

Version 1 is successful if:

* Users can register and log in
* Users can create profiles
* Employers can post jobs
* Users can swipe on jobs/candidates
* Matches are correctly created
* Messaging works between matched users
* Basic dashboards function correctly

---

## 9. Future Enhancements

Potential features for future versions:

* AI-powered job/candidate recommendations
* Resume parsing
* Interview scheduling tools
* Notifications
* Match scoring system
* Saved jobs and candidates
* Analytics dashboard

---

## 10. Value Proposition

NextStep improves the hiring experience by:

* Reducing time spent applying and screening
* Ensuring mutual interest before engagement
* Creating a more engaging and modern user experience

It combines the efficiency of swipe-based discovery with the practicality of structured hiring workflows.

---

## 11. Author

#### Haley Abel
Informatics Student — Indiana University Indianapolis
