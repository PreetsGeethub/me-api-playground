module.exports = (req, res, next) => {
    const token = req.headers["x-api-key"];
  
    if (!token || token !== process.env.WRITE_API_TOKEN) {
      return res.status(401).json({ error: "Unauthorized write access" });
    }
  
    next();
  };
  