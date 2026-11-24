using TaskModel = TaskManager.Api.Models.Task;

namespace TaskManager.Api.Services;

public class InMemoryTaskService : ITaskService
{
    private readonly object _sync = new();
    private readonly List<TaskModel> _tasks = new();
    private int _nextId = 1;

    public InMemoryTaskService()
    {
        SeedTasks();
    }

    public IReadOnlyList<TaskModel> GetAll()
    {
        lock (_sync)
        {
            return _tasks.Select(Clone).ToList();
        }
    }

    public TaskModel? GetById(int id)
    {
        lock (_sync)
        {
            var task = _tasks.FirstOrDefault(x => x.Id == id);
            return task is null ? null : Clone(task);
        }
    }

    public bool Delete(int id)
    {
        lock (_sync)
        {
            var task = _tasks.FirstOrDefault(x => x.Id == id);
            if (task is null)
            {
                return false;
            }

            _tasks.Remove(task);
            return true;
        }
    }

    private void SeedTasks()
    {
        var now = DateTime.UtcNow;

        _tasks.Add(new TaskModel
        {
            Id = _nextId++,
            Title = "Review project requirements",
            IsCompleted = true,
            CreatedAt = now.AddMinutes(-30)
        });

        _tasks.Add(new TaskModel
        {
            Id = _nextId++,
            Title = "Design task list component",
            IsCompleted = false,
            CreatedAt = now.AddMinutes(-20)
        });

        _tasks.Add(new TaskModel
        {
            Id = _nextId++,
            Title = "Connect frontend to the API",
            IsCompleted = false,
            CreatedAt = now.AddMinutes(-10)
        });
    }

    private static TaskModel Clone(TaskModel source) => new()
    {
        Id = source.Id,
        Title = source.Title,
        IsCompleted = source.IsCompleted,
        CreatedAt = source.CreatedAt
    };
}
