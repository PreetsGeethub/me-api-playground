const pool = require("../../db/pool");

exports.getTopSkills = async (req, res) => {
  try {
    const query = `
      SELECT 
        s.name,
        COUNT(ps.project_id) AS count
      FROM skills s
      JOIN project_skills ps ON s.id = ps.skill_id
      GROUP BY s.name
      ORDER BY count DESC
    `;

    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch skills" });
  }
};

exports.getSkills = async (req, res) => {
    try {
      const result = await pool.query(
        "SELECT id, name FROM skills ORDER BY name"
      );
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch skills" });
    }
  };

  exports.searchSkills = async (req, res) => {
    try {
      const { q } = req.query;
  
      if (!q) {
        return res.status(400).json({ error: "Search query required" });
      }
  
      const result = await pool.query(
        "SELECT id, name FROM skills WHERE name ILIKE $1",
        [`%${q}%`]
      );
  
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to search skills" });
    }
  };
  