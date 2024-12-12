// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/register', async (req, res) => {
    const { username, password, role } = req.body;
    const user = new User({ username, password, role });
    try {
        await user.save();
        res.status(201).send('User  registered successfully');
    } catch (error) {
        res.status(400).send('Error registering user');
    }
});

// routes/authRoutes.js
router.post('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});

module.exports = router;