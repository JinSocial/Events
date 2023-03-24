using JinEventsWebAPI.Classes;
using JinEventsWebAPI.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace JinEventsWebAPI.Controllers
{
	[EnableCors("Allow all")]
	[Route("api/")]
	[ApiController]
	public class ProjectCategoriesController : ControllerBase
	{
		private readonly JinEventsContext _context;

		public ProjectCategoriesController(JinEventsContext context)
		{
			_context = context;
		}

		[HttpGet("projcet-categories")]
		public ActionResult<ProjectCategory> GetProjectCategories()
		{
			try
			{
				var categories = _context.ProjectCategories.ToList();
				return Ok(categories);
			}
			catch 
			{
				return BadRequest();
			}
		}
	}
}
