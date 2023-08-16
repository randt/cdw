const express = require("express");
const router = express.Router();

const controller = require("../controllers/modget.controller");

router.get("/patients/:patientId", controller.getAllDataByPatientId);

module.exports = router;
