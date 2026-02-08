const pool = require("../../db/pool");

exports.globalSearch = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ error: "Search query is required" });
    }

    const query = `
      SELECT DISTINCT
        p.id,
        p.title,
        p.description,
        p.repo_url,
        p.live_url,
        ARRAY_AGG(s.name) AS skills
      FROM projects p
      LEFT JOIN project_skills ps ON p.id = ps.project_id
      LEFT JOIN skills s ON ps.skill_id = s.id
      WHERE
        p.title ILIKE $1
        OR p.description ILIKE $1
        OR s.name ILIKE $1
      GROUP BY p.id
    `;

    const result = await pool.query(query, [`%${q}%`]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Search  failed" });
  }
};
 