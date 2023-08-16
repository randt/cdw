const mongoose = require("mongoose");
const { fieldEncryption } = require("mongoose-field-encryption");

const outpatientSchema = new mongoose.Schema(
  {
    patientId: {
      type: String,
      ref: "Patient",
      required: true,
    },
    pulseRate: {
      type: Number,
    },
    respiratoryRate: {
      type: Number,
    },
    bloodPressure: {
      type: String,
    },
    temperature: {
      type: Number,
    },
    SPO2: {
      type: Number,
    },
    clinicalExamination: {
      type: String,
    },
  },
  { timestamps: true }
);

outpatientSchema.plugin(fieldEncryption, {
  fields: [
    "pulseRate",
    "respiratoryRate",
    "bloodPressure",
    "temperature",
    "SPO2",
    "clinicalExamination",
  ],
  secret: process.env.ENCRYPTION_SECRET || "my-secret-key",
  algorithm: "aes-256-cbc",
});

const Outpatient = mongoose.model("Outpatient", outpatientSchema);

module.exports = Outpatient;
