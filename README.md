# Task Manager

A full-stack task manager with an ASP.NET Core 8 REST API and a LitElement/Web Components frontend.

## Objective

Learn and demonstrate Web Components, LitElement, Polymer 2, REST API consumption, unit testing, E2E testing, and Gitflow.

> Current phase: the API and frontend support create, read, title editing, completion, uncompletion, and delete with in-memory persistence.

## Technology stack

- **Frontend:** LitElement, Web Components, JavaScript ES6+, HTML5, CSS3.
- **Backend:** ASP.NET Core 8 Web API.
- **Testing:** Playwright for E2E; unit tests with Vitest or Web Test Runner are planned.
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

## Current features

- Seeded in-memory tasks plus creation through `POST /api/tasks`.
- Title-only editing through `PUT /api/tasks/{id}`.
- Completion and uncompletion through dedicated `PATCH` endpoints.
- Deletion through `DELETE /api/tasks/{id}`.
- LitElement UI with a create form, inline title editor, status badges, loading, and error states.
- Swagger/OpenAPI and CORS configured for local frontend development.
- Playwright E2E coverage for the main task lifecycle.

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

## Testing

Run the Playwright suite from the repository root. It starts the API and frontend automatically:

```bash
npm run test:e2e
```

From `frontend`, `npm run test:e2e:ui` opens the interactive runner. Tests use `frontend/.env.test` to point the browser at the local API.

The frontend consumes the backend through the REST endpoints below.

## API endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/tasks` | List all tasks. |
| `GET` | `/api/tasks/{id}` | Get one task. |
| `POST` | `/api/tasks` | Create a task. |
| `PUT` | `/api/tasks/{id}` | Update only the task title. |
| `PATCH` | `/api/tasks/{id}/complete` | Mark a task as completed. |
| `PATCH` | `/api/tasks/{id}/uncomplete` | Mark a task as uncompleted. |
| `DELETE` | `/api/tasks/{id}` | Delete a task. |

## Roadmap

1. [x] In-memory backend create, read, title-update, completion, uncompletion, and delete operations.
2. [x] Frontend implementation using LitElement and Web Components.
3. [x] Frontend-backend integration.
4. [x] Loading states and error handling.
5. [ ] Filtering.
6. [ ] Unit testing.
7. [x] E2E testing with Playwright.
8. [x] CI workflow with GitHub Actions.
9. [ ] SQL Server persistence with Entity Framework.

## How to Contribute

1. Create a `feature/*` branch from `develop`.
2. Keep each change focused on a single roadmap phase or concern.
3. Run the builds and E2E tests before opening a pull request.
4. Open a pull request targeting `develop` with a short description of the change.

`main` is reserved for stable releases, while `develop` is the integration branch used for Gitflow.

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for details.
