using JinEventsWebAPI.Controllers.Services.UserService;
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
		private readonly IUserService _userService;
		public ProjectMemberController(IProjectMember iProjectMember, IUserService userService)
		{
			_iProjectMember = iProjectMember;
			_userService = userService;
		}

		[HttpGet("project-members")]
		public async Task<ActionResult<IEnumerable<ProjectMember>>> Get() => await Task.FromResult(_iProjectMember.GetProjectMembers());

		[Authorize]
		[HttpPost("{projectTitle}/join")]
		public async Task<ActionResult<ProjectMember>> Post(string projectTitle)
		{
			ActionResult<string> login = _userService.GetUserLogin();
			if (login != null) 
			{
				if (!_iProjectMember.AddProjectMember(projectTitle))
				{
					await Request.ReadFormAsync();
					return BadRequest();
				}
				return Ok(
						$"User {login} added to project {projectTitle} as member"
					);
			}
			else
			{
				return BadRequest();
			}
		}
	}
}
