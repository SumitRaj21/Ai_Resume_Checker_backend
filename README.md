# 🚀 AI Resume Builder & Interview Analyzer (Backend)

Backend API for an AI-powered platform that analyzes resumes, matches them with job descriptions, generates interview insights, and creates ATS-friendly resume PDFs.

---

## 📌 Features

* 🔐 **Authentication**

  * Register / Login / Logout
  * JWT-based authentication (HTTP-only cookies)

* 📄 **Resume Processing**

  * Upload resume (PDF)
  * Extract & process content

* 🤖 **AI Integration**

  * Generate interview analysis
  * Tailored resume generation
  * ATS-friendly suggestions

* 📊 **Interview Reports**

  * Match score
  * Strengths & weaknesses
  * Improvement suggestions

* 🧾 **PDF Generation**

  * Generate professional resume using HTML → PDF (Puppeteer)

---

## 🛠 Tech Stack

* **Node.js**
* **Express.js**
* **MongoDB + Mongoose**
* **Zod** (validation)
* **JWT Authentication**
* **Multer** (file uploads)
* **Puppeteer** (PDF generation)
* **Google Generative AI (Gemini API)**

---

## 📁 Project Structure

```
backend/
├── src/
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── interview.controller.js
│   │
│   ├── services/
│   │   ├── ai.service.js
│   │   ├── pdf.service.js
│   │   └── file.service.js
│   │
│   ├── models/
│   │   ├── user.model.js
│   │   └── interview.model.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   └── interview.routes.js
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   ├── error.middleware.js
│   │   └── upload.middleware.js
│   │
│   ├── utils/
│   │   └── helpers.js
│   │
│   ├── config/
│   │   ├── db.js
│   │   └── env.js
│   │
│   └── app.js
│
├── server.js
├── package.json
├── .env
```

---

## ⚙️ Setup Instructions

### 1. Clone Repository

```bash
git clone <your-repo-url>
cd backend
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Environment Variables

Create a `.env` file:

```
PORT=4040
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key

# Google AI
GEMINI_API_KEY=your_api_key
```

---

### 4. Run Server

```bash
npm run dev
```

Server will run on:
👉 http://localhost:4040

---

## 🔗 API Endpoints

### 🔐 Auth Routes

* `POST /api/auth/register` → Register user
* `POST /api/auth/login` → Login user
* `GET /api/auth/user` → Get current user
* `GET /api/auth/logout` → Logout user

---

### 🤖 Interview Routes

* `POST /api/interview/generate-report`

  * Upload resume + job description + self-description
  * Returns AI-generated report

* `GET /api/interview/reports`

  * Get all reports for logged-in user

* `GET /api/interview/report/:id`

  * Get specific report

* `GET /api/interview/resume/:id`

  * Generate & download resume PDF

---

## 🔐 Authentication Flow

1. User logs in → JWT stored in **HTTP-only cookie**
2. Middleware verifies token on protected routes
3. User data attached to request object
4. Secure session handling

---

## 🤖 AI Workflow

1. Resume + Job Description + Self Description received
2. Sent to **Gemini API**
3. AI generates:

   * Interview analysis
   * Suggestions
   * Resume HTML
4. HTML → converted to PDF using Puppeteer

---

## 📄 PDF Generation

* Uses **Puppeteer**
* Converts AI-generated HTML into:

  * Clean
  * Professional
  * ATS-friendly resume

---

## ⚠️ Common Issues

### ❌ Gemini Model Errors

* Use supported model (e.g. `gemini-1.5-flash`)
* Handle fallback if API fails

### ❌ Puppeteer in Production

* Use:

```
puppeteer.launch({
  args: ["--no-sandbox", "--disable-setuid-sandbox"]
})
```

---

## 📦 Build & Deployment

### Recommended:

* **Backend** → Render / Railway / AWS EC2
* **Database** → MongoDB Atlas

---

## 🚀 Future Improvements

* 📊 Advanced AI scoring system
* 📄 Resume templates
* 📈 Analytics dashboard
* 🧠 Better prompt engineering
* ⚡ Queue system for AI processing

---

## 👨‍💻 Author

**Sumit Raj**
Full Stack Developer (MERN)

---

## ⭐ Contribution

Feel free to fork and improve this project!

---
