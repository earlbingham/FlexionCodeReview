const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const students = require('../../Students');
const fs = require('fs');

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

  if (!newStudent.input_value || !newStudent.input_unit || !newStudent.target_unit ||
    !newStudent.response) {
    return response.status(400).json({ msg: 'Please include a input value, unit of measure, target unit of measure, and Student Response' });
  }

  // Validate student response and update output
  validateStudentResponse(newStudent);

  students.push(newStudent);
  let data = JSON.stringify(students, null, 2);
  fs.writeFileSync('student-2.json', data);
  response.redirect('/');
});

// Create Student Response for command line
router.post('/cli', (request, response) => {
  const newStudent = {
    ...request.body,
    id: uuid.v4()
  };

  if (!newStudent.input_value || !newStudent.input_unit || !newStudent.target_unit ||
    !newStudent.response) {
    return response.status(400).json({ msg: 'Please include a input value, unit of measure, target unit of measure, and Student Response' });
  }

  // Validate student response and update auth_answer and output
  validateStudentResponse(newStudent);

  students.push(newStudent);
  let data = JSON.stringify(students, null, 2);
  fs.writeFileSync('student-2.json', data);
  response.json(newStudent);
});

// Validate student response and update auth_answer and output
function validateStudentResponse (newStudent) {

  // Validate input unit of measure
  if(!checkUnitOfMeasure(newStudent.input_unit, newStudent.target_unit)) {
    newStudent.output = 'invalid';
  } else {
    // Check if auth_answer was provided, if not then generate auth_answer
    if(Object.keys(newStudent.auth_answer).length === 0) {
        generateAuthAnswer(newStudent);
    }

    // To be considered correct, the student’s response must match an authoritative 
    // answer after both the student’s response and authoritative answer are rounded 
    // to the tenths place. For example, rounding 0.843 to the nearest tenth would give 0.8.
    const studentResponse = roundTo(parseFloat(newStudent.response), 1);
    const authoritativeAnswer = roundTo(parseFloat(newStudent.auth_answer), 1);
    if(studentResponse !== authoritativeAnswer) {
      newStudent.output = 'incorrect';
    } else {
      newStudent.output = 'correct';
    }
  }
}

// If teacher has not provided auth_answer, then generate
function generateAuthAnswer(newStudent) {
  if(newStudent.input_unit == 'Fahrenheit' && newStudent.target_unit== 'Celsius') {
    newStudent.auth_answer = (newStudent.input_value - 32) * 5 / 9;
  } else if(newStudent.input_unit == 'Fahrenheit' && newStudent.target_unit== 'Kelvin') {
    newStudent.auth_answer = ((newStudent.input_value-32)/1.8) + 273.15;
  } else if(newStudent.input_unit == 'Fahrenheit' && newStudent.target_unit== 'Rankine') {
    newStudent.auth_answer = newStudent.input_value + 459.67;
  } else if(newStudent.input_unit == 'Celsius' && newStudent.target_unit== 'Fahrenheit') {
    newStudent.auth_answer = (newStudent.input_value * 9 / 5) + 32;
  } else if(newStudent.input_unit == 'Celsius' && newStudent.target_unit== 'Kelvin') {
    newStudent.auth_answer = newStudent.input_value + 273.15;
  } else if(newStudent.input_unit == 'Celsius' && newStudent.target_unit== 'Rankine') {
    newStudent.auth_answer = (newStudent.input_value * 9 / 5) + 491.67;
  } else if(newStudent.input_unit == 'Kelvin' && newStudent.target_unit== 'Celsius') {
    newStudent.auth_answer = newStudent.input_value - 273.15;
  } else if(newStudent.input_unit == 'Kelvin' && newStudent.target_unit== 'Fahrenheit') {
    newStudent.auth_answer = ((newStudent.input_value - 273.15) * 1.8) + 32;
  } else if(newStudent.input_unit == 'Kelvin' && newStudent.target_unit== 'Rankine') {
    newStudent.auth_answer = (newStudent.input_value * 9/5);
  } else if(newStudent.input_unit == 'Rankine' && newStudent.target_unit== 'Celsius') {
    newStudent.auth_answer = (newStudent.input_value - 491.67) * 5/9;
  } else if(newStudent.input_unit == 'Rankine' && newStudent.target_unit== 'Fahrenheit') {
    newStudent.auth_answer = newStudent.input_value - 459.67;
  } else if(newStudent.input_unit == 'Rankine' && newStudent.target_unit== 'Kelvin') {
    newStudent.auth_answer = (newStudent.input_value * 5/9);
  } 
  
  else if(newStudent.input_unit == 'liters' && newStudent.target_unit== 'tablespoons') {
    newStudent.auth_answer = (newStudent.input_value * 67.628);
  } else if(newStudent.input_unit == 'liters' && newStudent.target_unit== 'cubic-inches') {
    newStudent.auth_answer = (newStudent.input_value * 61.024);
  } else if(newStudent.input_unit == 'liters' && newStudent.target_unit== 'cups') {
    newStudent.auth_answer = (newStudent.input_value * 4.227);
  } else if(newStudent.input_unit == 'liters' && newStudent.target_unit== 'cubic-feet') {
    newStudent.auth_answer = (newStudent.input_value / 28.317);
  } else if(newStudent.input_unit == 'liters' && newStudent.target_unit== 'gallons') {
    newStudent.auth_answer = (newStudent.input_value / 3.785);
  } else if(newStudent.input_unit == 'tablespoons' && newStudent.target_unit== 'liters') {
    newStudent.auth_answer = (newStudent.input_value / 67.628);
  } else if(newStudent.input_unit == 'tablespoons' && newStudent.target_unit== 'cubic-inches') {
    newStudent.auth_answer = (newStudent.input_value / 1.108);
  } else if(newStudent.input_unit == 'tablespoons' && newStudent.target_unit== 'cups') {
    newStudent.auth_answer = (newStudent.input_value / 16);
  } else if(newStudent.input_unit == 'tablespoons' && newStudent.target_unit== 'cubic-feet') {
    newStudent.auth_answer = (newStudent.input_value / 1915);
  } else if(newStudent.input_unit == 'tablespoons' && newStudent.target_unit== 'gallons') {
    newStudent.auth_answer = (newStudent.input_value / 256);
  } else if(newStudent.input_unit == 'cubic-inches' && newStudent.target_unit== 'liters') {
    newStudent.auth_answer = (newStudent.input_value / 61.024);
  } else if(newStudent.input_unit == 'cubic-inches' && newStudent.target_unit== 'tablespoons') {
    newStudent.auth_answer = (newStudent.input_value * 1.108);
  } else if(newStudent.input_unit == 'cubic-inches' && newStudent.target_unit== 'cups') {
    newStudent.auth_answer = (newStudent.input_value / 14.438);
  } else if(newStudent.input_unit == 'cubic-inches' && newStudent.target_unit== 'cubic-feet') {
    newStudent.auth_answer = (newStudent.input_value / 1728);
  } else if(newStudent.input_unit == 'cubic-inches' && newStudent.target_unit== 'gallons') {
    newStudent.auth_answer = (newStudent.input_value / 231);
  } else if(newStudent.input_unit == 'cups' && newStudent.target_unit== 'liters') {
    newStudent.auth_answer = (newStudent.input_value / 4.227);
  } else if(newStudent.input_unit == 'cups' && newStudent.target_unit== 'tablespoons') {
    newStudent.auth_answer = (newStudent.input_value * 16);
  } else if(newStudent.input_unit == 'cups' && newStudent.target_unit== 'cubic-inches') {
    newStudent.auth_answer = (newStudent.input_value * 14.438);
  } else if(newStudent.input_unit == 'cups' && newStudent.target_unit== 'cubic-feet') {
    newStudent.auth_answer = (newStudent.input_value / 120);
  } else if(newStudent.input_unit == 'cups' && newStudent.target_unit== 'gallons') {
    newStudent.auth_answer = (newStudent.input_value / 16);
  } else if(newStudent.input_unit == 'cubic-feet' && newStudent.target_unit== 'liters') {
    newStudent.auth_answer = (newStudent.input_value * 28.317);
  } else if(newStudent.input_unit == 'cubic-feet' && newStudent.target_unit== 'tablespoons') {
    newStudent.auth_answer = (newStudent.input_value * 1915);
  } else if(newStudent.input_unit == 'cubic-feet' && newStudent.target_unit== 'cups') {
    newStudent.auth_answer = (newStudent.input_value * 120);
  } else if(newStudent.input_unit == 'cubic-feet' && newStudent.target_unit== 'cubic-inches') {
    newStudent.auth_answer = (newStudent.input_value * 1728);
  } else if(newStudent.input_unit == 'cubic-feet' && newStudent.target_unit== 'gallons') {
    newStudent.auth_answer = (newStudent.input_value * 7.481);
  } else if(newStudent.input_unit == 'gallons' && newStudent.target_unit== 'liters') {
    newStudent.auth_answer = (newStudent.input_value * 3.785);
  } else if(newStudent.input_unit == 'gallons' && newStudent.target_unit== 'tablespoons') {
    newStudent.auth_answer = (newStudent.input_value * 256);
  } else if(newStudent.input_unit == 'gallons' && newStudent.target_unit== 'cubic-inches') {
    newStudent.auth_answer = (newStudent.input_value * 231);
  } else if(newStudent.input_unit == 'gallons' && newStudent.target_unit== 'cups') {
    newStudent.auth_answer = (newStudent.input_value * 16);
  } else if(newStudent.input_unit == 'gallons' && newStudent.target_unit== 'cubic-feet') {
    newStudent.auth_answer = (newStudent.input_value / 7.481);
  } 
  newStudent.auth_answer = roundTo(parseFloat(newStudent.auth_answer), 1);
}

// Make sure float number is rounded to tenths digit
// For example, rounding 0.843 to the nearest tenth would give 0.8.
function roundTo (n, digits) {
  if (digits === undefined) {
      digits = 0;
  }
  var multiplicator = Math.pow(10, digits);
  n = parseFloat((n * multiplicator).toFixed(11));
  return (Math.round(n) / multiplicator).toFixed(1);
}

// Check if inputUnit is actually in the list of expected units of measure
// Check if inputUnit and targetUnit are in both a temperature or both a volume
function checkUnitOfMeasure (inputUnit, targetUnit) {
  if (['Kelvin', 'Celsius', 'Fahrenheit', 'Rankine', 'liters', 'tablespoons', 
    'cubic-inches', 'cups', 'cubic-feet', 'gallons'].indexOf(inputUnit) >= 0) {
      if(['Kelvin', 'Celsius', 'Fahrenheit', 'Rankine'].indexOf(inputUnit) >= 0) {
        if(['Kelvin', 'Celsius', 'Fahrenheit', 'Rankine'].indexOf(targetUnit) >= 0) {
          return true;
        } else {
          return false;
        }
      }
      if(['liters', 'tablespoons', 'cubic-inches', 'cups', 'cubic-feet', 'gallons'].indexOf(inputUnit) >= 0) {
        if(['liters', 'tablespoons', 'cubic-inches', 'cups', 'cubic-feet', 'gallons'].indexOf(targetUnit) >= 0) {
          return true;
        } else {
          return false;
        }
      }
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
