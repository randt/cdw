const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const fieldEncryption = require("mongoose-field-encryption").fieldEncryption;
const Patient = require("./Patient");

const clinicalHistorySchema = new Schema(
  {
    patientId: {
      type: String,
      ref: "Patient",
      required: true,
    },
    presentingComplain: {
      type: String,
    },
    complaintHx: {
      type: String,
    },
    pastMedicalHx: {
      type: String,
    },
    pastSurgicalHx: {
      type: String,
    },
    allergiesHx: {
      type: String,
    },
    immunizationHx: {
      type: String,
    },
    tobaccoAlcoholHx: {
      type: String,
    },
    familyHx: {
      type: String,
    },
    geneticDiseaseHx: {
      type: String,
    },
    socialHx: {
      type: String,
    },
  },
  { timestamps: true }
);

// Encrypt some fields
clinicalHistorySchema.plugin(fieldEncryption, {
  fields: [
    "presentingComplain",
    "complaintHx",
    "pastMedicalHx",
    "pastSurgicalHx",
    "allergiesHx",
    "immunizationHx",
    "tobaccoAlcoholHx",
    "familyHx",
    "geneticDiseaseHx",
    "socialHx",
  ],
  secret: "mysecretkey",
  algorithm: "aes-256-cbc",
});

const ClinicalHistory = mongoose.model(
  "ClinicalHistory",
  clinicalHistorySchema
);

module.exports = ClinicalHistory;
