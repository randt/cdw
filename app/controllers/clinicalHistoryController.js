const ClinicalHistory = require("../models/clinicalHistory");

const crypto = require("crypto");

// Create Clinical History
exports.createClinicalHistory = async (req, res) => {
  try {
    const { patientId } = req.params;

    // Hashing
    const hash = crypto.createHash("sha512");
    hash.update(patientId);
    const hashedPatientId = hash.digest("hex");

    const clinicalHistory = new ClinicalHistory({
      patientId: hashedPatientId,
      ...req.body,
    });
    await clinicalHistory.save();
    res.status(201).json(clinicalHistory);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get All Clinical Histories
exports.getAllClinicalHistories = async (req, res) => {
  try {
    const clinicalHistories = await ClinicalHistory.find();
    res.json(clinicalHistories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get Clinical History by Patient ID
exports.getClinicalHistoryByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params;

    // Hashing
    const hash = crypto.createHash("sha512");
    hash.update(patientId);
    const hashedPatientId = hash.digest("hex");

    const clinicalHistory = await ClinicalHistory.findOne({
      patientId: hashedPatientId,
    });
    if (!clinicalHistory) {
      return res.status(404).json({ message: "Clinical History not found" });
    }
    res.json(clinicalHistory);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update Clinical History by Patient ID
exports.updateClinicalHistoryByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params;

    // Hashing
    const hash = crypto.createHash("sha512");
    hash.update(patientId);
    const hashedPatientId = hash.digest("hex");

    const clinicalHistory = await ClinicalHistory.findOneAndUpdate(
      { patientId: hashedPatientId },
      { $set: req.body },
      { new: true }
    );
    if (!clinicalHistory) {
      return res.status(404).json({ message: "Clinical History not found" });
    }
    res.json(clinicalHistory);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete Clinical History by Patient ID
exports.deleteClinicalHistoryByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params;

    // Hashing
    const hash = crypto.createHash("sha512");
    hash.update(patientId);
    const hashedPatientId = hash.digest("hex");

    const clinicalHistory = await ClinicalHistory.findOneAndDelete({
      patientId: hashedPatientId,
    });
    if (!clinicalHistory) {
      return res.status(404).json({ message: "Clinical History not found" });
    }
    res.json({ message: "Clinical History deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
