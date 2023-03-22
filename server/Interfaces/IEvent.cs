using JinEventsWebAPI.Models;

namespace JinEventsWebAPI.Interfaces
{
	public interface IEvent
	{
		public List<Event> GetEvents();
		public Event GetEvent(int id);
		public bool CreateEvent(Event @event);
	}
}
