const { readDataFromFile } = require("../utils/fileHandler");
const logger = require("../utils/logger");
const { stringify } = require("csv-stringify");
const config = require("../config");

const downloadCsv = async (req, res, next) => {
  try {
    const universities = await readDataFromFile(config.dataFilePath);

    if (!universities || universities.length === 0) {
      logger.warn("No university data found to generate CSV.");
      return res.status(404).send("No data available to download.");
    }

    // Normalize array fields before CSV export
    const normalizedData = universities.map((uni) => ({
      ...uni,
      domains: Array.isArray(uni.domains) ? uni.domains.join(", ") : "",
      web_pages: Array.isArray(uni.web_pages) ? uni.web_pages.join(", ") : "",
    }));

    const columns = [
      { key: "name", header: "University Name" },
      { key: "country", header: "Country" },
      { key: "state-province", header: "State/Province" },
      { key: "alpha_two_code", header: "Alpha-2 Code" },
      { key: "domains", header: "Domains" },
      { key: "web_pages", header: "Web Pages" },
    ];

    stringify(normalizedData, { header: true, columns }, (err, output) => {
      if (err) {
        logger.error(`Error stringifying CSV: ${err.message}`);
        return next(new Error("Failed to generate CSV."));
      }

      res.header("Content-Type", "text/csv");
      res.attachment("universities.csv");
      res.send(output);
      logger.info("CSV file successfully generated and sent.");
    });
  } catch (error) {
    logger.error(`Error in downloadCsv controller: ${error.message}`);
    next(error);
  }
};

module.exports = {
  downloadCsv,
};
