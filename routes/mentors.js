import express from "express";
const router = express.Router();

import { authMiddleware } from '../middleware/authorize';
const { logout } = require('../controllers/authController');
import mentorsController from '../controllers/mentorsController';
// import { getAll, getById, create, update, remove } from '../controllers/mentorsController';


router.get('/mentors/search', mentorsController.search);
router.post('/mentors/signup', mentorsController.signupMentor);
router.get('/featured', mentorsController.getFeaturedMentors);
router.get('/', mentorsController.getAllMentors);
router.get('/:id', mentorsController.getMentorById);
router.delete('/:id', mentorsController.deleteMentorById);
router.post('/signin', mentorsController.signin);

// router.use(authMiddleware);
// router.get(authMiddleware);

router.get('/current', (req, res) => {
    res.json(req.user);
});
// router.post('/signup', mentorsController.signUp);

router.post('/logout', logout);



// module.exports = router;
module.exports = mentorsRouter;

export const mentorsRouter = router;
