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
	public class UserController : ControllerBase
	{
		private readonly IUser _iuser;
		public UserController(IUser iuser)
		{
			_iuser = iuser;
		}

		[Authorize]
		[HttpGet("users")]
		public async Task<ActionResult<IEnumerable<User>>> Get() => await Task.FromResult(_iuser.GetUsers());

		[HttpGet("users/{id}")]
		public async Task<ActionResult<User>> Get(int id) => await Task.FromResult(_iuser.GetById(id));
	}
}
