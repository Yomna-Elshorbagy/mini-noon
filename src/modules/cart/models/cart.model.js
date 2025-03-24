import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema(
	{
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'user',
			required: true,
		},
	},
	{ timestamps: true }
)

const cartModel = mongoose.model('cart', cartSchema)

export default cartModel
