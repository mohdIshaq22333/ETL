const axios = require("axios");
const http = require("http");
const https = require("https");
const logger = require("../utils/logger");
const config = require("../config");
const { delay } = require("../utils/functions");

const MAX_RETRIES = 3;

const extractData = async (retry = 0) => {
  try {
    logger.info(
      `Extracting data from: ${config.universityApiUrl} (attempt ${retry + 1})`
    );

    const response = await axios.get(config.universityApiUrl);

    if (response.status !== 200) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = response.data;

    if (!data) {
      throw new Error("No data received from API");
    }

    console.log(
      "parsed++",
      Array.isArray(data)
        ? `Array[${data.length}]`
        : typeof data === "object"
        ? `Object{${Object.keys(data).length}}`
        : typeof data
    );
    logger.info("Data extraction successful", {
      type: Array.isArray(data) ? "array" : typeof data,
      size: JSON.stringify(data).length,
    });

    return data;
  } catch (error) {
    console.log("error+++", error);
    const errorMsg = error.message || error.toString();
    logger.error(`Extraction attempt ${retry + 1} failed: ${errorMsg}`);

    if (retry < MAX_RETRIES) {
      const delayTime = 1000;
      logger.info(`Retrying in ${delayTime}ms...`);
      await delay(delayTime);
      return extractData(retry + 1);
    }

    throw new Error(
      `Failed to extract data after ${MAX_RETRIES + 1} attempts: ${errorMsg}`
    );
  }
};

module.exports = extractData;
