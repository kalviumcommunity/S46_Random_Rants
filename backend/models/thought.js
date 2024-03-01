
const mongoose = require("mongoose")

const thoughtSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    thought: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        required: true
    }
})

const newThought = mongoose.model("Thoughts",thoughtSchema)

module.exports = newThought