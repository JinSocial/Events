﻿using JinEventsWebAPI.Interfaces;
using JinEventsWebAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace JinEventsWebAPI.Controllers
{
	[EnableCors("Allow all")]
	[Route("api/")]
	[ApiController]
	public class CommentController : ControllerBase
	{
		private readonly IComment _icomment;
		public CommentController(IComment icomment)
		{
			_icomment = icomment;
		}

		[HttpGet("comments")]
		public async Task<ActionResult<IEnumerable<Comment>>> Get() => await Task.FromResult(_icomment.GetComments());

		[Authorize]
		[HttpPost("add-comment")]
		public async Task<ActionResult<Comment>> Post(Comment comment)
		{
			if (!_icomment.CreateComment(comment))
			{
				await Request.ReadFormAsync();
				return BadRequest();
			}
			return Ok(comment);
		}
	}
}
