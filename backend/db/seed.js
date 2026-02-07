const pool = require("./pool");

async function seed() {
  try {
    // Clear existing data (optional)
    await pool.query("DELETE FROM project_skills");
    await pool.query("DELETE FROM projects");
    await pool.query("DELETE FROM skills");
    await pool.query("DELETE FROM profile");

    // Insert profile
    await pool.query(
      `INSERT INTO profile (name, email, education, github, linkedin)
       VALUES ($1, $2, $3, $4, $5)`,
      [
        "Pritam Kumar",
        "your-kumarpreetjangir@example.com",
        "MCA - University of Rajasthan",
        "https://github.com/PreetsGeethub",
        "https://www.linkedin.com/in/pritam-kumar-b7112527b/",
      ]
    );

    // Insert skills
    const skills = [
      "JavaScript",
      "Node.js",
      "Express",
      "PostgreSQL",
      "React",
      "Tailwind CSS",
      "mongo db"
    ];

    const skillIds = [];

    for (const skill of skills) {
      const res = await pool.query(
        "INSERT INTO skills (name) VALUES ($1) RETURNING id",
        [skill]
      );
      skillIds.push(res.rows[0].id);
    }

    // Insert project
    const projectRes = await pool.query(
      `INSERT INTO projects (title, description, links)
       VALUES ($1, $2, $3) RETURNING id`,
      [
        "Task Management API",
        "Backend REST API with JWT authentication and role-based access.",
        "https://github.com/PreetsGeethub/userAdminBackend",
      ]
    );

    const projectId = projectRes.rows[0].id;

    // Link project ↔ skills
    for (const skillId of skillIds) {
      await pool.query(
        "INSERT INTO project_skills (project_id, skill_id) VALUES ($1, $2)",
        [projectId, skillId]
      );
    }

    console.log("Database seeded successfully");
    process.exit();
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
}

seed();
