const logger = require("../utils/logger");
const { writeDataToFile } = require("../utils/fileHandler");
const config = require("../config");

const loadData = async (data) => {
  try {
    logger.info(`Loading ${data.length} records to ${config.dataFilePath}`);
    await writeDataToFile(config.dataFilePath, data);
    logger.info("Data loading successful.");
  } catch (error) {
    logger.error(`Error during data loading: ${error.message}`);
    throw new Error("Failed to load data to file.");
  }
};

module.exports = loadData;
