# Task Manager Frontend

A minimal LitElement/Web Components frontend for the Task Manager API. It lists tasks, edits titles, and deletes tasks through the REST backend.

## Technology stack

- LitElement and Web Components
- JavaScript ES6+
- HTML5 and CSS3
- Vite for local development and production builds

## Running the application

Prerequisite: Node.js 22 or newer.

From the repository root, `npm install && npm run app:serve` starts the API and the frontend together.

To run only the frontend, start the backend first from `../backend`:

```bash
dotnet restore
dotnet run
```

Then start the frontend from this directory:

```bash
npm install
npm run dev
```

Open `http://localhost:5173`. The API base URL defaults to `https://localhost:5001/api/tasks`, and the backend already allows CORS from `http://localhost:5173`.

To use a different API address, copy `.env.example` to `.env` and change `VITE_API_BASE_URL`.

Other commands:

```bash
npm run build
npm run preview
```

## What the UI does

- Loads all tasks on startup from `GET /api/tasks`.
- Edits only the title with `PUT /api/tasks/{id}`.
- Removes a task with `DELETE /api/tasks/{id}`.
- Shows loading and error messages while requests run.

Unit tests with Vitest/Web Test Runner and E2E tests with Playwright will be added in later roadmap phases.

## Repository structure

```text
frontend/
├── src/
│   ├── components/
│   │   ├── task-app.js
│   │   ├── task-item.js
│   │   └── task-list.js
│   ├── services/
│   │   └── taskApi.js
│   ├── styles/
│   │   └── global.css
│   └── main.js
├── .env.example
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

`task-app` owns the application state, `task-list` renders the collection, and `task-item` renders a single task and emits `task-update` and `task-delete` events.
