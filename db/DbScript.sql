CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(64) NOT NULL,
  password VARCHAR(64) NOT NULL,
  login VARCHAR(64),
  img_path VARCHAR(64),
  about TEXT
);

CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(64) NOT NULL,
  description TEXT,
  point POINT NOT NULL,
  type INT NOT NULL,
  img_path VARCHAR(64),
  creation_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP NOT NULL
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
  title VARCHAR(64) NOT NULL,
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
