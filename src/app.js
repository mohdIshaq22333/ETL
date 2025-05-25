require("dotenv").config();
const express = require("express");
const etlRoutes = require("./routes/etlRoutes");
const errorHandler = require("./middlewares/errorHandler");
const logger = require("./utils/logger");
const { startScheduler } = require("./services/scheduler.js");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_DIR = "./data";

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR);
  logger.info(`Created data directory: ${DATA_DIR}`);
}

app.use(express.json());

app.use("/api/etl", etlRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
  startScheduler();
});

module.exports = app;
