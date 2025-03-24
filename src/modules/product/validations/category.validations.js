import Joi from 'joi'

export const addCategorySchema = Joi.object({
	body: {
		name: Joi.string().min(3).max(200).trim().required(),
	},
	params: {},
	query: {},
})

export const updateCategorySchema = Joi.object({
	body: {
		name: Joi.string().min(3).max(200).trim(),
	},
	params: { categorySlug: Joi.string().required() },
	query: {},
})

export const deleteCategorySchema = Joi.object({
	body: {},
	params: { categorySlug: Joi.string().required() },
	query: {},
})
