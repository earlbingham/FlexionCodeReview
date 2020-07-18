
## Flexion Coding Challenge

The purpose of this challenge is to see what agile engineering looks like to you. We want clean, maintainable, production-quality code. Because we are focused on multiple dimensions of your code, the functional requirements are narrow and focused.

We aren’t looking for fluency with any particular language or framework. You are not limited in what language, frameworks, or libraries you may use. Common language choices are JavaScript, Python, and Java. If there are specific technologies we would like to see in your case, your technical recruiter will let you know.

After we receive your code, we will schedule a discussion with you to talk about what you did, and why.The Problem: 

Our users are science teachers who are as comfortable using the command line as they are using a browser. In their “Unit Conversion” science unit, they want to assign students unit-conversion problems on paper worksheets. After students turn in their completed worksheets, the teachers want to be able to enter the questions and student responses into a computer to be graded. Students will convert:

	* temperatures between Kelvin, Celsius, Fahrenheit, and Rankine
    
	* volumes between liters, tablespoons, cubic-inches, cups, cubic-feet, and gallons

#### Requirements:

The requirements below are not intended to suggest a particular user interface, just what data the user must provide as input and what data the system must provide as output.
	1. The teacher must be able to provide an input numerical value, an input unit of measure, a target unit of measure, and a student’s numeric response.
	2. The system indicates that the response is correct, incorrect, or invalid. To be considered correct, the student’s response must match an authoritative answer after both the student’s response and authoritative answer are rounded to the tenths place. 
	3. Optional Challenge: Implement a basic continuous integration/continuous deployment (CI/CD) pipeline for your code using your solution of choice (cloud solutions are acceptable). What you provide should support a peer code review process and seamless app deployment when a commit is merged to trunk.


#### Example scenarios (not exhaustive):

| Input Numerical Value | Input Unit of Measure | Target Unit of Measure | Student Response | Output  |
| --------------------- | --------------------- | ---------------------- | ---------------- | ------- |
| 84.2                  | Fahrenheit            | Rankine                | 543.94           | correct |
| 317.33 | Kelvin | Fahrenheit | 111.554 | incorrect |
| 25.6 | cups | liters | 6.1 | correct |
| 73.12 | gallons | Kelvin | 19.4 | invalid |
| 6.5 | Fahrenheit | Rankine | dog | incorrect | 136.1 | dog | Celsius | 45.32 | invalid |

#### Submitting your response:

We understand that you probably have a lot going on. So make sure you negotiate enough time to do what you consider to be a good job. You will not be penalized for taking the time you need. Just keep in mind that we are continuing to screen candidates for the position you are applying for.

	1. Create a private GitHub or GitLab repo that will contain your code. Share it with the GitHub/GitLab user named “FlexionCodeReview” giving that user permission to at least read your repo.
	2. Include a README.md that explains how to install (or deploy) and run (or access) your program.
	3. In your README.md, add a prioritized list of five or more development tasks you would do next to improve your solution to the code challenge.
	4. Notify your technical recruiter that you are done, and provide your repo URL.
	5. No more changes can be committed after the deadline negotiated between you and our technical recruiter.

