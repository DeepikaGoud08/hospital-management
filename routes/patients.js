const express = require('express');
const router = express.Router();
const patientcontroller = require('../controllers/patientcontroller');

// Routes
router.get('/', patientcontroller.view);
router.post('/', patientcontroller.find);
router.get('/addpatient', patientcontroller.form);
router.post('/addpatient', patientcontroller.create);
router.get('/editpatient/:id', patientcontroller.edit);
router.post('/editpatient/:id', patientcontroller.update);
router.get('/viewpatient/:id', patientcontroller.viewall);
router.get('/delete/:id',patientcontroller.delete);
router.get('/tests',patientcontroller.tests);
router.get('/admissions',patientcontroller.admissions);
router.get('/appointments', patientcontroller.appointments)
  
module.exports = router;