const mongoose = require("mongoose");
const { fieldEncryption } = require("mongoose-field-encryption");

const serumSchema = new mongoose.Schema(
  {
    patientId: {
      type: String,
      ref: "Patient",
      required: true,
    },
    bloodUrea: {
      type: Number,
    },
    serumElectrolytes: {
      type: Number,
    },
    S_cr: {
      type: Number,
    },
    SGPT: {
      type: Number,
    },
    SGOT: {
      type: Number,
    },
    serumBilirubin: {
      type: Number,
    },
    directBilirubin: {
      type: Number,
    },
    indirectBilirubin: {
      type: Number,
    },
  },
  { timestamps: true }
);

serumSchema.plugin(fieldEncryption, {
  fields: [
    "bloodUrea",
    "serumElectrolytes",
    "S_cr",
    "SGPT",
    "SGOT",
    "serumBilirubin",
    "directBilirubin",
    "indirectBilirubin",
  ],
  secret: process.env.ENCRYPTION_SECRET || "my-secret-key",
  algorithm: "aes-256-cbc",
});

const Serum = mongoose.model("Serum", serumSchema);

module.exports = Serum;
