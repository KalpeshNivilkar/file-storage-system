# Cloud-Based File Storage System 🚀

Similar to Google Drive: Upload, share, preview files with AWS S3 backend.

## ✨ Features
- **Modern React UI** with TailwindCSS & drag-drop uploads
- **Secure auth** (JWT signup/login)
- **AWS S3** cloud storage with versioning
- **MongoDB** file metadata
- **Shareable links**, preview, search, download/delete
- Responsive design

## 🛠️ Quick Start (Local)

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (free)
- AWS account + S3 bucket
- npm/yarn

### 1. Clone & Install
```bash
git clone <repo> file-storage-system
cd file-storage-system
```

### 2. Backend Setup
```bash
cd backend
cp .env.example .env
# Edit .env: MONGO_URI, JWT_SECRET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, S3_BUCKET
npm install
npm start  # http://localhost:5000
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev  # http://localhost:5173
```

### 4. Test
- Signup/Login at frontend
- Upload files → See in dashboard
- Share/download/delete

## 🚀 Deployment

### Backend (Render.com)
1. Push to GitHub
2. Render.com → New Web Service → Build: `npm install` → Start: `npm start`
3. Add env vars (MONGO_URI, AWS keys...)

### Frontend (Vercel)
1. Vercel CLI: `vercel --prod`
2. Env: `VITE_API_URL=https://your-backend.render.com/api`

### Database & Storage
- **MongoDB Atlas**: Create free cluster, get connection string
- **AWS S3**: Create bucket, enable versioning/public access as needed

## 📁 Project Structure
```
├── backend/      # Express + Mongoose + S3
├── frontend/     # React + Vite + Tailwind
├── README.md
└── TODO.md
```

## Environment Variables (backend/.env)
```
PORT=5000
MONGO_URI=mongodb+srv://...
JWT_SECRET=your-super-secret-key
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_REGION=us-east-1
S3_BUCKET=your-file-storage-bucket
```

## Scripts
- `backend`: `npm run dev` (nodemon)
- `frontend`: `npm run dev` (vite)
- `npm run build` (frontend prod)

## Tech Stack
- **Frontend**: React 18, Vite, TailwindCSS, React Router, Axios, React-Dropzone
- **Backend**: Node.js, Express, Mongoose, Multer, AWS-SDK v3, JWT
- **Infra**: MongoDB Atlas, AWS S3, Render/Vercel

**Check TODO.md for implementation progress!**

---
Built with ❤️ using BLACKBOXAI

