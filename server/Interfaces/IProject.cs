using JinEventsWebAPI.Models;

namespace JinEventsWebAPI.Interfaces
{
	public interface IProject
	{
		public List<Project> GetProjects();
		public bool CreateProject(Project project);
	}
}
