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

// Create Student Response
router.post('/', (request, response) => {
  const newStudent = {
    ...request.body,
    id: uuid.v4()
  };

  if (!newStudent.input_value || !newStudent.input_unit) {
    return response.status(400).json({ msg: 'Please include a input value and unit' });
  }

  students.push(newStudent);
  // response.json(students);
  response.redirect('/');
});

// Update Student
router.put('/:id', (req, res) => {
  const found = students.some(idFilter(req));

  if (found) {
    students.forEach((student, i) => {
      if (idFilter(req)(student)) {

        const updStudent = {...student, ...req.body};
        students[i] = updStudent
        res.json({ msg: 'Student updated', updStudent });
      }
    });
  } else {
    res.status(400).json({ msg: `No student response with the id of ${req.params.id}` });
  }
});

// Delete Student
router.delete('/:id', (req, res) => {
  const found = students.some(idFilter(req));

  if (found) {
    res.json({
      msg: 'Student deleted',
      students: students.filter(student => !idFilter(req)(student))
    });
  } else {
    res.status(400).json({ msg: `No student response with the id of ${req.params.id}` });
  }
});

module.exports = router;
