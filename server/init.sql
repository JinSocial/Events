CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(256) NOT NULL,
  password VARCHAR(64) NOT NULL,
  name VARCHAR(64),
  avatar VARCHAR(256),
  about TEXT
);

CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(256),
  description TEXT,
  point POINT NOT NULL,
  img VARCHAR(256),
  creation_date TIMESTAMP
);

CREATE TABLE project_members (
  project_id INT REFERENCES projects(id) NOT NULL,
  user_id INT REFERENCES users(id) NOT NULL,
  role VARCHAR(64),
  PRIMARY KEY (project_id, user_id)
);

CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  project_id INT REFERENCES projects(id) NOT NULL,
  title VARCHAR(256),
  date TIMESTAMP
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) NOT NULL,
  project_id INT REFERENCES projects(id) NOT NULL,
  message TEXT,
  date TIMESTAMP
);
