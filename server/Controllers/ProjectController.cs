using JinEventsWebAPI.Interfaces;
using JinEventsWebAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace JinEventsWebAPI.Controllers
{
	[Route("api/")]
	[ApiController]
	public class ProjectController : ControllerBase
	{
		private readonly IProject _iproject;
		public ProjectController(IProject iproject)
		{
			_iproject = iproject;
		}

		[HttpGet("project")]
		public async Task<ActionResult<IEnumerable<Project>>> Get() => await Task.FromResult(_iproject.GetProjects());

		[Authorize]
		[HttpPost("add-project")]
		public async Task<ActionResult<Project>> Post(Project project)
		{
			if (!_iproject.CreateProject(project))
			{
				await Request.ReadFormAsync();
				return BadRequest();
			}
			return Ok(project);
		}
	}
}
