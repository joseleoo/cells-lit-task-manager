# Task Manager

A simple full-stack application for task management.

## Objective

Learn and demonstrate Web Components, LitElement, Polymer 2, REST API consumption, unit testing, E2E testing, and Gitflow.

> This repository currently contains the initial structure and documentation. Application code will be added in the roadmap phases below.

## Technology stack

- **Frontend:** LitElement, Web Components, JavaScript ES6+, HTML5, CSS3.
- **Backend:** ASP.NET Core 8 Web API.
- **Testing:** Vitest or Web Test Runner, Playwright.
- **Version control:** Git and Gitflow.

## Repository structure

```text
cells-lit-task-manager/
├── backend/
│   └── README.md
├── frontend/
│   └── README.md
├── docs/
│   └── architecture.md
├── .github/
│   └── workflows/
│       └── ci.yml
├── .gitignore
├── LICENSE
└── README.md
```

## Running the project

These commands will be available once the corresponding roadmap phases are implemented.

### Backend

```bash
cd backend
dotnet restore
dotnet run
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend will consume the backend through the planned REST endpoints below.

## Planned API endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/tasks` | List all tasks. |
| `POST` | `/api/tasks` | Create a new task. |
| `PUT` | `/api/tasks/{id}` | Update an existing task. |
| `DELETE` | `/api/tasks/{id}` | Delete a task. |

## Roadmap

1. In-memory backend CRUD operations.
2. Frontend implementation using LitElement and Web Components.
3. Frontend-backend integration.
4. Filtering, loading states, and error handling.
5. Unit testing.
6. E2E testing with Playwright.
7. CI with GitHub Actions.
8. SQL Server persistence with Entity Framework.

## How to Contribute

1. Create a `feature/*` branch from `develop`.
2. Keep each change focused on a single roadmap phase or concern.
3. Run the available unit and E2E tests before opening a pull request.
4. Open a pull request targeting `develop` with a short description of the change.

`main` is reserved for stable releases, while `develop` is the integration branch used for Gitflow.

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for details.
