const express = require("express");
const router = express.Router();
const outpatientRecordController = require("../controllers/outpatientController");

router.post(
  "/patients/:patientId/outpatientrecords",
  outpatientRecordController.createOutpatientRecord
);
router.get(
  "/outpatientrecords",
  outpatientRecordController.getAllOutpatientRecords
);
router.get(
  "/patients/:patientId/outpatientrecords",
  outpatientRecordController.getOutpatientRecordByPatientId
);
router.put(
  "/patients/:patientId/outpatientrecords",
  outpatientRecordController.updateOutpatientRecordByPatientId
);
router.delete(
  "/patients/:patientId/outpatientrecords",
  outpatientRecordController.deleteOutpatientRecordByPatientId
);

module.exports = router;
