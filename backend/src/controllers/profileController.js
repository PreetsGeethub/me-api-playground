const pool = require('../../db/pool')


exports.getProfile = async (req, res) => {
    try {
      const result = await pool.query(
        "SELECT id, name, email, education, github, linkedin FROM profile LIMIT 1"
      );
  
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch profile" });
    }
  };

  exports.updateProfile = async (req, res) => {
    try {
      const { name, email, education, github, linkedin } = req.body;
  
      const result = await pool.query(
        `
        UPDATE profile
        SET
          name = $1,
          email = $2,
          education = $3,
          github = $4,
          linkedin = $5
        WHERE id = 1
        RETURNING *
        `,
        [name, email, education, github, linkedin]
      );
  
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to update profile" });
    }
  };
  