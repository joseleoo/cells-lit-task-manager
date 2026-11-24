using TaskModel = TaskManager.Api.Models.Task;

namespace TaskManager.Api.Services;

public interface ITaskService
{
    IReadOnlyList<TaskModel> GetAll();

    TaskModel? GetById(int id);

    bool Delete(int id);
}
