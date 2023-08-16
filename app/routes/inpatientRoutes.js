const express = require("express");
const router = express.Router();
const inPatientController = require("../controllers/inpatientController");

// Create In-patient Record
router.post(
  "/patients/:patientId/in-patient-records",
  inPatientController.createInPatientRecord
);

// Get All In-patient Records
router.get("/in-patient-records", inPatientController.getAllInPatientRecords);

// Get In-patient Record by Patient ID
router.get(
  "/patients/:patientId/in-patient-records",
  inPatientController.getInPatientRecordByPatientId
);

// Update In-patient Record by Patient ID
router.put(
  "/patients/:patientId/in-patient-records",
  inPatientController.updateInPatientRecordByPatientId
);

// Delete In-patient Record by Patient ID
router.delete(
  "/patients/:patientId/in-patient-records",
  inPatientController.deleteInPatientRecordByPatientId
);

module.exports = router;
