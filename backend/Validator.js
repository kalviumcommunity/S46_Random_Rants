const Joi = require("joi")

const Validator = (schema) => (payload) => 
    schema.validate(payload, {abortEarly: false})


const thoughtSchema = Joi.object({
    tag:Joi.string().required(),
    thought:Joi.string().required()
})

const regex = new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=.\-_*])([a-zA-Z0-9@#$%^&+=*.\-_]){3,}$')

const userSchema = Joi.object({
    username:Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(regex).required()
})

exports.validateThought = Validator(thoughtSchema)
exports.validateUser = Validator(userSchema)