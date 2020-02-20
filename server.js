const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const config = require('config');
const Joi = require('joi');
const express = require('express');
const app = express();
const logger = require('./middleware/logger');
const auth = require('./auth');
const helmet = require('helmet');
const morgan = require('morgan');
const Jobs = require('./routes/jobs');
const Companies = require('./routes/companies');
const home = require('./routes/home');
const Users = require('./routes/users');

//Configuration
console.log('Application Name :' + config.get('name'));
console.log('Mail Server Name :' + config.get('mail.host'));
console.log('Mail password Name :' + config.get('mail.password'));


if(app.get('env')==='development'){
  app.use(morgan('tiny'));
  startupDebugger('Morgan enabled...')
}

// Db debugger
dbDebugger('Connected to the database')

//Templating Engine
app.set('view engine','pug');
app.set('views','./views')

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(logger);
app.use(auth);
app.use(helmet());
app.use('/api/jobs',Jobs)
app.use('/',home)
app.use('/api/companies',Companies)
app.use('/api/users',Users)



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
