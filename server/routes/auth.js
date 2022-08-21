const express=require('express');
const route=express.Router();

const controller = require('../controllers/auth')
const requiredLogin = require('../middleware/requireAuth');

route.get('/user/:id', controller.getUserById);
route.post('/signin',requiredLogin, controller.signin);
route.post('/signup', controller.signup);
route.get('/userInfo',requiredLogin , controller.getLoggedInUserInfo);
route.post('/signout', controller.logout);
route.get('/usernameExist/:username', controller.isUsernameExist)
route.post('/addChild', requiredLogin, controller.addChild);
route.get('/childs', requiredLogin,controller.getChilds);
route.put('/child', requiredLogin,controller.updateChild);
route.get('/user/rooms/:id', requiredLogin, controller.getRooms);
route.get('/userSearch',controller.getUserSuggestion);


module.exports=route;