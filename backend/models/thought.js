
const mongoose = require("mongoose")

const thoughtSchema = new mongoose.Schema({
    tag: {
        type: String,
        required: true
    },
    thought: {
        type: String,
        required: true
    }
})

const newThought = mongoose.model("Thoughts",thoughtSchema)

module.exports = newThought