# Task Manager

A simple full-stack application for task management.

## Objective

Learn and demonstrate Web Components, LitElement, Polymer 2, REST API consumption, unit testing, E2E testing, and Gitflow.

> The in-memory ASP.NET Core API and a basic LitElement frontend are implemented. Remaining roadmap phases build on that foundation.

## Technology stack

- **Frontend:** LitElement, Web Components, JavaScript ES6+, HTML5, CSS3.
- **Backend:** ASP.NET Core 8 Web API.
- **Testing:** Vitest or Web Test Runner, Playwright.
- **Version control:** Git and Gitflow.

## Repository structure

```text
cells-lit-task-manager/
├── backend/
│   ├── Controllers/
│   ├── DTOs/
│   ├── Models/
│   ├── Services/
│   ├── Program.cs
│   └── README.md
├── frontend/
│   ├── src/
│   ├── index.html
│   ├── package.json
│   └── README.md
├── docs/
│   └── architecture.md
├── .github/
│   └── workflows/
│       └── ci.yml
├── .gitignore
├── LICENSE
├── package.json
├── package-lock.json
└── README.md
```

## Running the project

Prerequisites: .NET 8 SDK and Node.js 22 or newer.

From the repository root:

```bash
npm install
npm run app:serve
```

This starts both services together:

- API: `https://localhost:5001` (Swagger at `/swagger`)
- Frontend: `http://localhost:5173`

Individual commands are also available:

```bash
npm run api:serve
npm run web:serve
```

The frontend consumes the backend through the REST endpoints below.

## API endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/tasks` | List all tasks. |
| `GET` | `/api/tasks/{id}` | Get one task. |
| `PUT` | `/api/tasks/{id}` | Update only the task title. |
| `DELETE` | `/api/tasks/{id}` | Delete a task. |

## Roadmap

1. In-memory backend read, title-update, and delete operations.
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
