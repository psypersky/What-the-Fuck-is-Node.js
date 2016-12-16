const express = require('express'),
      bodyParser = require('body-parser'),
      userRoutes = require('./routes/user'),
      authRoutes = require('./routes/auth');

// app
const app = express();

// Middleware
app.use(bodyParser.json());

// Routing
app.use('/user', userRoutes);
app.use('/auth', authRoutes);

// Listen
app.listen(3000, () => console.log('listening on port 3000'));

// exports
module.exports = app;
