namespace JinEventsWebAPI.Models.Dto
{
	public class UserDto
	{ 
		public required string UserName { get; set; } = string.Empty;
		public required string PasswordHash { get; set; } = string.Empty;
		public required string Email { get; set; } = string.Empty;
	}
}
