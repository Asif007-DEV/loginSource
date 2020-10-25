const express = require('express');
const app = express();
const path = require('path');
const routes = require('./routes/routes.js');
const addmsgjs = require('./routes/addmsgjs');
const successjs =require('./routes/successjs');
const loginjs =require('./routes/loginjs');
const jion = require('./routes/jion');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');


app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true}));

app.use(cookieParser('secret'));
app.use(session({
    secret : 'secret',
    maxAge : 3600000,
    resave : true,
    saveUninitialized : true
}));

app.use(passport.initialize());
app.use(passport.session());

//After cookie-parser and session we use flash
app.use(flash());
app.use(function(req, res, next){
    res.locals.success_massage = req.flash('success_massage');
    res.locals.error_massage = req.flash('error_massage');
    res.locals.error = req.flash('error');
    next();
});





app.use('/',routes);
app.use('/success',successjs);
app.use('/addmsg',addmsgjs);
app.use('/login',loginjs);
app.use('/jion', jion);

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>console.log('Server runing on port ',PORT));