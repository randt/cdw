const express = require("express");
const router = express.Router();

const controller = require("../controllers/doctorget.controller");

router.get("/patients/:patientId", controller.getAllDataByPatientId);

router.get(
  "/patients/:patientId/:secret",
  controller.getAllDataByPatientIdnSecret
);

module.exports = router;
