using JinEventsWebAPI.Interfaces;
using JinEventsWebAPI.Models;

namespace JinEventsWebAPI.Classes
{
	public class ProjectClass : IProject
	{
		private readonly JinEventsContext _context;
		public ProjectClass(JinEventsContext context) => _context = context;

		private string? _projectName;

		public bool CreateProject(Project project)
		{
			try
			{
				DateTime expires = new DateTime()
					.AddYears(project.Expires.Year)
					.AddMonths(project.Expires.Month)
					.AddDays(project.Expires.Day)
					.AddHours(project.Expires.Hour)
					.AddMinutes(project.Expires.Minute)
					.AddSeconds(project.Expires.Second)
					.AddMilliseconds(project.Expires.Millisecond);

				Project proj = new()
				{
					Title = project.Title,
					Category = project.Category,
					Description	= project.Description,
					Point = project.Point,
					ImgPath = project.ImgPath,
					Created = DateTime.Now.ToUniversalTime(),
					Expires = project.Expires.ToUniversalTime(),
				};

				_context.Projects.Add(proj);
				_context.SaveChanges();
				return true;

				/// добавлять овнера
			}
			catch (Exception ex)
			{

				throw new Exception(ex.Message + ex.Source + ex.Data);
			}
		}

		private void AddOwner(int userId)
		{
			try
			{
				var QueryProject = _context.Projects.Where( p=> p.Title == _projectName).FirstOrDefault();

				if(QueryProject != null)
				{
					ProjectMember projectOwner = new()
					{
						ProjectId = QueryProject.Id,
						UserId = userId,
						Role = "Owner"
					};

					_context.ProjectMembers.Add(projectOwner);
					_context.SaveChanges();
				}
				else
				{
					throw new Exception("can`t create project without members");
				}
			}
			catch (Exception)
			{

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
