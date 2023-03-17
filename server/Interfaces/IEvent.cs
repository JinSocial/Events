using JinEventsWebAPI.Models;

namespace JinEventsWebAPI.Interfaces
{
	public interface IEvent
	{
		public List<Event> GetEvents();
		public bool CreateEvent(Event @event);
	}
}
