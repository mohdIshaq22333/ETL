const extractData = require("./extract");
const transformData = require("./transform");
const loadData = require("./load");
const logger = require("../utils/logger");

const runEtlProcess = async () => {
  logger.info("Starting ETL process...");
  try {
    const rawData = await extractData();
    const transformedData = transformData(rawData);
    await loadData(transformedData);
    logger.info("ETL process completed successfully.");
    return transformedData;
  } catch (error) {
    logger.error(`ETL process failed: ${error.message}`);
    throw error;
  }
};

module.exports = {
  runEtlProcess,
};
