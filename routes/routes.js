const express = require('express');
const routes = express.Router();
const mongoose = require('mongoose');
const user = require('../module/model');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const checkAuthenticated = require('./checkAuthenticated');

routes.get('/',(req,res)=>{
    res.render('index');
});
routes.post('/register',(req,res)=>{
    var  {username, email, password, confpassword} = req.body;
    var err;
    if(!username || !email || !password || !confpassword){
        err = 'Please Fill All The Fields'
        res.render('index',{err:err});
    }else if(password.length < 5){
        err = 'Password too short';
        res.render('index',{err:err,username:username,email:email});
    }else if(password != confpassword){
        err = "Password Don't Match"
        res.render('index',{err:err, username:username,email:email});
    }else{
        user.findOne({email:email},(err,data)=>{
            if(err) throw err;
            if(data){
                err = 'This Email Already Exists'
                res.render('index',{err:err, username:username,email:email});
            }else{
                bcrypt.genSalt(10,(err,salt)=>{
                    if(err) throw err;
                    bcrypt.hash(password,salt,(err,hash)=>{
                        if(err) throw err;
                        password = hash;
                        user({
                            username,
                            email,
                            password
                        }).save((err,data)=>{
                            if(err) throw err;
                            req.flash('success_massage', 'Registered Successfully... Login to Continue')
                            res.redirect('login');
                        });
                    });
                });
            }
        })
    }
});


routes.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('/login');
});

module.exports = routes;