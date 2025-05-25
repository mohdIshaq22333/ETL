const express = require("express");
const { downloadCsv } = require("../controllers/etlController");

const router = express.Router();

router.get("/download-csv", downloadCsv);

module.exports = router;
