const express = require("express");
const router = express.Router();

const controller = require("../controllers/adminget.controller");

router.get("/patients/:patientId", controller.getAllDataByPatientId);

module.exports = router;
