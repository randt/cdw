const DrugDispensing = require("../models/drugDispensing");
const crypto = require("crypto");

// Create Drug Dispensing Record
exports.createDrugDispensingRecord = async (req, res) => {
  try {
    const { patientId } = req.params;

    // Hashing
    const hash = crypto.createHash("sha512");
    hash.update(patientId);
    const hashedPatientId = hash.digest("hex");

    const drugDispensingRecord = new DrugDispensing({
      patientId: hashedPatientId,
      ...req.body,
    });
    await drugDispensingRecord.save();
    res.status(201).json(drugDispensingRecord);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get All Drug Dispensing Records
exports.getAllDrugDispensingRecords = async (req, res) => {
  try {
    const drugDispensingRecords = await DrugDispensing.find();
    res.json(drugDispensingRecords);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get Drug Dispensing Record by Patient ID
exports.getDrugDispensingRecordByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params;

    // Hashing
    const hash = crypto.createHash("sha512");
    hash.update(patientId);
    const hashedPatientId = hash.digest("hex");

    const drugDispensingRecord = await DrugDispensing.findOne({
      patientId: hashedPatientId,
    });
    if (!drugDispensingRecord) {
      return res
        .status(404)
        .json({ message: "Drug Dispensing Record not found" });
    }
    res.json(drugDispensingRecord);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update Drug Dispensing Record by Patient ID
exports.updateDrugDispensingRecordByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params;

    // Hashing
    const hash = crypto.createHash("sha512");
    hash.update(patientId);
    const hashedPatientId = hash.digest("hex");

    const drugDispensingRecord = await DrugDispensing.findOneAndUpdate(
      { patientId: hashedPatientId },
      { $set: req.body },
      { new: true }
    );
    if (!drugDispensingRecord) {
      return res
        .status(404)
        .json({ message: "Drug Dispensing Record not found" });
    }
    res.json(drugDispensingRecord);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete Drug Dispensing Record by Patient ID
exports.deleteDrugDispensingRecordByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params;

    // Hashing
    const hash = crypto.createHash("sha512");
    hash.update(patientId);
    const hashedPatientId = hash.digest("hex");

    const drugDispensingRecord = await DrugDispensing.findOneAndDelete({
      patientId: hashedPatientId,
    });
    if (!drugDispensingRecord) {
      return res
        .status(404)
        .json({ message: "Drug Dispensing Record not found" });
    }
    res.json({ message: "Drug Dispensing Record deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
