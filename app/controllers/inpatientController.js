const InPatient = require("../models/inpatient");
const crypto = require("crypto");

// Create In-Patient Record
exports.createInPatientRecord = async (req, res) => {
  try {
    const { patientId } = req.params;
    // Hashing
    const hash = crypto.createHash("sha512");
    hash.update(patientId);
    const hashedPatientId = hash.digest("hex");

    const inPatientRecord = new InPatient({
      patientId: hashedPatientId,
      ...req.body,
    });
    await inPatientRecord.save();
    res.status(201).json(inPatientRecord);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get All In-Patient Records
exports.getAllInPatientRecords = async (req, res) => {
  try {
    const inPatientRecords = await InPatient.find();
    res.json(inPatientRecords);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get In-Patient Record by Patient ID
exports.getInPatientRecordByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params;

    // Hashing
    const hash = crypto.createHash("sha512");
    hash.update(patientId);
    const hashedPatientId = hash.digest("hex");

    const inPatientRecord = await InPatient.findOne({
      patientId: hashedPatientId,
    });
    if (!inPatientRecord) {
      return res.status(404).json({ message: "In-Patient Record not found" });
    }
    res.json(inPatientRecord);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update In-Patient Record by Patient ID
exports.updateInPatientRecordByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params;

    // Hashing
    const hash = crypto.createHash("sha512");
    hash.update(patientId);
    const hashedPatientId = hash.digest("hex");

    const inPatientRecord = await InPatient.findOneAndUpdate(
      { patientId: hashedPatientId },
      { $set: req.body },
      { new: true }
    );
    if (!inPatientRecord) {
      return res.status(404).json({ message: "In-Patient Record not found" });
    }
    res.json(inPatientRecord);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete In-Patient Record by Patient ID
exports.deleteInPatientRecordByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params;

    // Hashing
    const hash = crypto.createHash("sha512");
    hash.update(patientId);
    const hashedPatientId = hash.digest("hex");

    const inPatientRecord = await InPatient.findOneAndDelete({
      patientId: hashedPatientId,
    });
    if (!inPatientRecord) {
      return res.status(404).json({ message: "In-Patient Record not found" });
    }
    res.json({ message: "In-Patient Record deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
