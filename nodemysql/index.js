var express = require('express'),
    app = express(),
    port = process.env.port || 4000,
    bodyParser = require('body-parser'),
    session = require('express-session');


app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./routes');
routes(app);

app.listen(port);
console.log('Restfull API dengan node js dan mysql di port: ' + port);