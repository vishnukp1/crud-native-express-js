const Joi = require("joi")

const stockValidate = Joi.object({
    name: Joi.string().required(),
    price: Joi.number(),
    category: Joi.string().required()
})

module.exports = {stockValidate}