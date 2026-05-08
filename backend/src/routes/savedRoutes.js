const express = require('express');
const router = express.Router();
const { getSavedColleges, saveCollege, unsaveCollege, checkSaved } = require('../controllers/savedController');
const { authenticateToken } = require('../middleware/auth');

router.use(authenticateToken);

router.get('/', getSavedColleges);
router.post('/:collegeId', saveCollege);
router.delete('/:collegeId', unsaveCollege);
router.get('/check/:collegeId', checkSaved);

module.exports = router;
