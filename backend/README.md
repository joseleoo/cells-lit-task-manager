# Task Manager API

A simple ASP.NET Core 8 Web API for managing tasks in the Task Manager monorepo.

## Technology stack

- ASP.NET Core 8
- C#
- Web API

## Planned API endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/tasks` | List all tasks. |
| `POST` | `/api/tasks` | Create a new task. |
| `PUT` | `/api/tasks/{id}` | Update an existing task. |
| `DELETE` | `/api/tasks/{id}` | Delete a task. |

## Running the application

Application code will be added in the first roadmap phase. Once the project file exists, run it from this directory:

```bash
dotnet restore
dotnet run
```

Data will initially be stored in memory. SQL Server persistence with Entity Framework is planned for a later phase.

## Repository structure (preliminary)

```text
backend/
├── Controllers/
│   └── TasksController.cs
├── Models/
│   └── TaskItem.cs
├── Services/
│   └── ITaskService.cs
├── Program.cs
├── appsettings.json
└── README.md
```
