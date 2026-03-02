# Livestock Web App

A full-stack livestock marketplace built with Node.js, Express, EJS, MongoDB, and Socket.IO.

## 🚀 Deployment Guide

### 1. MongoDB Atlas Setup
1. Go to [mongodb.com/atlas](https://mongodb.com/atlas) and create a free account
2. Create a free **M0 cluster**
3. Go to **Database Access** → Add a database user (save the username & password)
4. Go to **Network Access** → Add IP Address → Allow Access from Anywhere (`0.0.0.0/0`)
5. Click **Connect** → **Drivers** → copy the connection string
6. Replace `<password>` with your actual password in the string

### 2. Deploy on Render
1. Go to [render.com](https://render.com) and sign up with GitHub
2. Click **New +** → **Web Service** → connect this repo
3. Settings:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. Add these **Environment Variables**:
   | Key | Value |
   |-----|-------|
   | `MONGO_URI` | Your MongoDB Atlas connection string |
   | `SESSION_SECRET` | Any long random string |
   | `NODE_ENV` | `production` |
5. Click **Create Web Service** — your app will be live in ~3 minutes!

### 3. Local Development
1. Clone the repo
2. Copy `.env.example` to `.env` and fill in your values
3. Run `npm install`
4. Run `npm run dev`
5. Open `http://localhost:5000`

## 🛠 Tech Stack
- **Backend:** Node.js, Express.js
- **Frontend:** EJS, Bootstrap
- **Database:** MongoDB (Mongoose)
- **Real-time:** Socket.IO
- **File Uploads:** Multer (memory storage → stored in MongoDB)
- **Sessions:** express-session + connect-mongo
