const mongoose = require('mongoose');
const express = require('express');
const jobs = require('./routes/jobs');
const companies = require('./routes/companies');
const users = require('./routes/users');
const app = express();

mongoose.connect('mongodb://localhost/vidly')
  .then(() => console.log('Connected to MongoDB'))
  .catch(e => console.error('Could not connect to MongoDB..'))


app.use(express.json());
app.use('/api/jobs',jobs);
app.use('/api/companies',companies);
app.use('/api/users',users);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));