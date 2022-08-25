const errorHandler = (err, req, res, next) => {
  console.log(err.message, err);
  return res.json({ message: err.message });
};

module.exports = errorHandler;
