using JinEventsWebAPI.Interfaces;
using JinEventsWebAPI.Models;
using Microsoft.AspNetCore.Http.HttpResults;

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
					Category = project.Category,
					Description = project.Description,
					Point = project.Point,
					ImgPath	= project.ImgPath,
					Created = DateTime.Now,
					Expires = project.Expires,
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

		public Project GetProjectById(int id)
		{
			try
			{
				var project = _context.Projects.Where(p => p.Id == id).FirstOrDefault();
				return project;
			}
			catch (Exception)
			{
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
