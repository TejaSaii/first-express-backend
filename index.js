const express = require('express');

const app = express();
const port = 3000;
const { v4: uuidv4 } = require('uuid');

const USERS = [
  { email: 'tejas@gmail.com', password: 'pass' },
  { email: 'dummy', password: 'dummy' },
];

const QUESTIONS = [
  {
    id: 1,
    title: 'Maximum value from an array',
    description: 'Find the maximum value from the given array',
    testcases: {
      input: [1, 2, 3, 4, 5],
      output: 5,
    },
  },
  {
    id: 2,
    title: 'two states',
    description: 'Find the minimum value from the given array',
    testcases: {
      input: [1, 2, 3, 4, 5],
      output: 1,
    },
  },
];

const SUBMISSION = [
  {
    prid: 1,
    result: false,
  },
];

app.use(express.json());

app.post('/signup', (req, res) => {
  // Add logic to decode body
  // body should have email and password
  const jsonData = req.body;

  // Store email and password (as is for now) in the USERS array above
  // (only if the user with the given email doesnt exist)
  const { email } = jsonData;

  if (!USERS.some((obj) => obj.email === email)) {
    console.log('inside if');
    USERS.push(jsonData);
    res.status(200).send('Success');
    USERS.forEach((element) => console.log(element));
  } else {
    console.log('inside else');
    res.status(400).send('Your data already exists please Login');
    USERS.forEach((element) => console.log(element));
  }

  // return back 200 status code to the client
});

app.post('/login', (req, res) => {
  const jsonData = req.body;
  if (USERS.some((obj) => obj.email === jsonData.email
        && obj.password === jsonData.password)) {
    res.status(200).json({ token: uuidv4() });
  } else res.status(400).send('Incorrect credentials, please try again.');
});

app.get('/questions', (req, res) => {
  res.status(200).send(QUESTIONS);
});

app.get('/submissions', (req, res) => {
  const jsonData = req.body;
  if (SUBMISSION.some((obj) => obj.prid === jsonData.id)) {
    const submissionList = SUBMISSION.filter((obj) => obj.prid === jsonData.id);
    res.status(200).send(submissionList);
  } else res.status(200).send('No submissions for this problem yet');
});

app.post('/submissions', (req, res) => {
  const jsonData = req.body;
  if (!isNaN(jsonData.prid)) {
    const result = Math.random() > 0.5;
    const tempSubmission = {
      prid: jsonData.prid,
      code: jsonData.code,
      language: jsonData.language,
      result,
    };
    SUBMISSION.push(tempSubmission);
    res.status(200).send(tempSubmission);
    // to check submissions are added successfully
    SUBMISSION.forEach((obj) => console.log(obj));
  } else res.status(400).send('Invalid problem, please provide correct problem id');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
