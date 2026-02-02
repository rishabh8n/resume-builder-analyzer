# AI Resume Builder & Analyzer

A full‑stack, AI‑powered resume builder for students and job seekers. It provides a modern drag‑and‑drop resume editor, templates, AI suggestions, ATS scoring, keyword/skill matching, and job‑fit analysis.

## ✨ Key Features (Planned)
- Drag‑and‑drop resume builder
- Template gallery + template editing
- Profile hub (store personal details, skills, projects)
- Autofill resume sections from saved profile
- Project relevance ranking using AI
- ATS scoring + keyword matching
- Skill matching + job relevance scoring
- PDF export + version history

## 🧱 Tech Stack
- **Frontend:** React + Vite + TypeScript + Tailwind + Shadcn UI
- **State:** Zustand + Immer
- **Routing:** React Router
- **Drag & Drop:** React DnD
- **HTTP:** Axios
- **Backend:** Node.js + Express
- **AI Service:** Python + FastAPI
- **Database:** MongoDB

## 📦 Monorepo Structure
```
ai-resume-builder/
  apps/
    web/        # React frontend
    api/        # Node/Express backend
  services/
    ai/         # Python FastAPI microservice
  packages/
    shared/     # Shared types/utils
```

## 🚀 Getting Started
### Web app
```bash
cd apps/web
npm install
npm run dev
```

## 📌 Notes
- This repo uses **npm workspaces** at the root.
- AI service and API will be scaffolded next.

---
Built for a 3‑month college capstone project.
