using JinEventsWebAPI.Interfaces;
using JinEventsWebAPI.Models;

namespace JinEventsWebAPI.Classes
{
	public class CommentClass : IComment
	{
		public readonly JinEventsContext _context;

		public CommentClass(JinEventsContext context) => _context = context;

		public bool CreateComment(Comment comment)
		{
			try
			{
				Comment com = new()
				{
					UserId = comment.UserId,
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
