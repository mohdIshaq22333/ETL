const logger = require("../utils/logger");

const errorHandler = (err, req, res, next) => {
  logger.error(`Error caught by global error handler: ${err.stack}`);

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

module.exports = errorHandler;
