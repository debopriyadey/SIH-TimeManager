const express = require("express");
const router = express.Router();
const progressReportControllers = require("../controllers/progressReport");
const requiredLogin = require("../middleware/requireAuth");

router.post("/heat-map", progressReportControllers.getHeatMap);
router.get("/pie-chart", requiredLogin, progressReportControllers.getPieChart);
router.get("/bar-chart", requiredLogin, progressReportControllers.getBarChart);

module.exports = router;
