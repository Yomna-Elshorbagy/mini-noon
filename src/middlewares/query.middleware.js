export const attachFindQuery = (model) => {
  return (req, res, next) => {
    req.dbQuery = model.find({});
    next();
  };
};

export const attachAddQuery = (model) => {
  return (req, res, next) => {
    req.dbQuery = model.create(req.body);
    next();
  };
};

export const attachUpdateQuery = (
  model,
  fieldName = "slug",
  paramName = "slug"
) => {
  return (req, res, next) => {
    const fieldValue = req.params[paramName];
    req.dbQuery = model.findOneAndUpdate(
      { [fieldName]: fieldValue },
      req.body,
      { new: true }
    );
    next();
  };
};

export const attachDeleteQuery = (model) => {
  return (req, res, next) => {
    req.dbQuery = model.deleteMany(req.dbQuery?._conditions || {});
    next();
  };
};
