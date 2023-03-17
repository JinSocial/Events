using JinEventsWebAPI.Interfaces;
using JinEventsWebAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace JinEventsWebAPI.Controllers
{
	[Route("api/")]
	[ApiController]
	public class EventController : ControllerBase
	{
		private readonly IEvent _ievent;
		public EventController(IEvent ievent)
		{
			_ievent = ievent;
		}

		[HttpGet("events")]
		public async Task<ActionResult<IEnumerable<Event>>> Get() => await Task.FromResult(_ievent.GetEvents());

		[Authorize]
		[HttpPost("add-event")]
		public async Task<ActionResult<Event>> Post(Event @event)
		{
			if(!_ievent.CreateEvent(@event))
			{
				await Request.ReadFormAsync();
				return BadRequest();
			}
			return Ok(@event);
		}
	}
}
