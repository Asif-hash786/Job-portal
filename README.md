# 💼 Job Portal

A full-stack Job Portal web application that connects **job seekers** with **recruiters**. Users can create profiles, upload resumes, explore jobs, and manage their applications, while recruiters can manage companies and job postings.

## 🚀 Features

### 👨‍💻 Job Seeker

- User registration and login
- Secure authentication
- Create and update profile
- Add bio and skills
- Upload resume in PDF format
- Browse available jobs
- Search and explore jobs by category
- Apply for jobs
- Manage job applications

### 🏢 Recruiter

- Recruiter registration and login
- Create and manage company profiles
- Post job openings
- Manage posted jobs
- View job applicants
- Manage recruitment information

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- JavaScript
- Tailwind CSS
- shadcn/ui
- Redux Toolkit
- React Router
- Axios
- Lucide React

### Backend

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- JWT Authentication
- bcrypt
- Multer
- Cloudinary

## 📁 Project Structure

```text
JOB PORTAL/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── services/
│   │   └── App.jsx
│   │
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── prisma/
│   │   └── server.js
│   │
│   └── package.json
│
└── README.md