# Flexion Coding Challenge

#### Installation Steps

```sh
# Install NodeJS, NPM and Curl

This website has links to download and install on various operating systems
https://www.npmjs.com/get-npm

# Install NodeJS Packages This Project Depends On

npm install

# Install curl command line tool to be used for REST API test scripts

http://curl.haxx.se/download.html

# Install JS stress test tool artillery that simulates number of users

npm install -g artillery

```

#### Steps on Running The Application

```sh
# Run this command from within the FlexionCodeReview directory
node index.js

# This will start up the NodeJS server, then you can go to the following URL on your system to see the web
# form that teachers can use to submit Students Unit Conversion responses

http://localhost:3000

# Otherwise, if a teacher wants to use the application on the command line, they can use the scripts provided
# in the FlexionCodeReview/tests directory

tests/addStudentResponseCorrect - Createa a new student response that will have correct output value

tests/correct/ - Test scripts to test a student response that will have correct output value

tests/incorrect/ - Test scripts to test a student response that will have incorrect output value

tests/invalid/ - Test scripts to test a student response that will have invalid output value

tests/getStudentResponses - Provide a list of current student responses stored in the application

tests/runStress - Simulates 20 new virtual users interacting with REST APIs every 60 seconds

```

#### Prioritized list of development tasks I would like to do next to improve my solution to the code challenge

1. Get the AWS CodePipline I have setup with this GitHub repo working. I've started the setup, but currently have an issue I need to debug to get it fully working.
2. Add login page to ensure only teachers have access to the application.
3. Improve usability of the UI to allow for student responses to be grouped by student, and grouped by teachers.
4. Break up the REST API server and the front end website so they can be conainerized and deployed as seperate services.
5. Store student and teacher data in a database to support large amount of student responses.
6. Add automated regression test framework for CI/CD Pipeline
7. Add more stress tests for insertion and deletion of student responses


