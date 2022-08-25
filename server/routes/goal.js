const express=require('express');
const route=express.Router();

const controller = require('../controllers/goal')
const requiredLogin = require('../middleware/requireAuth');

route.post('/',requiredLogin, controller.createGoal);
route.get('/',requiredLogin, controller.getGoals);
// route.put('/', requiredLogin, controller.geet)

module.exports=route;