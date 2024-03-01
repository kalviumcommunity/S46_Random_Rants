const Joi = require("joi")

const Validator = (schema) => (payload) => 
    schema.validate(payload, {abortEarly: false})


const thoughtSchema = Joi.object({
    userId: Joi.string().min(24).required(),
    tag:Joi.string().min(2).required(),
    thought:Joi.string().required()
})

const regex = new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=.\-_*])([a-zA-Z0-9@#$%^&+=*.\-_]){6,}$')

const userSchema = Joi.object({
    username:Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(regex).required()
})

exports.validateThought = Validator(thoughtSchema)
exports.validateUser = Validator(userSchema)