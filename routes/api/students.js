const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const students = require('../../Students');

const idFilter = req => student => student.id === parseInt(req.params.id);

// Gets All Students
router.get('/', (req, res) => res.json(students));

// Get Single Student
router.get('/:id', (req, res) => {
  const found = students.some(idFilter(req));

  if (found) {
    res.json(students.filter(idFilter(req)));
  } else {
    res.status(400).json({ msg: `No student with the id of ${req.params.id}` });
  }
});

// Create Student Response for UI
router.post('/', (request, response) => {
  const newStudent = {
    ...request.body,
    id: uuid.v4()
  };

  // Validate student response and update output
  validateStudenResponse(newStudent);

  students.push(newStudent);
  // response.json(students);
  response.redirect('/');
});

// Create Student Response for command line
router.post('/cli', (request, response) => {
  const newStudent = {
    ...request.body,
    id: uuid.v4()
  };

  // Validate student response and update output
  validateStudenResponse(newStudent);

  students.push(newStudent);
  response.json(newStudent);
});

function validateStudenResponse(newStudent) {
  if (!newStudent.input_value || !newStudent.input_unit || !newStudent.target_unit 
    || !newStudent.response || !newStudent.auth_answer) {
    return response.status(400).json({ msg: 'Please include a input value, unit of measure, target unit of measure, Student Response, and Authorative Answer' });
  }
  var student_response = parseFloat(newStudent.response);
  var authorative = parseFloat(newStudent.auth_answer);
  // Validate input unit of measure
  if(!checkUnitOfMeasure(newStudent.input_unit)) {
    newStudent.output = 'invalid';
  } else if(student_response != authorative) {
    // To be considered correct, the student’s response must match an authoritative 
    // answer after both the student’s response and authoritative answer are rounded 
    // to the tenths place.
    newStudent.response = roundTo(parseFloat(newStudent.response), 2);
    newStudent.auth_answer = roundTo(parseFloat(newStudent.auth_answer), 2);
    if(newStudent.response != newStudent.auth_answer) {
      newStudent.output = 'incorrect';
    } else {
      newStudent.output = 'correct';
    }
  } else {
    newStudent.output = 'correct';
  }
}


function roundTo(n, digits) {
  if (digits === undefined) {
      digits = 0;
  }
  var multiplicator = Math.pow(10, digits);
  n = parseFloat((n * multiplicator).toFixed(11));
  return (Math.round(n) / multiplicator).toFixed(2);
}


function checkUnitOfMeasure(input_unit) {
  if(['Kelvin', 'Celsius', 'Fahrenheit', 'Rankine', 'liters', 'tablespoons', 
    'cubic-inches', 'cups', 'cubic-feet', 'gallons'].indexOf(input_unit) >= 0) {
    return true;
  } else {
    return false;
  }
}


// // Update Student
// router.put('/:id', (req, res) => {
//   const found = students.some(idFilter(req));

//   if (found) {
//     students.forEach((student, i) => {
//       if (idFilter(req)(student)) {

//         const updStudent = {...student, ...req.body};
//         students[i] = updStudent
//         res.json({ msg: 'Student updated', updStudent });
//       }
//     });
//   } else {
//     res.status(400).json({ msg: `No student response with the id of ${req.params.id}` });
//   }
// });

// // Delete Student
// router.delete('/:id', (req, res) => {
//   const found = students.some(idFilter(req));

//   if (found) {
//     res.json({
//       msg: 'Student deleted',
//       students: students.filter(student => !idFilter(req)(student))
//     });
//   } else {
//     res.status(400).json({ msg: `No student response with the id of ${req.params.id}` });
//   }
// });

module.exports = router;
