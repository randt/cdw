const express = require("express");
const router = express.Router();
const clinicalHistoryController = require("../controllers/clinicalHistoryController");

// Create a new clinical history for a patient
router.post(
  "/patients/:patientId/clinicalHistory",
  clinicalHistoryController.createClinicalHistory
);

// Get a patient's clinical history
router.get(
  "/patients/:patientId/clinicalHistory",
  clinicalHistoryController.getClinicalHistoryByPatientId
);

// Update a patient's clinical history
router.put(
  "/patients/:patientId/clinicalHistory",
  clinicalHistoryController.updateClinicalHistoryByPatientId
);

// Delete a patient's clinical history
router.delete(
  "/patients/:patientId/clinicalHistory",
  clinicalHistoryController.deleteClinicalHistoryByPatientId
);

module.exports = router;
