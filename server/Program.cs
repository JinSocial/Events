using JinEventsWebAPI.Classes;
using JinEventsWebAPI.Interfaces;
using JinEventsWebAPI.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<JinEventsContext>
	(c => c.UseNpgsql(builder.Configuration.GetConnectionString("PgServer")));

builder.Services.AddTransient<IComment, CommentClass>();
builder.Services.AddTransient<IEvent, EventClass>();
builder.Services.AddTransient<IProject, ProjectClass>();
builder.Services.AddTransient<IProjectMember, ProjectMemberClass>();
builder.Services.AddTransient<IUser, UserClass>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddMvc();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();

app.Run();
