using Microsoft.AspNetCore.Mvc;

namespace JinEventsWebAPI.Controllers.Services.UserService
{
	public interface IUserService
	{
		ActionResult<string> GetUserData();
		ActionResult<string> GetUserId();
		ActionResult<string> GetUserLogin();
	}
}
