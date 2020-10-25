const express = require('express');
const routes = express.Router();
const mongoose = require('mongoose');
const user = require('../module/model');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const checkAuthenticated = require('./checkAuthenticated');

routes.post('/', checkAuthenticated ,(req,res)=>{
    user.findOneAndUpdate(
        {email : req.user.email},
        { $push : {
            msg : req.body['msg']
        }},(err, suc)=>{
            if(err) throw err;
            if(suc) console.log('Add message Successfully....');
        }
    );
    res.redirect('success');
});
module.exports = routes;