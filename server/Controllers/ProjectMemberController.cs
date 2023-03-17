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
	public class ProjectMemberController : ControllerBase
	{
		private readonly IProjectMember _iProjectMember;
		public ProjectMemberController(IProjectMember iProjectMember)
		{
			_iProjectMember = iProjectMember;
		}

		[HttpGet("project-members")]
		public async Task<ActionResult<IEnumerable<ProjectMember>>> Get() => await Task.FromResult(_iProjectMember.GetProjectMembers());

		[Authorize]
		[HttpPost("add-project-member")]
		public async Task<ActionResult<ProjectMember>> Post(ProjectMember projectMember)
		{
			if (!_iProjectMember.AddProjectMember(projectMember)) 
			{
				await Request.ReadFormAsync();
				return BadRequest();
			}
			return Ok(projectMember);
		}
	}
}
