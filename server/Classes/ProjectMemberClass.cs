using JinEventsWebAPI.Controllers.Services.UserService;
using JinEventsWebAPI.Interfaces;
using JinEventsWebAPI.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using System.Security.Claims;

namespace JinEventsWebAPI.Classes
{
	public class ProjectMemberClass : IProjectMember
	{
		private readonly JinEventsContext _context;
		private readonly IUserService _userService;

		public ProjectMemberClass(JinEventsContext context, IUserService userService)
		{
			_context = context;
			_userService = userService;
		}

		public bool AddProjectMember(string projectTitle)
		{
			try
			{
				int uId = Convert.ToInt32(_userService.GetUserId());
				
				var QueryProject = _context.Projects.Where( p => p.Title == projectTitle).FirstOrDefault();
				if (QueryProject != null)
				{
					ProjectMember pm = new()
					{
						ProjectId = QueryProject.Id,
						UserId = uId,
						Role = "Member",
					};
					_context.ProjectMembers.Add(pm);
					_context.SaveChanges();

					return true;
				}
				else
				{
					return false;
				}
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
