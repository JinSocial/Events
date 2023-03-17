using JinEventsWebAPI.Models;
using JinEventsWebAPI.Models.Dto;
using Microsoft.AspNetCore.Mvc;

namespace JinEventsWebAPI.Controllers
{

	[Route("api/auth")]
	[ApiController]
	public class AuthController : ControllerBase
	{
		private readonly JinEventsContext _context;
		public AuthController(JinEventsContext context)
		{
			_context = context;
		}

		[HttpPost("register")]
		public ActionResult<User> Register(UserDto userDto)
		{
			string passwordHash = BCrypt.Net.BCrypt.HashPassword(userDto.PasswordHash);

			User user = new()
			{
				Email = userDto.Email,
				Login = userDto.UserName.ToLower(),
				Password = passwordHash,
			};

			try
			{
				_context.Users.Add(user);
				_context.SaveChanges();
				return Ok(user);
			}
			catch (Exception)
			{
				return BadRequest(user);
			}
		}

		//[HttpGet("login")]
		//public string Login(UserDto userDto)
		//{
		//	return "0";
		//}
	}
}
