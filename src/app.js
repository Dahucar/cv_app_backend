const express   = require('express');
const cors      = require('cors');
require('dotenv').config(); 
const app       = express();

// import routes
const userRouter    = require('./routes/user.routes');
const resumeRouter  = require('./routes/resume.routes');

// server varible
app.set('port', process.env.PORT );

// middlewares
app.use( cors() );
app.use( express.json() );

// rutes
app.use('/api/dahucar', userRouter);
app.use('/api/dahucar', resumeRouter);

module.exports = app;