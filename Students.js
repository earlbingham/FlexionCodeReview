const students = [
  {
    id: 1,
    input_value: 84.2,
    input_unit: 'Fahrenheit',
    target_unit: 'Rankine',
    response: 543.94,
    auth_answer: 543.94,
    output: 'correct'
  },
  {
    id: 2,
    input_value: 317.33,
    input_unit: 'Kelvin',
    target_unit: 'Rankine',
    response: 111.554,
    auth_answer: 112.56,
    output: 'incorrect'
  },
  {
    id: 3,
    input_value: 25.6,
    input_unit: 'cups',
    target_unit: 'liters',
    response: 6.1,
    auth_answer: 6.1,
    output: 'correct'
  }
];

module.exports = students;
