const express=require('express');
const route=express.Router();

const controller = require('../controllers/auth')
const requiredLogin = require('../middleware/requireAuth');

route.get('/user/:id', controller.getUserById);
route.post('/signin', controller.signin);
route.post('/signup', controller.signup);
route.post('/userInfo',requiredLogin , controller.getLoggedInUserInfo);
route.post('/logout', controller.logout);

module.exports=route;