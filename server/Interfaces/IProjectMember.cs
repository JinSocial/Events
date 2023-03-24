using JinEventsWebAPI.Models;

namespace JinEventsWebAPI.Interfaces
{
	public interface IProjectMember
	{
		public List<ProjectMember> GetProjectMembers();
		public bool AddProjectMember(string projectTitle);
		public bool RemoveProjectMember(string login);
	}
}
