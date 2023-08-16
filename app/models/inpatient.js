const mongoose = require("mongoose");
const mongooseFieldEncryption =
  require("mongoose-field-encryption").fieldEncryption;

const inpatientSchema = new mongoose.Schema(
  {
    patientId: {
      type: String,
      ref: "Patient",
      required: true,
    },
    dateOfAdmission: Date,
    timeOfAdmission: String,
    dateOfDischarge: Date,
    timeOfDischarge: String,
    pulseRate: Number,
    respiratoryRate: Number,
    bloodPressure: String,
    temperature: Number,
    SPO2: Number,
    observations: String,
  },
  { timestamps: true }
);

inpatientSchema.plugin(mongooseFieldEncryption, {
  fields: [
    "dateOfAdmission",
    "timeOfAdmission",
    "dateOfDischarge",
    "timeOfDischarge",
    "pulseRate",
    "respiratoryRate",
    "bloodPressure",
    "temperature",
    "SPO2",
    "observations",
  ],
  secret: "mysecretkey",
  algorithm: "aes-256-cbc",
});

const Inpatient = mongoose.model("Inpatient", inpatientSchema);

module.exports = Inpatient;
