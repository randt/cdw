const Serum = require("../models/serum");
const crypto = require("crypto");

// Create Serum Record
exports.createSerumRecord = async (req, res) => {
  try {
    const { patientId } = req.params;
    // Hashing
    const hash = crypto.createHash("sha512");
    hash.update(patientId);
    const hashedPatientId = hash.digest("hex");

    const serumRecord = new Serum({
      patientId: hashedPatientId,
      ...req.body,
    });
    await serumRecord.save();
    res.status(201).json(serumRecord);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get All Serum Records
exports.getAllSerumRecords = async (req, res) => {
  try {
    const serumRecords = await Serum.find();
    res.json(serumRecords);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get Serum Record by Patient ID
exports.getSerumRecordByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params;

    // Hashing
    const hash = crypto.createHash("sha512");
    hash.update(patientId);
    const hashedPatientId = hash.digest("hex");

    const serumRecord = await Serum.findOne({ patientId: hashedPatientId });
    if (!serumRecord) {
      return res.status(404).json({ message: "Serum Record not found" });
    }
    res.json(serumRecord);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update Serum Record by Patient ID
exports.updateSerumRecordByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params;

    // Hashing
    const hash = crypto.createHash("sha512");
    hash.update(patientId);
    const hashedPatientId = hash.digest("hex");

    const serumRecord = await Serum.findOneAndUpdate(
      { patientId: hashedPatientId },
      { $set: req.body },
      { new: true }
    );
    if (!serumRecord) {
      return res.status(404).json({ message: "Serum Record not found" });
    }
    res.json(serumRecord);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete Serum Record by Patient ID
exports.deleteSerumRecordByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params;

    // Hashing
    const hash = crypto.createHash("sha512");
    hash.update(patientId);
    const hashedPatientId = hash.digest("hex");

    const serumRecord = await Serum.findOneAndDelete({
      patientId: hashedPatientId,
    });
    if (!serumRecord) {
      return res.status(404).json({ message: "Serum Record not found" });
    }
    res.json({ message: "Serum Record deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
