const FullBloodCount = require("../models/fullBloodCount");
const crypto = require("crypto");

// Create Full Blood Count Record
exports.createFullBloodCountRecord = async (req, res) => {
  try {
    const { patientId } = req.params;

    // Hashing
    const hash = crypto.createHash("sha512");
    hash.update(patientId);
    const hashedPatientId = hash.digest("hex");

    const fullBloodCountRecord = new FullBloodCount({
      patientId: hashedPatientId,
      ...req.body,
    });
    await fullBloodCountRecord.save();
    res.status(201).json(fullBloodCountRecord);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get All Full Blood Count Records
exports.getAllFullBloodCountRecords = async (req, res) => {
  try {
    const fullBloodCountRecords = await FullBloodCount.find();
    res.json(fullBloodCountRecords);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get Full Blood Count Record by Patient ID
exports.getFullBloodCountRecordByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params;

    // Hashing
    const hash = crypto.createHash("sha512");
    hash.update(patientId);
    const hashedPatientId = hash.digest("hex");

    const fullBloodCountRecord = await FullBloodCount.findOne({
      patientId: hashedPatientId,
    }).lean();
    if (!fullBloodCountRecord) {
      return res
        .status(404)
        .json({ message: "Full Blood Count Record not found" });
    }
    res.json(fullBloodCountRecord);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update Full Blood Count Record by Patient ID
exports.updateFullBloodCountRecordByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params;

    // Hashing
    const hash = crypto.createHash("sha512");
    hash.update(patientId);
    const hashedPatientId = hash.digest("hex");

    const fullBloodCountRecord = await FullBloodCount.findOneAndUpdate(
      { patientId: hashedPatientId },
      { $set: req.body },
      { new: true }
    );
    if (!fullBloodCountRecord) {
      return res
        .status(404)
        .json({ message: "Full Blood Count Record not found" });
    }
    res.json(fullBloodCountRecord);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete Full Blood Count Record by Patient ID
exports.deleteFullBloodCountRecordByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params;

    // Hashing
    const hash = crypto.createHash("sha512");
    hash.update(patientId);
    const hashedPatientId = hash.digest("hex");

    const fullBloodCountRecord = await FullBloodCount.findOneAndDelete({
      patientId: hashedPatientId,
    });
    if (!fullBloodCountRecord) {
      return res
        .status(404)
        .json({ message: "Full Blood Count Record not found" });
    }
    res.json({ message: "Full Blood Count Record deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
