using Microsoft.AspNetCore.Mvc;
using TaskManager.Api.Services;
using TaskModel = TaskManager.Api.Models.Task;

namespace TaskManager.Api.Controllers;

[ApiController]
[Route("api/tasks")]
public class TasksController(ITaskService taskService) : ControllerBase
{
    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<TaskModel>), StatusCodes.Status200OK)]
    public ActionResult<IEnumerable<TaskModel>> GetAll()
    {
        return Ok(taskService.GetAll());
    }

    [HttpGet("{id:int}")]
    [ProducesResponseType(typeof(TaskModel), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<TaskModel> GetById(int id)
    {
        var task = taskService.GetById(id);
        return task is null ? NotFound() : Ok(task);
    }

    [HttpDelete("{id:int}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public IActionResult Delete(int id)
    {
        return taskService.Delete(id) ? NoContent() : NotFound();
    }
}
