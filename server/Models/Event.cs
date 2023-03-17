using System;
using System.Collections.Generic;

namespace JinEventsWebAPI.Models;

public partial class Event
{
    public int Id { get; set; }

    public int ProjectId { get; set; }

    public string Title { get; set; } = null!;

    public DateTime Date { get; set; }

    public bool State { get; set; }

    public virtual Project Project { get; set; } = null!;
}
