using System.ComponentModel.DataAnnotations;

namespace TaskManager.Api.DTOs;

public class UpdateTaskDto
{
    [Required(AllowEmptyStrings = false)]
    [StringLength(200, MinimumLength = 1)]
    public string Title { get; set; } = string.Empty;
}
