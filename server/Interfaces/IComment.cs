using JinEventsWebAPI.Models;

namespace JinEventsWebAPI.Interfaces
{
	public interface IComment
	{
		public List<Comment> GetComments();
		public bool CreateComment(Comment comment);
	}
}
