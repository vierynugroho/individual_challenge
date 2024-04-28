const Joi = require('joi');

const productSchema = Joi.object({
	name: Joi.string().max(60).required(),
	price: Joi.number().min(0).required(),
});

const updateProductSchema = Joi.object({
	name: Joi.string().max(60),
	price: Joi.number().min(0),
});

module.exports = {
	productSchema,
	updateProductSchema,
};
