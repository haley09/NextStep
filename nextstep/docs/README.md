# NextStep – Job Matching Platform

NextStep is a full-stack job discovery and matching application designed to connect users with relevant job opportunities through an interactive swipe-based interface. The platform includes authentication, real-time matching, and messaging functionality.

---

## Features

### Authentication
- JWT-based authentication system
- Secure login and registration flow
- Protected routes and session handling

### Job Discovery
- Swipe-based job browsing (inspired by modern matching apps)
- Dynamic job recommendation interface
- Clean and responsive UI built with Tailwind CSS

### Matching System
- Users can “like” or “skip” job listings
- Matches are created when criteria align
- Stored and managed in backend database

### Messaging System
- Chat functionality between matched users
- Real-time-style interaction flow
- Organized conversation structure

### Backend System
- Django REST API handling:
  - authentication
  - job data
  - matching logic
  - messaging

### Frontend
- React-based SPA
- Tailwind CSS styling
- Component-based architecture

---

## Technologies Used

- Django
- Django REST Framework
- React
- Tailwind CSS
- JWT Authentication

---

## Key Concepts Demonstrated

- Full-stack application architecture
- API design and consumption
- Authentication and authorization
- State management in React
- User interaction design (swipe UX)
- Database modeling and relationships
- Real-time-like messaging systems

---

## Project Structure

backend/
  ├─ users/
  ├─ jobs/
  ├─ matches/
  ├─ messaging/

frontend/
  ├─ src/
  ├─ components/
  ├─ pages/
  ├─ hooks/
  ├─ services/

  
---

## How to Run

### Backend
```bash
cd backend
pip install -r requirements.txt
python manage.py runserver
```
### Frontend
```bash
cd frontend
npm install
npm start
```

---

### Project Purpose

NextStep was developed as a capstone-style project to demonstrate full-stack development skills, including API design, frontend architecture, authentication, and user-driven interaction systems.

---

### Future Improvements
Real-time WebSocket messaging
Advanced job recommendation algorithm
User profile customization
Deployment to cloud infrastructure

---

### Author

Haley Abel
Informatics Student – Indiana University Indianapolis