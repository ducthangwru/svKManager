const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const configPort = process.env.PORT || 3000;
const config = require('./config.json');
const userApi = require('./modules/api/users/usersController');
const customerApi = require('./modules/api/customers/customersController');
const groupApi = require('./modules/api/groups/groupsController');
var app = express();

app.use(bodyParser.json({ extended : true}));
app.use(bodyParser.urlencoded({ extended : true}));

app.use('/api/user', userApi);
app.use('/api/customer', customerApi);
app.use('/api/groups', groupApi);

mongoose.connect(config.connectionString, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connect to db success');
  }
})

app.listen(configPort , () => {
  console.log(`App listen on ${configPort}`);
})