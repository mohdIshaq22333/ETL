const cron = require("node-cron");
const { runEtlProcess } = require("../etl");
const logger = require("../utils/logger");

const startScheduler = () => {
  cron.schedule(
    "0 0 * * *",
    async () => {
      logger.info("Scheduled ETL process triggered.");
      try {
        await runEtlProcess();
      } catch (error) {
        logger.error(`Scheduled ETL run failed: ${error.message}`);
      }
    },
    {
      timezone: "UTC",
    }
  );

  logger.info("Running initial ETL process on startup...");
  runEtlProcess().catch((err) =>
    logger.error(`Initial ETL run failed: ${err.message}`)
  );

  logger.info("ETL scheduler started. Next run: daily at midnight UTC.");
};

module.exports = {
  startScheduler,
};
