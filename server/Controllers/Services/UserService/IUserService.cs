using Microsoft.AspNetCore.Mvc;

namespace JinEventsWebAPI.Controllers.Services.UserService
{
	public interface IUserService
	{
		string GetUserData();
		string GetUserId();
		string GetUserLogin();
	}
}
