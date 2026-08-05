# TaskFlow
A small, focused task manager built with Next.js App Router, React state, and Tailwind CSS.


## Tech Stack
- **Framework:** Next.js (App Router)
- **Library:** React
- **Styling:** Tailwind CSS
- **State Management:** React Context API
- **Language:** JavaScript
- **Deployment:** Vercel
- **Development Approach:** AI-assisted development workflow


## Features
- Create and manage tasks
- Mark tasks as completed
- Delete tasks
- Track task progress through dashboard statistics
- Store tasks using localStorage persistence
- Responsive UI for desktop and mobile
- Dark mode support
- Health API monitoring endpoint


## Run it locally
This project follows the structure and requirements defined in the FE-04 assignment, including routing, reusable components, Tailwind styling, and a health check endpoint.
 To get it running:
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


## Design Tokens
- Custom color palette for backgrounds, priorities, and completed tasks
- Responsive typography using Google Fonts
- Dashboard progress ring and priority indicators for visual feedback


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


## Development Notes
Some AI-assisted prompts used during development:
- "Explain how `TaskContext.jsx` shares state between pages."
- "Add a filter to the Tasks page so I can show only High priority tasks."
- "Add sorting by deadline to the Tasks page."
- "Write a test for `toggleComplete` in TaskContext."


## Live Demo
Deployed Application:
https://taskflow-ai-react-app-d8p1.vercel.app/


## Repository
GitHub:
https://github.com/UnnatiAgarwal08/taskflow-ai-react-app


## AI-Assisted Development
AI tools were used throughout development as a coding assistant for:
- Exploring Next.js App Router structure
- Improving component organization
- Debugging implementation issues
- Reviewing UI improvements
- Refining documentation

Documentation:
- `AI_PROMPTS.md` — prompts used during development
- `AI_ASSISTANCE.md` — AI contributions and workflow
- `MANUAL_IMPROVEMENTS.md` — manual changes and refinements


## Deployment
The application is deployed using Vercel.
Steps:
1. Push the repository to GitHub
2. Import the repository into Vercel
3. Select Next.js framework preset
4. Deploy
No additional configuration is required.


## License
This project is developed as part of the FlyRank Front-End AI Engineering Internship.