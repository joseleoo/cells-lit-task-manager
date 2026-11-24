using System.ComponentModel.DataAnnotations;

namespace TaskManager.Api.Models;

public class Task
{
    public int Id { get; set; }

    [Required]
    [StringLength(200, MinimumLength = 1)]
    public string Title { get; set; } = string.Empty;

    public bool IsCompleted { get; set; }

    public DateTime CreatedAt { get; set; }
}
