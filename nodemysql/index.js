var express = require('express'),
    app = express(),
    port = process.env.port || 3000,
    bodyParser = require('body-parser');
    controller = require('./controller');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var routes = require('./routes');
routes(app);

app.listen(port);
console.log('Restfull API dengan node js dan mysql di port: '+port);