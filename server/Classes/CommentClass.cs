using JinEventsWebAPI.Controllers.Services.UserService;
using JinEventsWebAPI.Interfaces;
using JinEventsWebAPI.Models;

namespace JinEventsWebAPI.Classes
{
	public class CommentClass : IComment
	{
		private readonly JinEventsContext _context;
		private readonly IUserService _userService;

		public CommentClass(JinEventsContext context, IUserService userService)
		{
			_context = context;
			_userService = userService;
		}


		public bool CreateComment(Comment comment)
		{
			try
			{
				int uId = Convert.ToInt32(_userService.GetUserId());
				Comment com = new()
				{
					UserId = uId,
					ProjectId = comment.ProjectId,
					Message = comment.Message,
					Date = comment.Date,
				};

				_context.Comments.Add(com);
				_context.SaveChanges();

				return true;
			}
			catch (Exception)
			{
				return false;
				throw;
			}
		}

		public List<Comment> GetComments()
		{
			try
			{
				var comments = _context.Comments.ToList();
				return comments;
			}
			catch (Exception)
			{
				throw;
			}
		}
	}
}
