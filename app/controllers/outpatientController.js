const OutpatientRecord = require("../models/outpatient");
const crypto = require("crypto");

// Create Outpatient Record
exports.createOutpatientRecord = async (req, res) => {
  try {
    const { patientId } = req.params;
    // Hashing
    const hash = crypto.createHash("sha512");
    hash.update(patientId);
    const hashedPatientId = hash.digest("hex");

    const outpatientRecord = new OutpatientRecord({
      patientId: hashedPatientId,
      ...req.body,
    });
    await outpatientRecord.save();
    res.status(201).json(outpatientRecord);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get All Outpatient Records
exports.getAllOutpatientRecords = async (req, res) => {
  try {
    const outpatientRecords = await OutpatientRecord.find();
    res.json(outpatientRecords);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get Outpatient Record by Patient ID
exports.getOutpatientRecordByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params;

    // Hashing
    const hash = crypto.createHash("sha512");
    hash.update(patientId);
    const hashedPatientId = hash.digest("hex");

    const outpatientRecord = await OutpatientRecord.findOne({
      patientId: hashedPatientId,
    });
    if (!outpatientRecord) {
      return res.status(404).json({ message: "Outpatient Record not found" });
    }
    res.json(outpatientRecord);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update Outpatient Record by Patient ID
exports.updateOutpatientRecordByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params;

    // Hashing
    const hash = crypto.createHash("sha512");
    hash.update(patientId);
    const hashedPatientId = hash.digest("hex");

    const outpatientRecord = await OutpatientRecord.findOneAndUpdate(
      { patientId: hashedPatientId },
      { $set: req.body },
      { new: true }
    );
    if (!outpatientRecord) {
      return res.status(404).json({ message: "Outpatient Record not found" });
    }
    res.json(outpatientRecord);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete Outpatient Record by Patient ID
exports.deleteOutpatientRecordByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params;

    // Hashing
    const hash = crypto.createHash("sha512");
    hash.update(patientId);
    const hashedPatientId = hash.digest("hex");

    const outpatientRecord = await OutpatientRecord.findOneAndDelete({
      patientId: hashedPatientId,
    });
    if (!outpatientRecord) {
      return res.status(404).json({ message: "Outpatient Record not found" });
    }
    res.json({ message: "Outpatient Record deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
