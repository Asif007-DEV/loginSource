const express = require('express');
const routes = express.Router();
const mongoose = require('mongoose');
const checkAuthenticated = require('./checkAuthenticated');

routes.get('/',checkAuthenticated,(req,res)=>{
    res.render('jion',{user:req.user});
});

module.exports = routes;