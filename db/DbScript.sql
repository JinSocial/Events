CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(64) UNIQUE NOT NULL,
  password VARCHAR(64) NOT NULL,
  login VARCHAR(64) UNIQUE NOT NULL,
  img_path VARCHAR(64),
  about TEXT,
  created TIMESTAMP NOT NULL,
  rating NUMERIC(4,2) NOT NULL
);

CREATE TABLE project_categories(
  title TEXT UNIQUE PRIMARY KEY,
  description TEXT
);

CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(64) UNIQUE NOT NULL,
  category TEXT REFERENCES project_categories(title) NOT NULL,
  description TEXT,
  point POINT NOT NULL,
  img_path VARCHAR(64),
  created TIMESTAMP NOT NULL,
  expires TIMESTAMP NOT NULL
);
CREATE TABLE project_members (
  project_id INT REFERENCES projects(id) NOT NULL,
  user_id INT REFERENCES users(id) NOT NULL,
  role VARCHAR(64) NOT NULL,
  PRIMARY KEY (project_id, user_id)
);

CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  project_id INT REFERENCES projects(id) NOT NULL,
  title VARCHAR(64) UNIQUE NOT NULL,
  date TIMESTAMP NOT NULL,
  state BOOLEAN NOT NULL
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) NOT NULL,
  project_id INT REFERENCES projects(id) NOT NULL,
  message TEXT NOT NULL,
  date TIMESTAMP NOT NULL
);