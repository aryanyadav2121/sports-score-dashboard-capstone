const express = require("express");
const Item = require("../models/Item");

const router = express.Router();

// Get all score records
router.get("/", async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a new score record
router.post("/", async (req, res) => {
    try {
        const newItem = new Item({
            team: req.body.team,
            score: req.body.score,
            status: req.body.status
        });

        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;