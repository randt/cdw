const { Patient, Hash } = require("../models/Patient");

const fieldEncryption = require("mongoose-field-encryption").fieldEncryption;
const crypto = require("crypto");

// Create a new patient
const createPatient = async (req, res, next) => {
  try {
    const {
      name,
      age,
      gender,
      address,
      city,
      occupation,
      dob,
      doctor_regno,
      secretkey,
    } = req.body;
    const currentDate = new Date();
    const year = currentDate.getFullYear().toString().substr(-2);
    const count = await Patient.countDocuments();
    const paddedId = (count + 1).toString().padStart(3, "0");
    const patientId = `PT${year}${paddedId}`;

    console.log(patientId);
    // Hashing
    const hash = crypto.createHash("sha512");
    hash.update(patientId);

    const hashedPatientId = hash.digest("hex");

    const patient = new Patient({
      patientId: hashedPatientId,
      name,
      age,
      gender,
      address,
      city,
      occupation,
      dob,
      doctor_regno,
      secretkey,
    });
    await patient.validate();
    await patient.save();
    await Hash.create({ patientId: patientId, hashValue: hashedPatientId });
    res.status(201).json(patient);
  } catch (error) {
    next(error);
  }
};

// get pations without decrypt

const getPatientswithoutcrypt = async (req, res, next) => {
  try {
    const patients = await Patient.find();

    const filteredPatients = patients.map((patient) => {
      const { address, dob, age, name, ...rest } = patient.toObject();
      return rest;
    });

    res.status(200).json(filteredPatients[0]);
  } catch (error) {
    next(error);
  }
};


// Get all patients by admin
const getAllPatientsAdmin = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.send(patients);
  } catch (error) {
    res.status(500).send(error);
  }
};

// get all pations without decrypt
const getAllPatients = async (req, res, next) => {
  try {
    const patients = await Patient.find().lean();
    res.json(patients);
  } catch (error) {
    next(error);
  }
};

const getPatientById = async (req, res, next) => {
  try {
    const { patientId } = req.params;

    // Hashing
    const hash = crypto.createHash("sha512");
    hash.update(patientId);
    const hashedPatientId = hash.digest("hex");

    const patient = await Patient.findOne({
      patientId: hashedPatientId,
    }).lean();
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Decrypt the encrypted fields of the patient record
    //   await patient.decrypt();

    res.json(patient);
  } catch (error) {
    next(error);
  }
};

const getPatientByIdwithoutcrypt = async (req, res, next) => {
  try {
    const { patientId } = req.params;

    // Hashing
    const hash = crypto.createHash("sha512");
    hash.update(patientId);
    const hashedPatientId = hash.digest("hex");

    const patient = await Patient.findOne({ patientId: hashedPatientId });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const decryptdata = patient.toObject();

    const nname = fieldEncryption.decrypt(decryptdata.name, "my-secret-key");

    // Decrypt the encrypted fields of the patient record

    res.json(patient);
  } catch (error) {
    next(error);
  }
};

// Update a patient by patientId
const updatePatientById = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "age", "diagnosis", "medications"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }
  try {
    // Hashing
    const hash = crypto.createHash("sha512");
    hash.update(req.params.patientId);
    const hashedPatientId = hash.digest("hex");

    const patient = await Patient.findOne({ patientId: hashedPatientId });
    if (!patient) {
      return res.status(404).send();
    }
    updates.forEach((update) => (patient[update] = req.body[update]));
    await patient.save();
    res.send(patient);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a patient by patientId
const deletePatientById = async (req, res) => {
  try {
    // Hashing
    const hash = crypto.createHash("sha512");
    hash.update(req.params.patientId);
    const hashedPatientId = hash.digest("hex");

    const patient = await Patient.findOneAndDelete({
      patientId: hashedPatientId,
    });
    if (!patient) {
      return res.status(404).send();
    }
    res.send(patient);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createPatient,
  getAllPatients,
  getAllPatientsAdmin,
  getPatientswithoutcrypt,
  getPatientById,
  getPatientByIdwithoutcrypt,
  updatePatientById,
  deletePatientById,
};
