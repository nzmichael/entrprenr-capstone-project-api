const express = require("express");
const router = express.Router();
const usersController = require('../controllers/userController');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); 
const authMiddleware = require('../middleware/authorize');
const { User } = require('../models/User');
const { logout } = require('../controllers/authController');

router.get('/current', authMiddleware, (req, res) => {
    res.json(req.user);
});

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        res.status(200).json({ message: 'User signed in successfully', user });
    } catch (error) {
        console.error('Error signing in user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
const validatePassword = (password, email, name) => {
    if (password.length < 8) {
        throw new Error('Password must be at least 8 characters long');
    }

    const complexityRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
    if (!complexityRegex.test(password)) {
        throw new Error('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character');
    }

    const commonWords = ['password', '123456', 'qwerty'];
    if (commonWords.includes(password.toLowerCase())) {
        throw new Error('Password must not be a common word or easily guessable');
    }

    if (password.toLowerCase().includes(email.toLowerCase()) || password.toLowerCase().includes(name.toLowerCase())) {
        throw new Error('Password must not contain your username or email address');
    }
};

router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        validatePassword(password, email, name);
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ name, email, password: hashedPassword });

        const token = jwt.sign({ id: newUser.id, email: newUser.email }, secretKey, { expiresIn: '1h' });
        res.status(201).json({ message: 'User created successfully', token });
    } catch (error) {
        console.error('Error signing up user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/logout', logout);

module.exports = router;
