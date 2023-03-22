using JinEventsWebAPI.Models;

namespace JinEventsWebAPI.Interfaces
{
	public interface IProject
	{
		public List<Project> GetProjects();
		public Project GetProjectById(int id);
		public bool CreateProject(Project project);
	}
}
