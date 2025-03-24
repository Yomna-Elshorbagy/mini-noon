import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema(
	{
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'user',
			required: true,
		},
		products: [
			{
				product_id: {
					type: mongoose.Schema.Types.ObjectId,
					required: true,
				},
				quantity: {
					type: Number,
					required: true,
				},
			},
		],
	},
	{ timestamps: true }
)

const orderModel = mongoose.model('order', orderSchema)

export default orderModel
