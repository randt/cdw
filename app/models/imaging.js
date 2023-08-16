const mongoose = require("mongoose");
const { fieldEncryption } = require("mongoose-field-encryption");

const imagingSchema = new mongoose.Schema(
  {
    patientId: {
      type: String,
      ref: "Patient",
      required: true,
    },
    scanType: {
      type: String,
    },
    imageFile: {
      type: Buffer,
    },
    notes: {
      type: String,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

imagingSchema.plugin(fieldEncryption, {
  fields: ["scanType", "imageFile", "notes", "timestamp"],
  secret: process.env.ENCRYPTION_SECRET || "my-secret-key",
  algorithm: "aes-256-cbc",
});

const Imaging = mongoose.model("Imaging", imagingSchema);

module.exports = Imaging;
