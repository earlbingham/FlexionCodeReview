const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const students = require('./Students');

const app = express();

// Handlebars Middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Main Route
app.get('/', (req, res) =>
  res.render('index', {
    title: 'Unit Conversion Science Application',
    students
  })
);

// Folder for CSS
app.use(express.static(path.join(__dirname, 'public')));

// Students API Routes
app.use('/api/students', require('./routes/api/students'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
