const Imaging = require("../models/imaging");
const crypto = require("crypto");

// Create Imaging Record
exports.createImagingRecord = async (req, res) => {
  try {
    const { patientId } = req.params;

    // Hashing
    const hash = crypto.createHash("sha512");
    hash.update(patientId);
    const hashedPatientId = hash.digest("hex");

    const imagingRecord = new Imaging({
      patientId: hashedPatientId,
      ...req.body,
    });
    await imagingRecord.save();
    res.status(201).json(imagingRecord);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get All Imaging Records
exports.getAllImagingRecords = async (req, res) => {
  try {
    const imagingRecords = await Imaging.find();
    res.json(imagingRecords);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get Imaging Record by Patient ID
exports.getImagingRecordByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params;

    // Hashing
    const hash = crypto.createHash("sha512");
    hash.update(patientId);
    const hashedPatientId = hash.digest("hex");

    const imagingRecord = await Imaging.findOne({ patientId: hashedPatientId });
    if (!imagingRecord) {
      return res.status(404).json({ message: "Imaging Record not found" });
    }
    res.json(imagingRecord);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update Imaging Record by Patient ID
exports.updateImagingRecordByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params;

    // Hashing
    const hash = crypto.createHash("sha512");
    hash.update(patientId);
    const hashedPatientId = hash.digest("hex");

    const imagingRecord = await Imaging.findOneAndUpdate(
      { patientId: hashedPatientId },
      { $set: req.body },
      { new: true }
    );
    if (!imagingRecord) {
      return res.status(404).json({ message: "Imaging Record not found" });
    }
    res.json(imagingRecord);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete Imaging Record by Patient ID
exports.deleteImagingRecordByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params;

    // Hashing
    const hash = crypto.createHash("sha512");
    hash.update(patientId);
    const hashedPatientId = hash.digest("hex");

    const imagingRecord = await Imaging.findOneAndDelete({
      patientId: hashedPatientId,
    });
    if (!imagingRecord) {
      return res.status(404).json({ message: "Imaging Record not found" });
    }
    res.json({ message: "Imaging Record deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
