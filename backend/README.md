# Task Manager API

A minimal ASP.NET Core 8 REST API for managing tasks in memory. It is the backend for the Task Manager monorepo and will be consumed later by a LitElement/Web Components frontend.

## Stack

- .NET 8 and ASP.NET Core 8 Web API
- Controllers, services, models, and DTOs
- Dependency injection with a singleton in-memory task service
- Data Annotations validation
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

Data is stored only in memory inside the singleton service. Restarting the API clears all tasks.

## Endpoints

| Method | Endpoint | Description | Success |
| --- | --- | --- | --- |
| `GET` | `/api/tasks` | List all tasks | `200 OK` |
| `GET` | `/api/tasks/{id}` | Get one task | `200 OK` |
| `POST` | `/api/tasks` | Create a task | `201 Created` |
| `PUT` | `/api/tasks/{id}` | Update title and/or completion | `200 OK` |
| `DELETE` | `/api/tasks/{id}` | Delete a task | `204 No Content` |

Missing resources return `404 Not Found`. Invalid payloads return `400 Bad Request`.

## Examples

### Create a task

```bash
curl -i -X POST https://localhost:5001/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Prepare demo"}'
```

```http
HTTP/1.1 201 Created
Location: https://localhost:5001/api/tasks/1
Content-Type: application/json; charset=utf-8

{
  "id": 1,
  "title": "Prepare demo",
  "isCompleted": false,
  "createdAt": "2026-11-24T18:30:00.1234567Z"
}
```

### List tasks

```bash
curl -i https://localhost:5001/api/tasks
```

```http
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

[
  {
    "id": 1,
    "title": "Prepare demo",
    "isCompleted": false,
    "createdAt": "2026-11-24T18:30:00.1234567Z"
  }
]
```

### Get a task by id

```bash
curl -i https://localhost:5001/api/tasks/1
```

```http
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "id": 1,
  "title": "Prepare demo",
  "isCompleted": false,
  "createdAt": "2026-11-24T18:30:00.1234567Z"
}
```

If the id does not exist:

```http
HTTP/1.1 404 Not Found
```

### Update a task

Both fields are optional, so a partial payload is valid.

```bash
curl -i -X PUT https://localhost:5001/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"isCompleted":true}'
```

```http
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "id": 1,
  "title": "Prepare demo",
  "isCompleted": true,
  "createdAt": "2026-11-24T18:30:00.1234567Z"
}
```

An empty or too-long title returns `400 Bad Request`:

```bash
curl -i -X POST https://localhost:5001/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":""}'
```

### Delete a task

```bash
curl -i -X DELETE https://localhost:5001/api/tasks/1
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
│   ├── CreateTaskDto.cs
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
