const pool = require("../../db/pool");

/* =========================
   GET PROJECTS
   ========================= */
exports.getProjects = async (req, res) => {
  try {
    const { skill } = req.query;

    let query = `
      SELECT 
        p.id,
        p.title,
        p.description,
        p.repo_url,
        p.live_url,
        ARRAY_AGG(s.name) AS skills
      FROM projects p
      LEFT JOIN project_skills ps ON p.id = ps.project_id
      LEFT JOIN skills s ON ps.skill_id = s.id
    `;

    const values = [];

    if (skill) {
      query += ` WHERE s.name ILIKE $1`;
      values.push(`%${skill}%`);
    }

    query += ` GROUP BY p.id`;

    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
};

/* =========================
   CREATE PROJECT (OPTIONAL)
   ========================= */
exports.createProject = async (req, res) => {
  try {
    const { title, description, repo_url, live_url } = req.body;

    const result = await pool.query(
      `INSERT INTO projects (title, description, repo_url, live_url)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [title, description, repo_url, live_url]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create project" });
  }
};
