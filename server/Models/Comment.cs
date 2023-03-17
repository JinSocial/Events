namespace JinEventsWebAPI.Models;

public partial class Comment
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public int ProjectId { get; set; }

    public string Message { get; set; } = null!;

    public DateTime Date { get; set; }

    public virtual Project Project { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
