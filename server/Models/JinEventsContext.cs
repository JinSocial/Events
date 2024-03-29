﻿using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace JinEventsWebAPI.Models;

public partial class JinEventsContext : DbContext
{
    public virtual DbSet<Comment> Comments { get; set; }
    public virtual DbSet<Event> Events { get; set; }
    public virtual DbSet<Project> Projects { get; set; }
    public virtual DbSet<ProjectCategory> ProjectCategories { get; set; }
    public virtual DbSet<ProjectMember> ProjectMembers { get; set; }
    public virtual DbSet<User> Users { get; set; }

    public JinEventsContext(DbContextOptions<JinEventsContext> options) : base(options) 
        => Database.EnsureCreated();

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) 
        => optionsBuilder.UseNpgsql();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Comment>(entity =>
        {
            entity.ToTable("comments");

            entity.Property(e => e.Id)
                .HasColumnName("id");
            entity.Property(e => e.Date)
                .HasColumnType("timestamp without time zone")
                .HasColumnName("date");
            entity.Property(e => e.Message)
                .HasColumnName("message");
            entity.Property(e => e.ProjectId)
                .HasColumnName("project_id");
            entity.Property(e => e.UserId)
                .HasColumnName("user_id");

            entity.HasKey(e => e.Id)
                .HasName("comments_pkey");

            entity.HasOne(d => d.Project)
                .WithMany(p => p.Comments)
                .HasForeignKey(d => d.ProjectId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("comments_project_id_fkey");

            entity.HasOne(d => d.User)
                .WithMany(p => p.Comments)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("comments_user_id_fkey");
        });

        modelBuilder.Entity<Event>(entity =>
        {
            entity.ToTable("events");

            entity.Property(e => e.Id)
                .HasColumnName("id");
            entity.Property(e => e.Date)
                .HasColumnType("timestamp without time zone")
                .HasColumnName("date");
            entity.Property(e => e.ProjectId)
                .HasColumnName("project_id");
            entity.Property(e => e.State)
                .HasColumnName("state");
            entity.Property(e => e.Title)
                .HasMaxLength(64)
                .HasColumnName("title");

            entity.HasKey(e => e.Id)
                .HasName("events_pkey");

            entity.HasIndex(e => e.Title, "events_title_key")
                .IsUnique();

            entity.HasOne(d => d.Project)
                .WithMany(p => p.Events)
                .HasForeignKey(d => d.ProjectId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("events_project_id_fkey");
        });

        modelBuilder.Entity<Project>(entity =>
        {
            entity.ToTable("projects");
            entity.HasKey(e => e.Id)
                .HasName("projects_pkey");

            entity.HasIndex(e => e.Title, "projects_title_key");

            entity.Property(e => e.Id)
                .HasColumnName("id");
            entity.Property(e => e.Category)
                .HasColumnName("category");
            entity.Property(e => e.Created)
                .HasColumnType("timestamp without time zone")
                .HasColumnName("created");
            entity.Property(e => e.Description)
                .HasColumnName("description");
            entity.Property(e => e.Expires)
                .HasColumnType("timestamp without time zone")
                .HasColumnName("expires");
            entity.Property(e => e.ImgPath)
                .HasMaxLength(64)
                .HasColumnName("img_path");
            entity.Property(e => e.Point)
                .HasColumnName("point");
            entity.Property(e => e.Title)
                .HasMaxLength(64)
                .HasColumnName("title");

            entity.HasOne(d => d.CategoryNavigation)
                .WithMany(p => p.Projects)
                .HasForeignKey(d => d.Category)
                .HasConstraintName("projects_category_fkey");
        });

        modelBuilder.Entity<ProjectCategory>(entity =>
        {
            entity.HasKey(e => e.Id)
                .HasName("project_categories_pkey");
            entity.ToTable("project_categories");

            entity.Property(e => e.Id)
                .HasColumnName("id");
            entity.Property(e => e.Title)
                .HasColumnName("title");
            entity.Property(e => e.Description)
                .HasColumnName("description");
        });

        modelBuilder.Entity<ProjectMember>(entity =>
        {
            entity.HasKey(e => new { e.ProjectId, e.UserId })
                .HasName("project_members_pkey");
            entity.ToTable("project_members");

            entity.Property(e => e.ProjectId)
                .HasColumnName("project_id");
            entity.Property(e => e.UserId)
                .HasColumnName("user_id");
            entity.Property(e => e.Role)
                .HasMaxLength(64)
                .HasColumnName("role");

            entity.HasOne(d => d.Project)
                .WithMany(p => p.ProjectMembers)
                .HasForeignKey(d => d.ProjectId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("project_members_project_id_fkey");

            entity.HasOne(d => d.User)
                .WithMany(p => p.ProjectMembers)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("project_members_user_id_fkey");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.ToTable("users");
            entity.HasKey(e => e.Id)
                .HasName("users_pkey");

            entity.HasIndex(e => e.Email, "users_email_key")
                .IsUnique();
            entity.HasIndex(e => e.Login, "users_login_key")
                .IsUnique();

            entity.Property(e => e.Id)
                .HasColumnName("id");
            entity.Property(e => e.About)
                .HasColumnName("about");
            entity.Property(e => e.Created)
                .HasColumnType("timestamp without time zone")
                .HasColumnName("created");
            entity.Property(e => e.Email)
                .HasMaxLength(64)
                .HasColumnName("email");
            entity.Property(e => e.ImgPath)
                .HasMaxLength(64)
                .HasColumnName("img_path");
            entity.Property(e => e.Login)
                .HasMaxLength(64)
                .HasColumnName("login");
            entity.Property(e => e.Password)
                .HasMaxLength(64)
                .HasColumnName("password");
            entity.Property(e => e.Rating)
                .HasPrecision(4, 2)
                .HasColumnName("rating");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
