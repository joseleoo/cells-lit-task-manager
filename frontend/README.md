# Task Manager Frontend

A minimal LitElement/Web Components frontend for the Task Manager API. It creates tasks, edits titles, marks tasks completed or uncompleted, and deletes tasks through the REST backend.

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

## Legacy Polymer 2 demo

The standalone Polymer 2 component lives in `legacy/legacy-task-badge`. Start it with:

```bash
npm run dev:legacy
```

Polymer CLI serves the frontend root in npm mode and opens `/legacy/legacy-task-badge/`.

Other commands:

```bash
npm run build
npm run preview
npm run dev:legacy
npm run test:e2e
npm run test:e2e:ui
```

## Testing

Playwright covers loading, creating, editing, deleting, the completion API, and uncompletion from the UI. The test run starts the backend and Vite automatically and uses `.env.test` for the API address.

```bash
npm run test:e2e
```

## What the UI does

- Loads all tasks on startup from `GET /api/tasks`.
- Creates a task with `POST /api/tasks`.
- Edits only the title with `PUT /api/tasks/{id}`.
- Marks a task completed with `PATCH /api/tasks/{id}/complete`.
- Marks a task uncompleted with `PATCH /api/tasks/{id}/uncomplete`.
- Removes a task with `DELETE /api/tasks/{id}`.
- Shows loading and error messages while requests run.

Unit tests with Vitest/Web Test Runner will be added in a later roadmap phase.

## Repository structure

```text
frontend/
├── legacy/
│   └── legacy-task-badge/
│       ├── index.html
│       ├── legacy-task-badge.css
│       ├── legacy-task-badge.html
│       └── legacy-task-badge.js
├── src/
│   ├── components/
│   │   ├── task-app.js
│   │   ├── task-badge.js
│   │   ├── task-item.js
│   │   └── task-list.js
│   ├── services/
│   │   └── taskApi.js
│   ├── styles/
│   │   └── global.css
│   └── main.js
├── tests/
│   └── tasks.spec.js
├── .env.example
├── .env.test
├── index.html
├── package.json
├── playwright.config.js
├── vite.config.js
└── README.md
```

`task-app` owns the application state and create form, `task-list` renders the collection, and `task-item` renders a single task and emits `task-update`, `task-complete`, `task-uncomplete`, and `task-delete` events.
