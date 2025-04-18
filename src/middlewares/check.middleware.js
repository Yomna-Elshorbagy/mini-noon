export const checkUniqueData = (model, fieldName = "title") => {
  return async (req, res, next) => {
    try {
      const value = req.body[fieldName];
      const exists = await model.findOne({ [fieldName]: value });
      if (exists) {
        return res.status(409).json({ message: `${fieldName} already exists` });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
