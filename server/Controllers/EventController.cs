using JinEventsWebAPI.Interfaces;
using JinEventsWebAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace JinEventsWebAPI.Controllers
{
	[EnableCors("Allow all")]
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

		[HttpGet("events/{id}")]
		public async Task<ActionResult<Event>> Get(int id) => await Task.FromResult(_ievent.GetEvent(id));

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
