const express = require('express');
const routes = express.Router();
const mongoose = require('mongoose');
const user = require('../module/model');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const checkAuthenticated = require('./checkAuthenticated');



//Authentication Strategy
var localStrategy = require('passport-local').Strategy;
passport.use(new localStrategy({usernameField:'email'}, (email, password, done)=>{
    user.findOne({email:email}, (err, data)=>{
        if(err) throw err;
        if(!data){
            return done(null, false, {message : "User Dosen't Exists..."});
        }
        bcrypt.compare(password,data.password, (err,match)=>{
            if(err){
                return done(null, false);
            }else if(!match){
                return done(null,false, {message : "Password Dosen't Match..."});
            }else{
                return done(null, data);
            }
        });        
    });
}));


passport.serializeUser(function(user, cb){
    cb(null, user.id);
});

passport.deserializeUser(function(id, cb){
    user.findById(id, function(err, user){
        cb(err, user);
    });
});


routes.get('/',(req,res)=>{
    res.render('login');
});

routes.post('/',(req,res,next)=>{
    passport.authenticate('local',{
        successRedirect:'/dashboard',
        failureRedirect:'/login',
        failureFlash: true
    })(req,res,next);
});


module.exports = routes;