
const mongoose = require("mongoose")

const thoughtSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
})

const newThought = mongoose.model("Thoughts",userSchema)

module.exports = newThought