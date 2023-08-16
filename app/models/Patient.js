const mongoose = require("mongoose");
const fieldEncryption = require("mongoose-field-encryption").fieldEncryption;

const patientSchema = new mongoose.Schema(
  {
    patientId: {
      type: String,
      required: true,
      unique: true,
    },
    name: String,
    age: Number,
    gender: String,
    address: String,
    city: String,
    occupation: String,
    dob: Date,
    doctor_regno: String,
    secretkey: String,
  },
  { timestamps: true }
);

patientSchema.plugin(fieldEncryption, {
  fields: [
    "name",
    "age",
    "gender",
    "address",
    "city",
    "occupation",
    "dob",
    "doctor_regno",
    "secretkey",
  ],
  secret: process.env.ENCRYPTION_SECRET || "my-secret-key",
  algorithm: "aes-256-cbc",
});

// patientSchema.pre('save', function (next) {
//   if (!this.patientId) {
//     // Generate patient ID
//     const Patient = mongoose.model('Patient', patientSchema);
//     Patient.countDocuments((err, count) => {
//       if (err) {
//         return next(err);
//       }
//       this.patientId = 'PT' + String(count + 1).padStart(3, '0');
//       next();
//     });
//   } else {
//     next();
//   }
// });

// Define pre-save hook to generate patientId
// patientSchema.pre('save', function (next) {
//     const currentDate = new Date();
//     const year = currentDate.getFullYear().toString().substr(-2);
//     const paddedId = (this.isNew || this.isModified('patientId')) ? (this.patientId.toString().padStart(3, '0')) : '';
//     this.patientId = `PT${year}${paddedId}`;
//     next();
//   });

const hashSchema = new mongoose.Schema(
  {
    patientId: String,
    hashValue: String,
  },
  { timestamps: true }
);

const Patient = mongoose.model("Patient", patientSchema);
const Hash = mongoose.model("Hash", hashSchema);

module.exports = { Patient, Hash };
