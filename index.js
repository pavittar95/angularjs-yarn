'use strict';
const compression = require('compression');
const express = require('express');
const morgan = require('morgan');

const morganFormat = '(STATUS~:status) ":method :url HTTP/:http-version" (REM_ADDR~:remote-addr) (RES_TIME~:response-time[3]) (REM_USER~:remote-user) (RES_CON_LENGTH~:res[content-length]) (REFERRER~:referrer) (USER_AGENT~:user-agent)';

//Start Express App
const app = express();

//Default ENV: production
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const port = process.env.PORT || 8090;

//Logging
app.use(morgan(morganFormat));

//Compression
app.use(compression({
  filter: function() {
    return true;
  }
}));

//Serve static assets
app.use(express.static(__dirname + '/dist'));

//Serve static node_modules
app.use('/node_modules', express.static(__dirname + '/node_modules'));

//Serve index for all other requests
function sendIndex(req, res, next) {
  console.log('(NODE_ENV~' + process.env.NODE_ENV.toUpperCase() + ') : ' + JSON.stringify(req.headers));
  res.sendFile('index.html', {
    root: __dirname + "/dist/"
  });
}

app.all('*', sendIndex);

console.log(`MAW running on port ${port}`);

app.listen(port);
