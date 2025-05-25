const fs = require("fs/promises");
const logger = require("./logger");

const readDataFromFile = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      logger.warn(`File not found: ${filePath}. Returning empty array.`);
      return [];
    }
    logger.error(`Error reading from file ${filePath}: ${error.message}`);
    throw error;
  }
};

const writeDataToFile = async (filePath, data) => {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
    logger.info(`Data successfully written to ${filePath}`);
  } catch (error) {
    logger.error(`Error writing to file ${filePath}: ${error.message}`);
    throw error;
  }
};

module.exports = {
  readDataFromFile,
  writeDataToFile,
};
