const pool = require("./pool");
require("dotenv").config();

async function insertSkill(name) {
  const res = await pool.query(
    "INSERT INTO skills (name) VALUES ($1) RETURNING id",
    [name]
  );
  return res.rows[0].id;
}

async function insertProject(title, description, repoUrl, liveUrl) {
  const res = await pool.query(
    `INSERT INTO projects (title, description, repo_url, live_url)
     VALUES ($1, $2, $3, $4)
     RETURNING id`,
    [title, description, repoUrl, liveUrl]
  );
  return res.rows[0].id;
}

async function linkProjectSkill(projectId, skillId) {
  await pool.query(
    `INSERT INTO project_skills (project_id, skill_id)
     VALUES ($1, $2)`,
    [projectId, skillId]
  );
}


async function seed() {
  try {
    console.log("Seeding database");

    await pool.query(
      `INSERT INTO profile (name, email, education, github, linkedin)
       VALUES ($1, $2, $3, $4, $5)`,
      [
        "Pritam Kumar",
        "kumarpreetjangir@gmail.com",
       "MCA (2024–2026, Expected) - University of Rajasthan\nB.Sc Mathematics (2020–2023) - MGSU University, Bikaner",
        "https://github.com/PreetsGeethub",
        "https://www.linkedin.com/in/pritam-kumar-b7112527b/"
      ]
    );

    const skills = {};
    skills.javascript = await insertSkill("JavaScript");
    skills.node = await insertSkill("Node.js");
    skills.express = await insertSkill("Express.js");
    skills.postgres = await insertSkill("PostgreSQL");
    skills.react = await insertSkill("React");
    skills.css = await insertSkill("CSS");
    skills.jwt = await insertSkill("JWT");
    skills.tailwind = await insertSkill("Tailwind CSS");
    skills.passport = await insertSkill("passport.js");
    

    // 1. Task Management API
    const taskApiId = await insertProject(
      "Task Management API",
      "Backend REST API with authentication, role-based access, and PostgreSQL.",
      "https://github.com/PreetsGeethub/userAdminBackend",
      null
    );

    await linkProjectSkill(taskApiId, skills.node);
    await linkProjectSkill(taskApiId, skills.express);
    await linkProjectSkill(taskApiId, skills.postgres);
    await linkProjectSkill(taskApiId, skills.jwt);
    // 2. VirtuCasa
    const virtuCasaId = await insertProject(
      "VirtuCasa",
      "Real estate platform with modern UI and backend integration.",
      "https://github.com/PreetsGeethub/virtucasa",
      null
    );

    await linkProjectSkill(virtuCasaId, skills.react);
    await linkProjectSkill(virtuCasaId, skills.javascript);
    await linkProjectSkill(virtuCasaId, skills.tailwind );

    // 3. Space Exploration Website
    const spaceId = await insertProject(
      "Space Exploration Website",
      "Animated website with interactive constellation map and space visuals.",
      "https://github.com/PreetsGeethub/space-exploration",
      null
    );

    await linkProjectSkill(spaceId, skills.react);
    await linkProjectSkill(spaceId, skills.tailwind);
    await linkProjectSkill(spaceId, skills.javascript);

    // 4. Chai Backend (VideoTube)
    const chaiBackendId = await insertProject(
      "Chai Backend (VideoTube)",
      "Backend API inspired by YouTube, built while learning backend architecture.",
      "https://github.com/PreetsGeethub/chai-backend",
      null
    );

    await linkProjectSkill(chaiBackendId, skills.node);
    await linkProjectSkill(chaiBackendId, skills.express);
    await linkProjectSkill(chaiBackendId, skills.postgres);

    console.log("✅ Seeding completed successfully");
    process.exit(0);
  } catch (err) {
    console.error(" Seeding failed:", err);
    process.exit(1);
  }
}

seed();
