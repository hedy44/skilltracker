# Skilltracker

## Vision
A SaaS platform for real-time skill tracking, validation, and growth. Transform how developers, teams, and organizations manage competencies with live dashboards, API integrations, and practical evidence.

## Why?
Traditional CVs and skill checklists are obsolete. Skilltracker validates real skills using automation, project evidence, and peer review — driving real progress, not just assumptions.

## Stack
- **Frontend:** Next.js (TypeScript)
- **Backend:** Node.js (Express, TypeScript)
- **Database:** PostgreSQL (Prisma ORM)
- **Auth:** GitHub OAuth (NextAuth)
- **DevOps:** Docker, GitHub Actions
- **Cloud:** Vercel (initial deploy)
- **API:** REST + GraphQL

## Features (MVP Frontend)
- Add new skills with name and proficiency level
- Edit skills inline (change name and proficiency, with validation)
- Remove skills (with confirmation prompt)
- Success/error messages for user feedback
- All data saved in browser (localStorage)

## Roadmap (MVP)
- [x] Setup local environment
- [x] Initial folder structure
- [x] Visionary README
- [x] Initialize Next.js frontend
- [x] Add/Edit/Remove skills (frontend MVP)
- [x] Success/error feedback (frontend)
- [x] Remove skill with confirmation
- [ ] Initialize Express.js backend
- [ ] Docker Compose for all services
- [x] First working MVP: Validate skills, dashboard

## How to Run (Frontend Only)
```bash
cd frontend
npm install
npm run dev
```

## Deploy(Local)
1. Clone this repository.
2. Install dependecies: `npm install`.
3. Run locally : `npm run dev`.
4. For production build: `npm run build` then `npm start`.

## Deploy Vercel
- Connect this repository to Vercel (https://vercel.com/import/git).
- Push to the main branch.-
- Vercel will build and deploy automatically.
- Access the generated URL to test the app in production.




