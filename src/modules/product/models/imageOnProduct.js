import mongoose from 'mongoose'

const imageOnProductSchema = new mongoose.Schema({
	image_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'image',
	},
	product_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'product',
	},
})

const imageOnProductModel = mongoose.model(
	'imageOnProduct',
	imageOnProductSchema
)

export default imageOnProductModel
