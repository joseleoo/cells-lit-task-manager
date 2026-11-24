# Architecture

## Overview

Task Manager is a monorepo that separates a browser frontend from a REST backend. The current phase focuses on a small, explicit architecture for reading, editing titles, and deleting in-memory tasks.

```text
Browser
  -> LitElement / Web Components
  -> REST over HTTP + JSON
  -> ASP.NET Core 8 Web API
  -> In-memory task store
```

## Frontend boundary

The frontend owns presentation and user interaction only. Custom elements built with LitElement render the task list, inline title editor, and delete action. Data access is isolated in a service module that uses `fetch` to call the API, so components do not depend on endpoint details.

Planned testing layers:

- Unit tests with Vitest or Web Test Runner for components and the API service.
- E2E tests with Playwright for the full task lifecycle in a real browser.

## Backend boundary

The backend exposes a versionless REST surface under `/api/tasks`. Controllers handle HTTP concerns, while a service abstraction owns read, title-update, and delete rules. The service returns snapshots from an in-memory collection so callers cannot mutate stored state directly.

The in-memory store is intentionally simple: it seeds sample tasks and keeps them for the lifetime of the process. It will be replaced by Entity Framework Core and SQL Server in the final roadmap phase.

## Task model

| Field | Type | Notes |
| --- | --- | --- |
| `id` | `number` | Identifier assigned when the task is seeded. |
| `title` | `string` | Editable through `PUT`, 1-200 characters. |
| `isCompleted` | `boolean` | Read-only in this phase. |
| `createdAt` | `datetime` | Assigned when the task is seeded. |

## API contract

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/tasks` | Returns all tasks. |
| `GET` | `/api/tasks/{id}` | Returns one task. |
| `PUT` | `/api/tasks/{id}` | Updates only the task title. |
| `DELETE` | `/api/tasks/{id}` | Removes a task. |

All requests and responses use `application/json`. The frontend treats non-success responses as errors and renders them through a shared error state.

## State and UI behavior

- Collection state lives in a small application store or a top-level component.
- Components receive data through properties and emit custom events for user actions.
- Title editing uses a local draft in `task-item` and emits `task-update` only on save.
- Loading state is shown while requests are in flight.
- Error state is shown when a request fails.
- Filtering is applied client-side after the list is loaded.

## Gitflow

- `main`: stable, release-ready state.
- `develop`: integration branch for completed work.
- `feature/*`: new functionality.
- `release/*`: release preparation.
- `hotfix/*`: urgent fixes from `main`.

Pull requests target `develop`, except hotfixes, which target both `main` and `develop`.

## Evolution path

1. Add in-memory read, title-update, and delete operations to the ASP.NET Core API.
2. Build the LitElement components and static shell.
3. Connect components to the REST API.
4. Add filtering, loading, and error handling.
5. Add unit tests.
6. Add Playwright E2E coverage.
7. Enable GitHub Actions CI.
8. Replace the in-memory store with Entity Framework Core and SQL Server.
