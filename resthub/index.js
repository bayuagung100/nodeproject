//import express
let express = require('express');

//import routes
let apiRoutes = require('./api-routes');

//initialize app
let app = express();

//setup server
var port = process.env.port || 8080;

//send message for default url
app.get('/', (req, res) => res.send('Hello world with express and nodemon'));

//app apiRoutes
app.use('/api', apiRoutes);

//launch app to listen specified port
app.listen(port, function() {
    console.log("Running resthub on port " + port);
})