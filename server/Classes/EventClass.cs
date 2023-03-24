using JinEventsWebAPI.Interfaces;
using JinEventsWebAPI.Models;

namespace JinEventsWebAPI.Classes
{
	public class EventClass : IEvent
	{
		private readonly JinEventsContext _context;

		public EventClass(JinEventsContext context) => _context = context;

		public bool CreateEvent(Event @event)
		{
			try
			{
				Event even = new()
				{
					ProjectId = @event.ProjectId,
					Title = @event.Title,
					Date = @event.Date,
					State = @event.State,
				};

				_context.Events.Add(even);
				_context.SaveChanges();

				return true;
			}
			catch (Exception)
			{
				return false;
			}
		}

		public Event GetEvent(int id)
		{
			var @event = _context.Events.Where( eve => eve.Id == id).FirstOrDefault();
			return @event;
		}

		public List<Event> GetEvents()
		{
			try
			{
				var events = _context.Events.ToList();
				return events;
			}
			catch (Exception)
			{
				throw;
			}
		}
	}
}
