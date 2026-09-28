const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    team: {
        type: String,
        required: true
    },

    score: {
        type: String,
        required: true
    },

    status: {
        type: String,
        default: "LIVE"
    }
});

module.exports = mongoose.model("Item", itemSchema);