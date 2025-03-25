export const attachFindQuery = (model) => {
	return (req, res, next) => {
		req.dbQuery = model.find({})
		next()
	}
}

export const attachAddQuery = (model) => {
	return (req, res, next) => {
		req.dbQuery = model.create(req.body)
		next()
	}
}

export const attachUpdateQuery = (model,  fieldName = "slug", paramName = "slug") => {
	return (req, res, next) => {
		const fieldValue = req.params[paramName];
		req.dbQuery = model.updateOne({ [fieldName]: fieldValue }, req.body); 
		next()
	}
}

export const attachDeleteQuery = (model) => {
	return (req, res, next) => {
		req.dbQuery = model.deleteMany(); 
		next()
	}
}
