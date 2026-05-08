const express = require('express');
const router = express.Router();
const { getColleges, getCollegeById, compareColleges, getLocations } = require('../controllers/collegeController');

router.get('/locations', getLocations);
router.get('/compare', compareColleges);
router.get('/', getColleges);
router.get('/:id', getCollegeById);

module.exports = router;
