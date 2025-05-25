const logger = require("../utils/logger");

const transformData = (rawData) => {
  if (!Array.isArray(rawData)) {
    logger.error("Raw data is not an array. Transformation aborted.");
    return [];
  }

  logger.info(`Transforming ${rawData.length} records.`);
  return rawData
    .map((university) => {
      const transformed = {
        name: typeof university.name === "string" ? university.name.trim() : "",
        country:
          typeof university.country === "string"
            ? university.country.trim()
            : "",
        domains: Array.isArray(university.domains)
          ? university.domains.filter((d) => typeof d === "string")
          : [],
        web_pages: Array.isArray(university.web_pages)
          ? university.web_pages.filter((p) => typeof p === "string")
          : [],
        "state-province":
          typeof university["state-province"] === "string"
            ? university["state-province"].trim()
            : null,
        alpha_two_code:
          typeof university.alpha_two_code === "string"
            ? university.alpha_two_code.trim()
            : null,
      };

      if (!transformed.name || !transformed.country) {
        logger.warn(`Skipping malformed record: ${JSON.stringify(university)}`);
        return null;
      }

      return transformed;
    })
    .filter(Boolean);
};

module.exports = transformData;
