using JinEventsWebAPI.Interfaces;
using JinEventsWebAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace JinEventsWebAPI.Controllers
{
	[EnableCors("Allow all")]
	[Route("api/")]
	[ApiController]
	public class ProjectController : ControllerBase
	{
		private readonly IProject _iproject;
		public ProjectController(IProject iproject)
		{
			_iproject = iproject;
		}

		[HttpGet("projects")]
		public async Task<ActionResult<IEnumerable<Project>>> Get() => await Task.FromResult(_iproject.GetProjects());

		[HttpGet("projects/{id}")]
		public async Task<ActionResult<Project>> Get(int id) => await Task.FromResult(_iproject.GetProjectById(id));

		[Authorize]
		[HttpPost("add-project")]
		public async Task<ActionResult<Project>> Post(Project project, string login)
		{
			if (!_iproject.CreateProject(project, login))
			{
				await Request.ReadFormAsync();
				return BadRequest();
			}
			return Ok(project);
		}
	}
}
