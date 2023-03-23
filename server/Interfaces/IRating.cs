using JinEventsWebAPI.Models;

namespace JinEventsWebAPI.Interfaces
{
	public interface IRating
	{
		public List<User> GetLadderStats();
	}
}
