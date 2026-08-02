# TaskFlow

A small, focused task manager built with Next.js App Router, React state, and Tailwind CSS.

## Run it locally

This project was hand-built to the exact structure of the FE-04 assignment (no `npx create-next-app` was run, since dependencies need to install on your machine, not in a sandbox). To get it running:

```bash
cd taskflow
npm install
npm run dev
```

Then open http://localhost:3000.

## What's included

- **Home** — welcome message, project intro, "Get Started" button
- **Dashboard** — total / completed / pending counts, plus a progress ring
- **Tasks** — full task list with complete + delete actions
- **Add Task** — form with name, description, priority, deadline
- **Completed Tasks** — filtered view of finished tasks
- **Settings** — Dark Mode and Notifications toggles
- **Health** — `/api/health` route + a page that fetches it live, satisfying the FE-04 health check requirement

## How task data works

Tasks live in `context/TaskContext.jsx` — a small Context provider that holds
the task list and persists it to `localStorage`, so it's shared across every
page (Tasks, Add Task, Completed, Dashboard) without a backend. This is one
addition beyond the folder list in the brief, but it's what makes "Add Task"
actually show up in "Tasks" and "Dashboard" without a database.

## Design tokens

- **Colors:** cool paper background `#F2F4F8`, ink text `#101828`, electric
  indigo accent `#5B5FEF` for actions, mint `#1FAE7A` for completed, coral
  `#FF6B6B` for high priority, amber `#F5A524` for medium priority.
- **Type:** Space Grotesk for headings, Inter for body text, JetBrains Mono
  for stats/timestamps.
- **Signature element:** the Dashboard's conic-gradient progress ring, and
  each Task Card's colored left-edge priority stripe.

## Folder structure

```
app/
├── page.js              ← Home
├── dashboard/page.js
├── tasks/page.js
├── add-task/page.js
├── completed/page.js
├── settings/page.js
├── health/page.js
├── api/health/route.js  ← health check data
├── layout.js
└── globals.css

components/
├── Navbar.jsx
├── Footer.jsx
├── TaskCard.jsx
├── TaskForm.jsx
└── DashboardCard.jsx

context/
└── TaskContext.jsx      ← shared task state + localStorage
```

## Next steps (matching your learning plan)

- **Phase 4 (Tailwind):** tune spacing/typography further if you want to push the design more.
- **Phase 5 (Health Check / Data Fetching):** the Health page already fetches `/api/health` client-side — good place to practice `fetch`, loading states, and error handling.
- **Phase 6 (Deploy):** push to GitHub, then import the repo into Vercel — no config changes needed, Vercel detects Next.js automatically.

## Suggested prompts for building on this (AI-as-assistant, not AI-as-builder)

- "Explain how `TaskContext.jsx` shares state between pages."
- "Add a filter to the Tasks page so I can show only High priority tasks."
- "Add sorting by deadline to the Tasks page."
- "Write a test for `toggleComplete` in TaskContext."
