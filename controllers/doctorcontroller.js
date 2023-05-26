var connection = require('../database');
  

exports.viewdoctor = (req, res) => {
    console.log("helloooo");
    connection.query('SELECT doctors.doctor_id, doctors.first_name, doctors.last_name, doctors.specialization, departments.department_name FROM doctors INNER JOIN doctor_department ON doctors.doctor_id = doctor_department.doctor_id INNER JOIN departments ON doctor_department.department_id = departments.department_id;', (err, rows) => {
        console.log(rows);
        if (!err) {
          res.render('doctors', { rows });
        } else {
          console.log(err);
        }
        console.log('The data from user table: \n', rows);
      });
}

exports.viewprescriptions = (req, res) => {
    connection.query('SELECT p.prescription_id, concat(pt.first_name," ", pt.last_name) AS patient_name, concat(d.first_name," ", d.last_name) AS doctor_name, a.appointment_date, m.medication_name, p.dosage, p.start_date, p.end_date FROM prescriptions p JOIN patients pt ON p.patient_id = pt.patient_id JOIN doctors d ON p.doctor_id = d.doctor_id JOIN appointments a ON p.appointment_id = a.appointment_id JOIN medications m ON p.medication_id = m.medication_id;', (err, rows) => {
        if (!err) {
            res.render('prescriptions', { rows });
          } else {
            console.log(err);
          }
          console.log('The data from user table: \n', rows);
        });
  
}