const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const app = express();
const session = require('express-session');
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({
    secret: 'someCrazySecret@123',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 3600000
    }
}));

require('./routes/post_routes')(app);
require('./routes/get_routes')(app);

app.listen(PORT, function () {
    console.log(`Listening on port ${PORT}`);
}); 