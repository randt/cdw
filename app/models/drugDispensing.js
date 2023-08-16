const mongoose = require("mongoose");
const { fieldEncryption } = require("mongoose-field-encryption");

const drugDispensingSchema = new mongoose.Schema(
  {
    patientId: {
      type: String,
      ref: "Patient",
      required: true,
    },
    startDate: {
      type: Date,
    },
    routeOfAdministration: {},
    drugId: {
      type: String,
    },
    dosage: {
      type: String,
    },
    frequency: {
      type: String,
    },
  },
  { timestamps: true }
);

drugDispensingSchema.plugin(fieldEncryption, {
  fields: [
    "startDate",
    "routeOfAdministration",
    "drugId",
    "dosage",
    "frequency",
  ],
  secret: process.env.ENCRYPTION_SECRET || "my-secret-key",
  algorithm: "aes-256-cbc",
});

const DrugDispensing = mongoose.model("DrugDispensing", drugDispensingSchema);

module.exports = DrugDispensing;
