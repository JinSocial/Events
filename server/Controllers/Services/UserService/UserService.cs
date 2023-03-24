using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace JinEventsWebAPI.Controllers.Services.UserService
{
	public class UserService : IUserService
	{
		private readonly IHttpContextAccessor _httpContextAccessor;

		public UserService(IHttpContextAccessor httpContextAccessor) => _httpContextAccessor = httpContextAccessor;

		public ActionResult<string> GetUserData()
		{
			string?
				result,
				uId,
				uRole,
				uLogin,
				uEmail,
				uData;

			if (_httpContextAccessor!=null)
			{
				uId = _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.Sid);
				uRole = _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.Role);
				uLogin = _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier);
				uEmail = _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.Email);
				uData = _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.UserData);

				if (uId != null && uRole != null && uLogin != null && uEmail != null && uData != null)
				{
					result = uId + "\n" + uRole + "\n" + uLogin + "\n" + uEmail + "\n" + uData;
					return result;
				}
				return "no user data available";
			}
			return "Service is not working";
		}

		public ActionResult<string> GetUserId()
		{
			string? result;

			if (_httpContextAccessor!=null)
			{
				result = _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.Sid);
				if(result != null)
				{
					return result;
				}
				return "no user data available";
			}
			return "Service is not working";
		}

		public ActionResult<string> GetUserLogin()
		{
			string? result;

			if (_httpContextAccessor!=null)
			{
				result = _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier);
				if(result != null)
				{
					return result;
				}
				return "no user data available";
			}
			return "Service is not working";
		}
	}
}
