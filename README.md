# TaskFlow
TaskFlow is a simple task management web application built with Next.js, React, and Tailwind CSS. It allows users to create, manage, and track tasks through a clean and responsive interface.
The project was developed as part of the FlyRank Front-End AI Engineering Internship.


## Tech Stack
* **Framework:** Next.js
* **Library:** React
* **Styling:** Tailwind CSS
* **Language:** JavaScript
* **State Management:** React Context API
* **Storage:** Browser localStorage
* **3D:** Three.js and React Three Fiber
* **Deployment:** Vercel


## Features
* Create and manage tasks
* Mark tasks as completed
* Delete tasks
* Set task priority and deadline
* View task progress on the dashboard
* Store tasks using localStorage
* Responsive design for desktop and mobile
* Dark mode
* Health check page and API
* AI chat for viewing task statistics
* Interactive 3D task visualization


## FE-AA2 — 3D Web Experience
A separate 3D experience was added to TaskFlow at:
```text
/fe-aa2
```
The page uses Three.js with React Three Fiber to display an interactive 3D cube representing task status.


### 3D Interactions
The user can select different task statuses:
* **Pending** — Indigo
* **Completed** — Green
* **Overdue** — Red
Changing the status changes the color of the 3D cube.
The cube can also be rotated and zoomed using the available controls.
The 3D experience is kept simple by using a basic cube instead of a large 3D model. This helps keep the page lightweight and easier to use on different devices.


## Performance
The FE-AA2 page was tested using the production build:
```bash
npm run build
```
The build completed successfully with the 3D page included.
The 3D experience uses a simple object and does not require a large external model. The 3D section is also loaded separately from the main application.


## Future Improvements
With more time, the 3D experience could be improved by:
* Adding a more detailed 3D task model
* Adding animations when the task status changes
* Adding more visual effects and lighting
* Improving the 3D experience for different mobile devices
* Connecting the 3D visualization with the actual tasks in TaskFlow


## Run Locally
Clone the repository and install the required packages:
```bash
cd taskflow
npm install
npm run dev
```
Then open:
```text
http://localhost:3000
```
The 3D experience can be opened at:
```text
http://localhost:3000/fe-aa2
```


## Main Pages
* **Home** — Introduction to TaskFlow
* **Dashboard** — Shows task statistics and progress
* **Tasks** — View, complete, and delete tasks
* **Add Task** — Create a new task
* **Completed Tasks** — View completed tasks
* **Settings** — Application settings
* **Health** — Application health check
* **AI Chat** — Interact with the task statistics feature
* **FE-AA1** — Button interaction and animation demo
* **FE-AA2** — Interactive 3D experience


## How Task Data Works
Task data is managed using React Context API in:
```text
context/TaskContext.jsx
```
The task list is stored in the browser's localStorage. This allows tasks to remain available when moving between different pages of the application without requiring a separate database.


## Project Structure
```text
app/
├── page.js
├── dashboard/page.js
├── tasks/page.js
├── add-task/page.js
├── completed/page.js
├── settings/page.js
├── health/page.js
├── ai-chat/page.jsx
├── fe-aa1/page.jsx
├── fe-aa2/
│   ├── page.jsx
│   └── ThreeScene.jsx
├── api/
│   └── health/
│       └── route.js
├── layout.js
└── globals.css

components/
├── Navbar.jsx
├── Footer.jsx
├── TaskCard.jsx
├── TaskForm.jsx
└── DashboardCard.jsx

context/
└── TaskContext.jsx
```


## Development
The project was developed using an AI-assisted workflow.
AI tools were used to help with:
* Understanding Next.js and React concepts
* Debugging development issues
* Improving components and UI
* Writing and improving tests
* Exploring Three.js and React Three Fiber
* Reviewing implementation and documentation
The implementation and testing were done as part of the development process.
Additional project documentation:
* `AI_PROMPTS.md`
* `AI_ASSISTANCE.md`
* `MANUAL_IMPROVEMENTS.md`


## Live Demo
Main application:
https://taskflow-ai-react-app-d8p1.vercel.app/
FE-AA2:
```text
https://taskflow-ai-react-app-d8p1.vercel.app/fe-aa2
```
The FE-AA2 URL should be checked again after the latest changes are deployed.


## Repository
GitHub:
https://github.com/UnnatiAgarwal08/taskflow-ai-react-app


## Deployment
The project is deployed using Vercel.
Basic deployment process:
1. Push the project to GitHub
2. Connect the repository to Vercel
3. Select the Next.js project
4. Deploy the application


## AI Task Statistics
TaskFlow also includes an AI feature that can provide task statistics.
The `getTaskStats` tool returns:

```js
{
  total: number,
  completed: number,
  pending: number,
  completionRate: number
}
```
For example, a user can ask:
> "How many tasks do I have?"
The AI can use the task statistics feature to provide the current task counts.


## FE-AA3 — Fullscreen Shader Hero
A fullscreen WebGL shader hero was added to TaskFlow at:
```text
/fe-aa3


## Environment Variables
TaskFlow uses an environment variable for the AI chat feature.
Create a `.env.local` file in the project root:
```env
OPENROUTER_API_KEY=your_openrouter_api_key


## Screenshots
### Home
![TaskFlow Home](public/screenshots/home.png)

### Dashboard
![TaskFlow Dashboard](public/screenshots/dashboard.png)

### Tasks
![TaskFlow Tasks](public/screenshots/tasks.png)

### AI Chat
![TaskFlow AI Chat](public/screenshots/ai-chat.png)

### FE-AA2 — 3D Experience
![TaskFlow FE-AA2](public/screenshots/fe-aa2.png)

### FE-AA3 — Fullscreen Shader Hero
![TaskFlow FE-AA3](public/screenshots/fe-aa3.png)


## Architecture Overview
TaskFlow is built using Next.js and React.
- The UI is built with Next.js App Router and React.
- Task data is managed using React Context API.
- Tasks are stored in browser localStorage.
- The AI Chat page communicates with the `/api/chat` route.
- The `/api/chat` route uses the Vercel AI SDK to stream responses.
- OpenRouter is used as the AI model provider.
- The `getTaskStats` tool provides task statistics to the AI.
- The application is deployed to Vercel.


### AI Request Flow
User
  ↓
AI Chat UI
  ↓
/api/chat
  ↓
Input validation and request limits
  ↓
OpenRouter
  ↓
AI model
  ↓
Streaming response
  ↓
AI Chat UI


## API Protection
The AI chat API includes production safeguards to reduce unnecessary
or abusive API usage.
- Request input limits
- Message size limits
- Rate limiting
- Streaming execution timeout
- Invalid request handling


## Testing
The project was tested using the production build:
```bash
npm run build


## License
This project was developed as part of the FlyRank Front-End AI Engineering Internship.

