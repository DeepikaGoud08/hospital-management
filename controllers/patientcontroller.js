var connection = require('../database');
  

// View Users
exports.view = (req, res) => {
  // User the connection
  connection.query('SELECT * FROM patients WHERE status = "active"', (err, rows) => {
    // When done with the connection, release it
    if (!err) {
      let removedUser = req.query.removed;
      res.render('patients', { rows, removedUser });
    } else {
      console.log(err);
    }
    //console.log('The data from user table: \n', rows);
  });
}

// Find User by Search
exports.find = (req, res) => {
  let searchTerm = req.body.search;
  // User the connection
  connection.query('SELECT * FROM patients WHERE first_name LIKE ? OR last_name LIKE ? OR status LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
    if (!err) {
      res.render('patients', { rows });
    } else {
      console.log(err);
    }
  //  console.log('The data from patient table: \n', rows);
  });
}

exports.form = (req, res) => {
  res.render('add-patient');
}

// Add new user
exports.create = (req, res) => {
  const { first_name, last_name, age, gender, email, phone, appointment_date, comments } = req.body;
  let searchTerm = req.body.search;

  // User the connection
  connection.query('INSERT INTO patients SET first_name = ?, last_name = ?, age = ?, gender = ?, email = ?, phone = ?, comments = ?', [first_name, last_name,age, gender, email, phone, comments], (err, rows) => {
    if (!err) {
        console.log(rows)
        const patientId = rows.insertId;
        connection.query(`INSERT INTO appointments SET patient_id = ?, doctor_id = ?, appointment_date = ?`, [patientId, 1, appointment_date], 
                  (err, rows) => { 
                    console.log(rows);
                    res.render('add-patient', { alert: 'User added successfully.' });
        });

      res.render('add-patient', { alert: 'User added successfully.' });
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);
  });
}


// Edit user
exports.edit = (req, res) => {
  // User the connection
  connection.query('SELECT * FROM patients WHERE patient_id = ?', [req.params.id], (err, rows) => {
    if (!err) {
    console.log(rows)
      res.render('edit-patient', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);
  });
}


// Update User
exports.update = (req, res) => {
  const { first_name, last_name, email, phone, comments } = req.body;
  // User the connection
  connection.query('UPDATE patients SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ? WHERE patient_id = ?', [first_name, last_name, email, phone, comments, req.params.id], (err, rows) => {

    if (!err) {
      // User the connection
      connection.query('SELECT * FROM patients WHERE patient_id = ?', [req.params.id], (err, rows) => {
        // When done with the connection, release it
        console.log(rows)
        if (!err) {

          res.render('edit-patient', { rows, alert: `${first_name} has been updated.` });
        } else {
          console.log(err);
        }
        console.log('The data from patient table: \n', rows);
      });
    } else {
      console.log(err);
    }
    console.log('The data from patient table: \n', rows);
  });
}

// Delete User
exports.delete = (req, res) => {

  // Delete a record

  // User the connection
  // connection.query('DELETE FROM user WHERE id = ?', [req.params.id], (err, rows) => {

  //   if(!err) {
  //     res.redirect('/');
  //   } else {
  //     console.log(err);
  //   }
  //   console.log('The data from user table: \n', rows);

  // });

  // Hide a record

  connection.query('UPDATE patients SET status = ? WHERE patient_id = ?', ['removed', req.params.id], (err, rows) => {
    if (!err) {

        connection.query('DELETE FROM appointments WHERE patient_id = ?', [req.params.id], (err, rows) => {
          if (!err) {

            let removedUser = encodeURIComponent('User successeflly removed.');
            res.redirect('/patients/?removed=' + removedUser);
          }

        })
    
    } else {
      console.log(err);
    }
    console.log('The data from beer table are: \n', rows);
  });

}

// View Users
exports.viewall = (req, res) => {

  // User the connection
  connection.query('SELECT * FROM patients WHERE patient_id = ?', [req.params.id], (err, rows) => {
    if (!err) {
        console.log(rows);
      res.render('view-patient', {rows});
    } else {
      console.log(err);
    }
    console.log('The data from patient table: \n', rows);
  });

}

exports.admissions =  (req, res) => {
    connection.query('SELECT a.admission_id, a.patient_id, a.admission_date, a.discharge_date, r.room_id, r.room_number, r.room_type, r.room_status FROM admissions a JOIN rooms r ON a.room_id = r.room_id;', [req.params.id], (err, rows) => {
        if (!err) {
            console.log(rows);
          res.render('admissions', {rows});
        } else {
          console.log(err);
        }
        console.log('The data from patient table: \n', rows);
      });
}

exports.tests = (req, res) => {
    connection.query('SELECT patients.first_name, patients.last_name, patients.age, patients.gender, patients.email, patients.phone, tests.test_name, test_results.result_value, test_results.test_date FROM test_results JOIN patients ON test_results.patient_id = patients.patient_id JOIN tests ON test_results.test_id = tests.test_id;', [req.params.id], (err, rows) => {
        if (!err) {
            console.log(rows);
          res.render('tests', {rows});
        } else {
          console.log(err);
        }
        console.log('The data from patient table: \n', rows);
      });
    }

exports.appointments = ( req, res) => {
    connection.query('SELECT appointments.appointment_id, appointments.appointment_date, doctors.first_name AS doctor_first_name, doctors.last_name AS doctor_last_name, patients.first_name AS patient_first_name, patients.last_name AS patient_last_name FROM appointments INNER JOIN doctors ON appointments.doctor_id = doctors.doctor_id INNER JOIN patients ON appointments.patient_id = patients.patient_id;' ,[req.params.id], (err, rows) => {
    if (!err) {
        console.log(rows);
      res.render('appointments', {rows});
    } else {
      console.log(err);
    }
    console.log('The data from patient table: \n', rows);
  });
}