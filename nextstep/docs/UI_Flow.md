# NextStep — UI Flow and Page Map

## 1. Overview

This document outlines the main user interface structure for **NextStep** Version 1. It defines:

* the main pages in the application
* which users can access them
* how users move between screens
* the purpose of each page

NextStep has two primary user roles:

* **Job Seeker**
* **Employer**

Because the app is role-based, some pages are shared while others are role-specific.

---

## 2. Global Navigation Structure

## Public Navigation

Visible before login:

* Home
* Login
* Register

## Authenticated Job Seeker Navigation

* Dashboard
* Discover Jobs
* Matches
* Messages
* Profile
* Logout

## Authenticated Employer Navigation

* Dashboard
* Manage Jobs
* Discover Candidates
* Matches
* Messages
* Company Profile
* Logout

---

## 3. Public Pages

## 3.1 Landing Page

**Route:** `/`

### Purpose

Introduce the platform and explain how it works.

### Main content

* App name and branding
* Short product description
* “How it works” section
* CTA buttons:

  * Get Started
  * Login

### Main actions

* Navigate to register
* Navigate to login

---

## 3.2 Register Page

**Route:** `/register`

### Purpose

Allow a new user to create an account.

### Main content

* Email
* Password
* Confirm password
* Role selection:

  * Job Seeker
  * Employer

### Main actions

* Submit registration
* Redirect to role-based onboarding

---

## 3.3 Login Page

**Route:** `/login`

### Purpose

Allow existing users to log in.

### Main content

* Email
* Password
* Login button

### Main actions

* Submit login
* Redirect to role-based dashboard

---

## 4. Shared Authenticated Pages

## 4.1 Matches Page

**Route:** `/matches`

### Purpose

Display all mutual matches for the current user.

### Main content

* Match cards/list
* Job title
* Matched person/company
* Match status
* Button to open match details

### Main actions

* View match detail
* Open message thread

---

## 4.2 Messages Page

**Route:** `/messages`

### Purpose

Display all message threads related to matches.

### Main content

* List of match conversations
* Last message preview
* Match/job context

### Main actions

* Open conversation
* Send message

---

## 4.3 Match Detail Page

**Route:** `/matches/:id`

### Purpose

Show detailed information for a specific match.

### Main content

* Match information
* Job information
* Candidate/company summary
* Match status
* Message thread

### Main actions

* Send message
* Update match status

---

## 5. Job Seeker Flow

## 5.1 Job Seeker Onboarding / Profile Setup

**Route:** `/job-seeker/profile/setup`

### Purpose

Collect profile information after registration.

### Main content

* Full name
* Headline
* Location
* Bio
* Skills
* Education
* Experience summary
* Preferred job type
* Work mode preference
* Salary range
* Resume URL/upload field

### Main actions

* Save profile
* Continue to dashboard

---

## 5.2 Job Seeker Dashboard

**Route:** `/job-seeker/dashboard`

### Purpose

Provide a summary view for job seekers.

### Main content

* Welcome message
* Profile completion summary
* Recommended/open jobs
* Recent matches
* Recent messages

### Main actions

* Go to Discover Jobs
* Go to Matches
* Go to Messages
* Edit profile

---

## 5.3 Discover Jobs Page

**Route:** `/job-seeker/discover`

### Purpose

Allow job seekers to browse jobs in swipe-card format.

### Main content

* Job cards
* Swipe controls:

  * Like
  * Pass
* Optional quick filters:

  * location
  * work mode
  * job type

### Main actions

* Swipe left/right
* Open job details
* Save/filter later in future versions

---

## 5.4 Job Detail Page

**Route:** `/jobs/:id`

### Purpose

Show full job details.

### Main content

* Job title
* Company
* Description
* Required skills
* Salary range
* Work mode
* Employment type

### Main actions

* Swipe/like
* Pass
* Return to discover page

---

## 5.5 Job Seeker Profile Page

**Route:** `/job-seeker/profile`

### Purpose

Allow job seekers to view and edit their profile.

### Main content

* Profile information
* Resume link
* Preferences

### Main actions

* Edit and save profile
* Return to dashboard

---

## 6. Employer Flow

## 6.1 Employer Onboarding / Company Setup

**Route:** `/employer/profile/setup`

### Purpose

Collect employer/company details after registration.

### Main content

* Company name
* Contact name
* Company description
* Industry
* Location
* Website
* Hiring focus

### Main actions

* Save profile
* Continue to dashboard

---

## 6.2 Employer Dashboard

**Route:** `/employer/dashboard`

### Purpose

Provide a summary view for employers.

### Main content

* Welcome message
* Company summary
* Active job postings
* Recent matches
* Recent messages

### Main actions

* Create job
* Manage jobs
* Discover candidates
* Edit company profile

---

## 6.3 Create Job Posting Page

**Route:** `/employer/jobs/new`

### Purpose

Allow employers to create new job postings.

### Main content

* Title
* Description
* Location
* Work mode
* Salary range
* Employment type
* Required skills
* Status

### Main actions

* Save job posting
* Return to Manage Jobs

---

## 6.4 Manage Jobs Page

**Route:** `/employer/jobs`

### Purpose

Allow employers to manage job postings.

### Main content

* List of job postings
* Status indicators
* Candidate queue summary
* Buttons to edit/open/close jobs

### Main actions

* View job
* Edit job
* Close job
* Open candidate discovery for a job

---

## 6.5 Employer Job Detail Page

**Route:** `/employer/jobs/:id`

### Purpose

Show full job details and management options.

### Main content

* Job information
* Status
* Candidate queue count
* Link to swipe candidates

### Main actions

* Edit job
* Close job
* Discover candidates for this job

---

## 6.6 Discover Candidates Page

**Route:** `/employer/jobs/:id/discover`

### Purpose

Allow employers to review candidate cards for a specific job.

### Main content

* Candidate cards
* Skills summary
* Headline
* Location
* Experience summary
* Swipe controls:

  * Interested
  * Pass

### Main actions

* Swipe left/right
* Open candidate detail
* Return to job management

---

## 6.7 Candidate Detail Page

**Route:** `/employer/candidates/:id`

### Purpose

Show more detailed candidate information.

### Main content

* Candidate profile
* Skills
* Education
* Experience
* Resume link

### Main actions

* Swipe interested/pass for current job context
* Return to candidate discovery

---

## 6.8 Employer Profile Page

**Route:** `/employer/profile`

### Purpose

Allow employers to view and edit company profile information.

### Main content

* Company profile
* Contact details
* Hiring focus

### Main actions

* Edit and save profile
* Return to dashboard

---

## 7. Messaging Flow

## 7.1 Conversations List

**Route:** `/messages`

### Purpose

Show all conversations the current user can access.

### Main content

* Conversation preview cards
* Job context
* Participant name/company
* Last message

### Main actions

* Open specific conversation

---

## 7.2 Conversation Thread

**Route:** `/messages/:matchId`

### Purpose

Allow matched users to communicate.

### Main content

* Message thread
* Text input
* Match details
* Status badge

### Main actions

* Send message
* Update match status

---

## 8. Error / Utility Pages

## 8.1 Not Found Page

**Route:** `*`

### Purpose

Handle invalid routes.

### Main content

* 404 message
* Link back home/dashboard

---

## 8.2 Unauthorized Page

**Route:** optional dedicated page

### Purpose

Inform users they do not have access.

### Main content

* Access denied message
* Link to appropriate area

---

## 9. Flow Summary by Role

## Job Seeker Main Flow

1. Landing page
2. Register/Login
3. Profile setup
4. Dashboard
5. Discover jobs
6. Swipe on jobs
7. View matches
8. Message employer

## Employer Main Flow

1. Landing page
2. Register/Login
3. Company setup
4. Dashboard
5. Create job posting
6. Manage jobs
7. Discover candidates
8. Swipe on candidates
9. View matches
10. Message candidate

---

## 10. UX Notes for Version 1

### General Design Goals

* Professional but approachable
* Mobile-friendly card-based layout
* Fast and simple interactions
* Clear role-based dashboards

### Job Discovery UX

* Swipe cards should be quick and intuitive
* Include buttons as a fallback for users who do not want gesture-based swiping

### Candidate Discovery UX

* Candidate cards should emphasize:

  * headline
  * skills
  * experience
  * location

### Messaging UX

* Keep messaging simple and purposeful
* Focus on interview coordination and next steps

---

## 11. Future UI Additions

Possible future screens:

* Saved jobs
* Saved candidates
* Notifications center
* Interview scheduling
* Match recommendations
* Analytics dashboard

---

## 12. Author

Haley Abel
Informatics Student — Indiana University Indianapolis
