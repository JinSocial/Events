using NpgsqlTypes;

namespace JinEventsWebAPI.Models.Dto
{
	public class ProjectDto
	{
		public string Title { get; set; } = null!;

		public string? Category { get; set; }

		public string? Description { get; set; }

		public NpgsqlPoint Point { get; set; }

		public string? ImgPath { get; set; }

		public DateTime Created { get; set; }

		public DateTime Expires { get; set; }
	}
}
