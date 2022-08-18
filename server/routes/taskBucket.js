const express=require('express');
const route=express.Router();

const controller = require('../controllers/taskBucket')
const requiredLogin = require('../middleware/requireAuth');

route.post('/task_bucket',requiredLogin, controller.createTask);
route.get('/task_bucket:id', controller.getTask);

module.exports=route;