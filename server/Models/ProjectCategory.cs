using System;
using System.Collections.Generic;

namespace JinEventsWebAPI.Models;

public partial class ProjectCategory
{
    public string Title { get; set; } = null!;

    public string? Description { get; set; }

    public virtual ICollection<Project> Projects { get; } = new List<Project>();
}
