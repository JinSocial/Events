using JinEventsWebAPI.Models;

namespace JinEventsWebAPI.Interfaces
{
	public interface IProjectMember
	{
		public List<ProjectMember> GetProjectMembers();
		public bool AddProjectMember(ProjectMember projectMember);
		public bool RemoveProjectMember(string Login);
	}
}
