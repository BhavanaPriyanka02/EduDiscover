const pool = require('../config/db');

// GET /api/colleges
const getColleges = async (req, res, next) => {
  try {
    const { search, location, course, min_fees, max_fees, sort } = req.query;

    let query = `
      SELECT colleges.id, name, location, image_url, fees_per_year, rating, 
             placement_percentage, type, established_year,
             ARRAY_AGG(DISTINCT course) as courses
      FROM colleges
      LEFT JOIN college_courses ON colleges.id = college_courses.college_id
      WHERE 1=1
    `;
    const params = [];
    let paramCount = 0;

    if (search) {
      paramCount++;
      query += ` AND (LOWER(colleges.name) LIKE LOWER($${paramCount}) OR LOWER(colleges.location) LIKE LOWER($${paramCount}))`;
      params.push(`%${search}%`);
    }
    if (location) {
      paramCount++;
      query += ` AND LOWER(colleges.location) LIKE LOWER($${paramCount})`;
      params.push(`%${location}%`);
    }
    if (course) {
      paramCount++;
      query += ` AND EXISTS (SELECT 1 FROM college_courses cc WHERE cc.college_id = colleges.id AND LOWER(cc.course) LIKE LOWER($${paramCount}))`;
      params.push(`%${course}%`);
    }
    if (min_fees) {
      paramCount++;
      query += ` AND colleges.fees_per_year >= $${paramCount}`;
      params.push(parseInt(min_fees));
    }
    if (max_fees) {
      paramCount++;
      query += ` AND colleges.fees_per_year <= $${paramCount}`;
      params.push(parseInt(max_fees));
    }

    query += ` GROUP BY colleges.id`;

    if (sort === 'rating') query += ` ORDER BY rating DESC`;
    else if (sort === 'fees_low') query += ` ORDER BY fees_per_year ASC`;
    else if (sort === 'fees_high') query += ` ORDER BY fees_per_year DESC`;
    else if (sort === 'placement') query += ` ORDER BY placement_percentage DESC`;
    else query += ` ORDER BY rating DESC`;

    const result = await pool.query(query, params);
    res.json({ colleges: result.rows, total: result.rows.length });
  } catch (err) {
    next(err);
  }
};

// GET /api/colleges/:id
const getCollegeById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const collegeResult = await pool.query('SELECT * FROM colleges WHERE id = $1', [id]);
    if (collegeResult.rows.length === 0) {
      return res.status(404).json({ error: 'College not found.' });
    }

    const college = collegeResult.rows[0];

    const coursesResult = await pool.query(
      'SELECT course, duration, fees FROM college_courses WHERE college_id = $1',
      [id]
    );

    const reviewsResult = await pool.query(
      `SELECT cr.id, cr.rating, cr.review_text, cr.created_at, u.name as user_name
       FROM college_reviews cr
       JOIN users u ON cr.user_id = u.id
       WHERE cr.college_id = $1
       ORDER BY cr.created_at DESC`,
      [id]
    );

    res.json({
      college: {
        ...college,
        courses: coursesResult.rows,
        reviews: reviewsResult.rows,
      },
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/colleges/compare
const compareColleges = async (req, res, next) => {
  try {
    const { ids } = req.query;
    if (!ids) return res.status(400).json({ error: 'College IDs required.' });

    const idArray = ids.split(',').map((id) => parseInt(id)).filter(Boolean).slice(0, 3);
    if (idArray.length < 2) return res.status(400).json({ error: 'At least 2 college IDs needed.' });

    const result = await pool.query(
      `SELECT id, name, location, image_url, fees_per_year, rating,
              placement_percentage, type, established_year, description
       FROM colleges WHERE id = ANY($1)`,
      [idArray]
    );

    const colleges = result.rows;
    for (const college of colleges) {
      const courses = await pool.query('SELECT course FROM college_courses WHERE college_id = $1', [college.id]);
      college.courses = courses.rows.map((r) => r.course);
    }

    res.json({ colleges });
  } catch (err) {
    next(err);
  }
};

// GET /api/colleges/locations
const getLocations = async (req, res, next) => {
  try {
    const result = await pool.query('SELECT DISTINCT location FROM colleges ORDER BY location');
    res.json({ locations: result.rows.map((r) => r.location) });
  } catch (err) {
    next(err);
  }
};

module.exports = { getColleges, getCollegeById, compareColleges, getLocations };
