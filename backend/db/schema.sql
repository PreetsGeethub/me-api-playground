-- =========================
-- Profile Table
-- =========================
CREATE TABLE profile (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  education TEXT,
  github TEXT,
  linkedin TEXT,
  portfolio TEXT
);

-- =========================
-- Projects Table
-- =========================
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  links TEXT
);

-- =========================
-- Skills Table
-- =========================
CREATE TABLE skills (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL
);

-- =========================
-- Project-Skills Mapping
-- =========================
CREATE TABLE project_skills (
  project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
  skill_id INTEGER REFERENCES skills(id) ON DELETE CASCADE,
  PRIMARY KEY (project_id, skill_id)
);
