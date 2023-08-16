const mongoose = require("mongoose");
const { fieldEncryption } = require("mongoose-field-encryption");

const fullBloodCountSchema = new mongoose.Schema(
  {
    patientId: {
      type: String,
      ref: "Patient",
      required: true,
    },
    WBC: {
      type: Number,
    },
    Neutrophils: {
      type: Number,
    },
    Lymphocytes: {
      type: Number,
    },
    Eosinophils: {
      type: Number,
    },
    Hb: {
      type: Number,
    },
    MCV: {
      type: Number,
    },
    MCH: {
      type: Number,
    },
    MCHC: {
      type: Number,
    },
    RDW: {
      type: Number,
    },
    Plt: {
      type: Number,
    },
  },
  { timestamps: true }
);

fullBloodCountSchema.plugin(fieldEncryption, {
  fields: [
    "WBC",
    "Neutrophils",
    "Lymphocytes",
    "Eosinophils",
    "Hb",
    "MCV",
    "MCH",
    "MCHC",
    "RDW",
    "Plt",
  ],
  secret: process.env.ENCRYPTION_SECRET || "my-secret-key",
  algorithm: "aes-256-cbc",
});

const FullBloodCount = mongoose.model("FullBloodCount", fullBloodCountSchema);

module.exports = FullBloodCount;
