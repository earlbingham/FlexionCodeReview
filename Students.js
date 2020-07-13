const fs = require('fs');
const students = [];
fs.readFile('student-2.json', (err, data) => {
  if (err) throw err;
   studentArray = JSON.parse(data);
   studentArray.forEach(addToConstant);

   function addToConstant (student) {
     students.push(student);
   }
   // console.log(students);
});

module.exports = students;
