const express = require('express');
const router = express.Router();

const doctorcontroller = require('../controllers/doctorcontroller');


// Routes
router.get('/doctor', doctorcontroller.viewdoctor);
router.get('/prescriptions',doctorcontroller.viewprescriptions)

  
module.exports = router;