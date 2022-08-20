const express=require('express');
const route=express.Router();

const controller = require('../controllers/taskBucket')
const requiredLogin = require('../middleware/requireAuth');

route.post('/',requiredLogin, controller.createTask);
route.put('/:id', requiredLogin, controller.updateTask)
// route.get('/search', requiredLogin, controller.getTask);
route.get('/taskSearch', controller.getTaskSuggestion);

module.exports=route;