﻿namespace JinEventsWebAPI.Models.Dto
{
	public class UserRegiserDto
	{ 
		public required string Username { get; set; } = string.Empty;
		public required string Password { get; set; } = string.Empty;
		public required string Email { get; set; } = string.Empty;
	}
}
