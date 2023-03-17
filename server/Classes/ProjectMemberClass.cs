using JinEventsWebAPI.Interfaces;
using JinEventsWebAPI.Models;

namespace JinEventsWebAPI.Classes
{
	public class ProjectMemberClass : IProjectMember
	{
		private readonly JinEventsContext _context;
		public ProjectMemberClass(JinEventsContext context) => _context = context;

		public bool AddProjectMember(ProjectMember projectMember)
		{
			try
			{
				ProjectMember pm = new()
				{
					ProjectId = projectMember.ProjectId,
					UserId = projectMember.UserId,
					Role = projectMember.Role,
				};
				_context.ProjectMembers.Add(pm);
				_context.SaveChanges();

				return true;
			}
			catch (Exception)
			{
				return false;
			}
		}

		public List<ProjectMember> GetProjectMembers()
		{
			try
			{
				var members = _context.ProjectMembers.ToList();
				return members;
			}
			catch (Exception)
			{
				throw;
			}
		}

		public bool RemoveProjectMember(string Login)
		{
			throw new NotImplementedException();
		}
	}
}
