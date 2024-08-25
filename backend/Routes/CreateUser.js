const jwt = require('jsonwebtoken');
const express = require('express');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');

const User = require('../models/User');

const jwtSecret = "mynameisjitinsinghandiwanttobecomeamernfullstackdeveloper."

const router = express.Router();

router.post('/signup',
    [
        body('email').isEmail(),
        body('name').isLength({ min: 5 }),
        body('password', 'Incorrect Password').isLength({ min: 5 }),
    ],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const salt = await bcrypt.genSalt(10);
        let securePwd = await bcrypt.hash(req.body.password, salt);

        try {
            await User.create({
                name: req.body.name,
                password: securePwd,
                email: req.body.email,
                location: req.body.location
            })
            res.json({ success: true })
        } catch (err) {
            console.log(err);
            res.json({ success: false })
        }
    });

router.post('/login',
    [
        body('email').isEmail(),
        body('password', 'Incorrect Password').isLength({ min: 5 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            let email = req.body.email;
            let userData = await User.findOne({ email });
            if (!userData) {
                return res.status(400).json({ errors: "Try logging in with correct credentials" });
            }

            const pwdCompare = await bcrypt.compare(req.body.password, userData.password)
            if (!pwdCompare) {
                return res.status(400).json({ errors: "Try logging in with correct credentials" });
            }

            const data = {
                user: {
                    id: userData.id
                }
            }
            const authToken = jwt.sign(data, jwtSecret)
            return res.json({ success: true, authToken })
        } catch (err) {
            console.log(err);
            res.json({ success: false })
        }
    });

module.exports = router;