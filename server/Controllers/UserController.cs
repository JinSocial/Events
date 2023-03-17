using JinEventsWebAPI.Interfaces;
using JinEventsWebAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace JinEventsWebAPI.Controllers
{
	[Route("api/")]
	[ApiController]
	public class UserController : ControllerBase
	{
		private readonly IUser _iuser;
		public UserController(IUser iuser)
		{
			_iuser = iuser;
		}

		[HttpGet("users")]
		public async Task<ActionResult<IEnumerable<User>>> Get() => await Task.FromResult(_iuser.GetUsers());
	}
}
