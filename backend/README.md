# Task Manager API

A minimal ASP.NET Core 8 REST API for reading, editing titles, and deleting tasks stored in memory. It is the backend for the Task Manager monorepo and is consumed by a LitElement/Web Components frontend.

## Stack

- .NET 8 and ASP.NET Core 8 Web API
- Controllers, services, models, and DTOs
- Dependency injection with a singleton in-memory task service
- Data Annotations validation for title updates
- Swagger/OpenAPI with Swashbuckle
- CORS for `http://localhost:8000` and `http://localhost:5173`

## Running the application

Prerequisite: .NET 8 SDK.

From this directory:

```bash
dotnet restore
dotnet run
```

The default `https` profile listens on:

- HTTPS: `https://localhost:5001`
- HTTP: `http://localhost:5000`

Swagger UI is available at `https://localhost:5001/swagger`. To run only on HTTP, use:

```bash
dotnet run --launch-profile http
```

If the HTTPS development certificate is not trusted, run `dotnet dev-certs https --trust` once.

The service starts with three sample tasks: `Review project requirements`, `Design task list component`, and `Connect frontend to the API`. Data is stored only in memory, so restarting the API restores the original sample tasks.

## Endpoints

| Method | Endpoint | Description | Success |
| --- | --- | --- | --- |
| `GET` | `/api/tasks` | List all tasks | `200 OK` |
| `GET` | `/api/tasks/{id}` | Get one task | `200 OK` |
| `PUT` | `/api/tasks/{id}` | Update only the task title | `200 OK` |
| `DELETE` | `/api/tasks/{id}` | Delete a task | `204 No Content` |

Missing resources return `404 Not Found`. Invalid titles return `400 Bad Request`.

## Examples

### List tasks

```bash
curl -k https://localhost:5001/api/tasks
```

```http
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

[
  {
    "id": 1,
    "title": "Review project requirements",
    "isCompleted": true,
    "createdAt": "2026-11-24T18:00:00.1234567Z"
  },
  {
    "id": 2,
    "title": "Design task list component",
    "isCompleted": false,
    "createdAt": "2026-11-24T18:10:00.1234567Z"
  },
  {
    "id": 3,
    "title": "Connect frontend to the API",
    "isCompleted": false,
    "createdAt": "2026-11-24T18:20:00.1234567Z"
  }
]
```

### Get a task by id

```bash
curl -k https://localhost:5001/api/tasks/1
```

```http
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "id": 1,
  "title": "Review project requirements",
  "isCompleted": true,
  "createdAt": "2026-11-24T18:00:00.1234567Z"
}
```

If the id does not exist:

```http
HTTP/1.1 404 Not Found
```

### Edit a task title

Only `title` is accepted. `isCompleted` and `createdAt` remain unchanged.

```bash
curl -k -i -X PUT https://localhost:5001/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Review requirements with the team"}'
```

```http
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "id": 1,
  "title": "Review requirements with the team",
  "isCompleted": true,
  "createdAt": "2026-11-24T18:00:00.1234567Z"
}
```

An empty or too-long title returns `400 Bad Request`:

```bash
curl -k -i -X PUT https://localhost:5001/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"title":""}'
```

### Delete a task

```bash
curl -k -i -X DELETE https://localhost:5001/api/tasks/1
```

```http
HTTP/1.1 204 No Content
```

## Repository structure

```text
backend/
├── Controllers/
│   └── TasksController.cs
├── DTOs/
│   └── UpdateTaskDto.cs
├── Models/
│   └── Task.cs
├── Services/
│   ├── ITaskService.cs
│   └── InMemoryTaskService.cs
├── Properties/
│   └── launchSettings.json
├── appsettings.json
├── Program.cs
├── TaskManager.Api.csproj
└── README.md
```
