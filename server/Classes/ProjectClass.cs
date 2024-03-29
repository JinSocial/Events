﻿using JinEventsWebAPI.Controllers.Services.UserService;
using JinEventsWebAPI.Interfaces;
using JinEventsWebAPI.Models;

namespace JinEventsWebAPI.Classes
{
	public class ProjectClass : IProject
	{
		private readonly JinEventsContext _context;
		private readonly IUserService _userService;

		public ProjectClass(JinEventsContext context, IUserService userService)
		{
			_context = context;
			_userService = userService;
		}

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

				string? login = _userService.GetUserLogin().ToString();
				
				if (login != null)
				{
					AddOwner(login, project.Title);
					return true;
				}

				return false;
			}
			catch (Exception ex)
			{

				throw new Exception(ex.Message + ex.Source + ex.Data);
			}
		}

		private void AddOwner(string login, string projectName)
		{
			try
			{
				var QueryProject = _context.Projects.Where( p=> p.Title == projectName).FirstOrDefault();
				var QueryUser = _context.Users.Where( u => u.Login == login ).FirstOrDefault();

				if(QueryProject != null && QueryUser != null)
				{
					ProjectMember projectOwner = new()
					{
						ProjectId = QueryProject.Id,
						UserId = QueryUser.Id,
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
				throw new Exception("can`t access services");
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
