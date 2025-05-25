module.exports = {
  port: process.env.PORT || 3000,
  universityApiUrl: process.env.UNIVERSITY_API_URL,
  dataFilePath: process.env.DATA_FILE_PATH,
  logLevel: process.env.LOG_LEVEL || "info",
};
