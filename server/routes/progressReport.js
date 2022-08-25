const express = require("express");
const router = express.Router();
const progressReportControllers = require("../controllers/progressReport");
const requiredLogin = require("../middleware/requireAuth");

router.post("/heat-map", progressReportControllers.getHeatMap);
router.post("/pie-chart", progressReportControllers.getPieChart);
router.post("/bar-chart", progressReportControllers.getHeatMap);

module.exports = router;
