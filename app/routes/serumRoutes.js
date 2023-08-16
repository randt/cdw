const express = require("express");
const router = express.Router();

const serumController = require("../controllers/serumController");

// Create Serum Record
router.post("/patients/:patientId/serum", serumController.createSerumRecord);

// Get All Serum Records
router.get("/serum", serumController.getAllSerumRecords);

// Get Serum Record by Patient ID
router.get(
  "/patients/:patientId/serum",
  serumController.getSerumRecordByPatientId
);

// Update Serum Record by Patient ID
router.put(
  "/patients/:patientId/serum",
  serumController.updateSerumRecordByPatientId
);

// Delete Serum Record by Patient ID
router.delete(
  "/patients/:patientId/serum",
  serumController.deleteSerumRecordByPatientId
);

module.exports = router;
