using System;
using System.Collections.Generic;

namespace JinEventsWebAPI.Models;

public partial class ProjectCategory
{
    public int Id { get; set; }

    public string Title { get; set; } = null!;

    public string? Description { get; set; }

    public virtual ICollection<Project> Projects { get; } = new List<Project>();
}
