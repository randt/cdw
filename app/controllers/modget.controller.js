const Patient = require("../models/Patient");
const Schema1 = require("../models/clinicalHistory");
const Schema2 = require("../models/inpatient");
const Schema3 = require("../models/outpatient");
const Schema4 = require("../models/fullBloodCount");
const Schema5 = require("../models/serum");
const Schema6 = require("../models/imaging");
const Schema7 = require("../models/drugDispensing");

const crypto = require("crypto");

exports.getAllDataByPatientId = async (req, res) => {
  const patientId = req.params.patientId;

  const hash = crypto.createHash("sha512");
  hash.update(patientId);
  const hashedPatientId = hash.digest("hex");

  try {
    // First, find the patient by their ID

    const patients = await Patient.find({ patientId: hashedPatientId });

    const patient = patients.map((patient) => {
      const { address, dob, name, ...rest } = patient.toObject();
      return rest;
    });

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Fetch data from the other schemas using the patient ID
    const data1 = await Schema1.findOne({ patientId: hashedPatientId });
    const data2 = await Schema2.findOne({ patientId: hashedPatientId });
    const data3 = await Schema3.findOne({ patientId: hashedPatientId });
    const data4 = await Schema4.findOne({ patientId: hashedPatientId });
    const data5 = await Schema5.findOne({ patientId: hashedPatientId });
    const data6 = await Schema6.findOne({ patientId: hashedPatientId });
    const data7 = await Schema7.findOne({ patientId: hashedPatientId });

    // Return the data as an object
    return res.json({
      patient,
      data1,
      data2,
      data3,
      data4,
      data5,
      data6,
      data7,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
