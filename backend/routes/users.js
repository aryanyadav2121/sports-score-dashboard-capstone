const express = require("express");
const User = require("../models/User");

const router = express.Router();

// Save login details in MongoDB
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                message: "Username and password are required"
            });
        }

        const newUser = new User({
            username: username,
            password: password
        });

        await newUser.save();

        res.status(201).json({
            message: "Login details saved in MongoDB"
        });

    } catch (error) {
        console.log("LOGIN ERROR:", error);

        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;