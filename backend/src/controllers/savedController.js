const pool = require('../config/db');

// GET /api/saved
const getSavedColleges = async (req, res, next) => {
  try {
    const result = await pool.query(
      `SELECT c.id, c.name, c.location, c.image_url, c.fees_per_year, c.rating,
              c.placement_percentage, c.type, sc.saved_at
       FROM saved_colleges sc
       JOIN colleges c ON sc.college_id = c.id
       WHERE sc.user_id = $1
       ORDER BY sc.saved_at DESC`,
      [req.user.id]
    );
    res.json({ savedColleges: result.rows });
  } catch (err) {
    next(err);
  }
};

// POST /api/saved/:collegeId
const saveCollege = async (req, res, next) => {
  try {
    const { collegeId } = req.params;

    const existing = await pool.query(
      'SELECT id FROM saved_colleges WHERE user_id = $1 AND college_id = $2',
      [req.user.id, collegeId]
    );
    if (existing.rows.length > 0) {
      return res.status(409).json({ error: 'College already saved.' });
    }

    const collegeExists = await pool.query('SELECT id FROM colleges WHERE id = $1', [collegeId]);
    if (collegeExists.rows.length === 0) {
      return res.status(404).json({ error: 'College not found.' });
    }

    await pool.query(
      'INSERT INTO saved_colleges (user_id, college_id) VALUES ($1, $2)',
      [req.user.id, collegeId]
    );

    res.status(201).json({ message: 'College saved successfully!' });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/saved/:collegeId
const unsaveCollege = async (req, res, next) => {
  try {
    const { collegeId } = req.params;

    const result = await pool.query(
      'DELETE FROM saved_colleges WHERE user_id = $1 AND college_id = $2 RETURNING id',
      [req.user.id, collegeId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Saved college not found.' });
    }

    res.json({ message: 'College removed from saved list.' });
  } catch (err) {
    next(err);
  }
};

// GET /api/saved/check/:collegeId
const checkSaved = async (req, res, next) => {
  try {
    const { collegeId } = req.params;
    const result = await pool.query(
      'SELECT id FROM saved_colleges WHERE user_id = $1 AND college_id = $2',
      [req.user.id, collegeId]
    );
    res.json({ isSaved: result.rows.length > 0 });
  } catch (err) {
    next(err);
  }
};

module.exports = { getSavedColleges, saveCollege, unsaveCollege, checkSaved };
