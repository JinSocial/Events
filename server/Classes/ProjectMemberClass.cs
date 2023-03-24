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
					Role = "Member",
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
			try
			{

				var user = _context.Users.Where(u => u.Login == Login).FirstOrDefault();
				if (user != null) 
				{
					ProjectMember meberToBeRemoved = (ProjectMember)_context.ProjectMembers.Where(m => m.UserId == user.Id);
					if (meberToBeRemoved != null) 
					{
						_context.ProjectMembers.Remove(meberToBeRemoved);
						_context.SaveChanges();
						return true;
					}
					return false;
				}
				return false;
			}
			catch (Exception)
			{
				throw;
			}
		}
	}
}
