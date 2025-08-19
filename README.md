# 🏆 Leaderboard App

A simple leaderboard web application built with **React + TypeScript** for the frontend and **Node.js + Express + MongoDB** for the backend.  
Users can add their name, earn points, and view the leaderboard.

---

## 🚀 Features
- Add a new user  
- Claim points for a user  
- View a leaderboard (sorted by points)  
- RESTful API with Express  
- Frontend API integration using Axios  

---

## 🛠️ Tech Stack
- **Frontend:** React, TypeScript, Axios, Vite  
- **Backend:** Node.js, Express, MongoDB (Mongoose)  
- **Deployment:** (e.g., Vercel for frontend, Render/Heroku for backend)  

---

## 🚀 Demo
[Live Demo](https://leaderboard-task-murex.vercel.app/)

---



## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/leaderboard-app.git
cd leaderboard-app
```
### 2. Backend Setup
```bash
cd backend
npm install
```
####  Create a .env file inside backend:
```bash
MONGO_URI=your_mongo_db_connection_string
PORT=3000
```
#### Start the backend:
```bash
npm run dev
```
### 3. Frontend Setup
```bash
cd frontend
npm install
```
####  Create a .env file inside frontend:
```bash
VITE_BASE_URI=http://localhost:3000/api

```
#### Start the frontend:
```bash
npm run dev
```

---

✨ Author

Developed by Daljit Singh




