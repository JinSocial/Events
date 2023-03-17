using JinEventsWebAPI.Interfaces;
using JinEventsWebAPI.Models;

namespace JinEventsWebAPI.Classes
{
	public class UserClass : IUser
	{
		private readonly JinEventsContext _context;
		public UserClass(JinEventsContext context) => _context = context;

		public List<User> GetUsers()
		{
			try
			{
				var users = _context.Users.ToList();
				return users;
			}
			catch (Exception)
			{
				throw;
			}
		}
	}
}
