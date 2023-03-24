using NpgsqlTypes;

namespace JinEventsWebAPI.Models;

public partial class Project
{
    public int Id { get; set; }

    public string Title { get; set; } = null!;

    public string? Category { get; set; }

    public string? Description { get; set; }

    public NpgsqlPoint Point { get; set; }

    public string? ImgPath { get; set; }

    public DateTime Created { get; set; }

    public DateTime Expires { get; set; }

    public virtual ProjectCategory? CategoryNavigation { get; set; }

    public virtual ICollection<Comment> Comments { get; } = new List<Comment>();

    public virtual ICollection<Event> Events { get; } = new List<Event>();

    public virtual ICollection<ProjectMember> ProjectMembers { get; } = new List<ProjectMember>();
}
