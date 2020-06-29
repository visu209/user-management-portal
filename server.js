//Install express server
const express = require('express');
const path = require('path');
var cors = require('cors');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/user-management-portal'));
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
   next();
  });
app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/user-management-portal/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);