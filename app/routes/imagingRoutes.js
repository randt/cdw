const express = require("express");
const router = express.Router();
const imagingController = require("../controllers/imagingController");

// Create Imaging Record
router.post(
  "/patients/:patientId/imaging",
  imagingController.createImagingRecord
);

// Get All Imaging Records
router.get("/imaging", imagingController.getAllImagingRecords);

// Get Imaging Record by Patient ID
router.get(
  "/patients/:patientId/imaging",
  imagingController.getImagingRecordByPatientId
);

// Update Imaging Record by Patient ID
router.put(
  "/patients/:patientId/imaging",
  imagingController.updateImagingRecordByPatientId
);

// Delete Imaging Record by Patient ID
router.delete(
  "/patients/:patientId/imaging",
  imagingController.deleteImagingRecordByPatientId
);

module.exports = router;
