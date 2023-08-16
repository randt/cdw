const express = require("express");
const router = express.Router();

const fullBloodCountController = require("../controllers/fullBloodCountController");

// Create new full blood count record for an in-patient
router.post(
  "/fbc-patient/:patientId/fullbloodcount",
  fullBloodCountController.createFullBloodCountRecord
);

// Get all full blood count records for in-patients
router.get(
  "/fbc-patient/fullbloodcount",
  fullBloodCountController.getAllFullBloodCountRecords
);

// Get full blood count record for an in-patient by patient ID
router.get(
  "/fbc-patient/:patientId/fullbloodcount",
  fullBloodCountController.getFullBloodCountRecordByPatientId
);

// Update full blood count record for an in-patient by patient ID
router.put(
  "/fbc-patient/:patientId/fullbloodcount",
  fullBloodCountController.updateFullBloodCountRecordByPatientId
);

// Delete full blood count record for an in-patient by patient ID
router.delete(
  "/fbc-patient/:patientId/fullbloodcount",
  fullBloodCountController.deleteFullBloodCountRecordByPatientId
);

module.exports = router;
