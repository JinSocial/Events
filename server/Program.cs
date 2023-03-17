using JinEventsWebAPI.Classes;
using JinEventsWebAPI.Interfaces;
using JinEventsWebAPI.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<JinEventsContext>
	(c => c.UseNpgsql(builder.Configuration.GetConnectionString("PgServer")));

builder.Services.AddTransient<IComment, CommentClass>();
builder.Services.AddTransient<IEvent, EventClass>();
builder.Services.AddTransient<IProject, ProjectClass>();
builder.Services.AddTransient<IProjectMember, ProjectMemberClass>();
builder.Services.AddTransient<IUser, UserClass>();

builder.Services.AddAuthentication
	(JwtBearerDefaults.AuthenticationScheme)
	.AddJwtBearer(opt =>
	{
		opt.TokenValidationParameters =
			new TokenValidationParameters
			{
				ValidateIssuerSigningKey = true,
				IssuerSigningKey = new SymmetricSecurityKey
				(Encoding.UTF8
					.GetBytes(
					builder.Configuration.GetSection("SecurityKeys:Token").Value
					)),
				ValidateIssuer = false,
				ValidateAudience = false,
			};
	});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(
	opt =>
	{
		opt.AddSecurityDefinition(
			"oauth2", new OpenApiSecurityScheme
			{
				Description = "Auth standart ",
				In = ParameterLocation.Header,
				Name = "Authorization",
				Type = SecuritySchemeType.ApiKey
			});
		opt.OperationFilter<SecurityRequirementsOperationFilter>();
	});

builder.Services.AddMvc();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
