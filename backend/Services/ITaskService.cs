using TaskManager.Api.DTOs;
using TaskModel = TaskManager.Api.Models.Task;

namespace TaskManager.Api.Services;

public interface ITaskService
{
    IReadOnlyList<TaskModel> GetAll();

    TaskModel? GetById(int id);

    TaskModel? Update(int id, UpdateTaskDto dto);

    TaskModel? Complete(int id);

    bool Delete(int id);
}
