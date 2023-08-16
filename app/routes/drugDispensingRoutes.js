const express = require("express");
const router = express.Router();
const drugDispensingController = require("../controllers/drugDispensingController");

// Create Imaging Record
router.post(
  "/patients/:patientId/drug",
  drugDispensingController.createDrugDispensingRecord
);

// Get All Imaging Records
router.get("/drug", drugDispensingController.getAllDrugDispensingRecords);

// Get Imaging Record by Patient ID
router.get(
  "/patients/:patientId/drug",
  drugDispensingController.getDrugDispensingRecordByPatientId
);

// Update Imaging Record by Patient ID
router.put(
  "/patients/:patientId/drug",
  drugDispensingController.updateDrugDispensingRecordByPatientId
);

// Delete Imaging Record by Patient ID
router.delete(
  "/patients/:patientId/drug",
  drugDispensingController.deleteDrugDispensingRecordByPatientId
);

module.exports = router;
