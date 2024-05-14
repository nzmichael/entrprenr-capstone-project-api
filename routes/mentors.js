const express = require("express");
const router = express.Router();
const { logout } = require('../controllers/authController');
const { User } = require('../models/User');

const authMiddleware = require('../middleware/authorize');

const mentorsController = require('../controllers/mentorsController');

router.get('/mentors/search', mentorsController.search);

router.post('/mentors/signup', mentorsController.signupMentor);

router.get('/featured', mentorsController.getFeaturedMentors);

router.get('/', mentorsController.getAllMentors);

router.get('/:id', mentorsController.getMentorById); 

router.delete('/:id', mentorsController.deleteMentorById);

router.post('/signin', mentorsController.signin);

router.get('/current', authMiddleware, (req, res) => {
    res.json(req.user);
});

router.post('/signup', mentorsController.signUp);

router.post('/logout', logout);

module.exports = router;
