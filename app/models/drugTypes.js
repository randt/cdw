const mongoose = require("mongoose");
const { fieldEncryption } = require("mongoose-field-encryption");

const drugTypesSchema = new mongoose.Schema(
  {
    drugId: {
      type: String,
      required: true,
      unique: true,
    },
    nameOfDrug: {
      type: String,
    },
    category: {
      type: String,
    },
  },
  { timestamps: true }
);

drugTypesSchema.plugin(fieldEncryption, {
  fields: ["nameOfDrug", "category"],
  secret: process.env.ENCRYPTION_SECRET || "my-secret-key",
  algorithm: "aes-256-cbc",
});

const DrugTypes = mongoose.model("DrugTypes", drugTypesSchema);

module.exports = DrugTypes;
