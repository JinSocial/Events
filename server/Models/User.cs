namespace JinEventsWebAPI.Models;

public partial class User
{
    public int Id { get; set; }

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string Login { get; set; } = null!;

    public string? ImgPath { get; set; }

    public string? About { get; set; }

    public DateTime Created { get; set; }

    public decimal Rating { get; set; }

    public virtual ICollection<Comment> Comments { get; } = new List<Comment>();

    public virtual ICollection<ProjectMember> ProjectMembers { get; } = new List<ProjectMember>();
}
