const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patients.controller');

// Create a new patient
router.post('/', patientController.createPatient);

// Get all patients
router.get('/', patientController.getAllPatients);

// Get all patients
router.get('/p', patientController.getPatientswithoutcrypt);

// Get all patients by admin
router.get('/a', patientController.getAllPatientsAdmin);

// Get a patient by patientId
router.get('/:patientId', patientController.getPatientById);

// Get a patient by without encryption
router.get('/:patientId/p',patientController.getPatientByIdwithoutcrypt);

// Update a patient by patientId
router.patch('/:patientId', patientController.updatePatientById);

// Delete a patient by patientId
router.delete('/:patientId', patientController.deletePatientById);

module.exports = router;