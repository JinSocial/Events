using JinEventsWebAPI.Interfaces;
using JinEventsWebAPI.Models;

namespace JinEventsWebAPI.Classes
{
	public class ProjectClass : IProject
	{
		private readonly JinEventsContext _context;
		public ProjectClass(JinEventsContext context) => _context = context;

		public bool CreateProject(Project project)
		{
			try
			{
				Project proj = new() 
				{
					Title = project.Title,
					Description = project.Description,
					Point = project.Point,
					ImgPath	= project.ImgPath,
					CreationDate = DateTime.Now,
				};

				_context.Projects.Add(proj);
				_context.SaveChanges();

				return true;
			}
			catch (Exception)
			{
				return false;
				throw;
			}
		}

		public List<Project> GetProjects()
		{
			try
			{
				var projects = _context.Projects.ToList();
				return projects;
			}
			catch (Exception)
			{
				throw;
			}
		}
	}
}
