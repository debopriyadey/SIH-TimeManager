const errorHandler = (err, req, res, next) => {
    console.log(err.message);
    return res.status(500).json({ message: "Something went wrong " });
}

module.exports = errorHandler;