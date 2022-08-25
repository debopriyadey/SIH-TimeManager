const { TASK_TYPE } = require('../constant.js');
const Goals = require('../models/goal');
const Users = require('../models/users');
const url = require("url")

const createGoal = async (req, res, next) => {
    const { title, description, startTime, duration  } = req.body;
    const {username, _id: creatorId} = req.user;
    if (!title || !creatorId || !username) {
        return res.status(400).json({
            message: "Please provide all required fields"
        });
    }
    const newGoal = new Goals({
        title,
        description,
        startTime,
        duration,
        creatorId,
        username,
    });

  

    try {
        const savedGoal = await newGoal.save();
        console.log("exectuing ...")
        return res.status(201).json(savedGoal);
    } catch (err) {
        next(err)
    }
}

const getGoals = async (req, res, next) => {
    const {_id: creatorId} = req.user;
    if (!creatorId) {
        return res.status(400).json({
            message: "Please provide all required fields"
        });
    }

    try {
        const savedGoal = await Goals.find({creatorId: creatorId})
        console.log("exectuing ...")
        return res.status(201).json(savedGoal);
    } catch (err) {
        next(err)
    }
}

// const updateGoals = async (req, res, next) => {
//     const { title, description, startTime, duration } = req.body;
//     const {username, _id: creatorId} = req.user;

//     if (!title || !creatorId || !username) {
//         return res.status(400).json({
//             message: "Please provide all required fields"
//         });
//     }

//     const newGoal = new Goals({
//         title,
//         description,
//         startTime,
//         duration,
//         creatorId,
//         username,
//     });

  

//     try {
//         const savedGoal = await newGoal.save();
//         console.log("exectuing ...")
//         return res.status(201).json(savedGoal);
//     } catch (err) {
//         next(err)
//     }

// }

const addTaskinGoal = 

/*
    options:
    SHARED_WITH_ME: 'shared_with_me',
    ONLY_VIEW: 'only_view',
    ONLY_EDIT: 'only_edit',
    OWNED_BY_ME: 'owned_by_me'

    req: http://url?q=all 
    res: all task which are public, shared with the user, created by user  and has access (Read/write), Read, 
    req: http://url?q=shared_with_me&only_view

*/

// const getTasks = async(req, res, next) => {
//     const { _id: userId } = req.user;
//     var queryData = url.parse(request.url, true).query;
//     queryData = queryData.q.split('&');
//     let responseData = []
    
//     try {
//          const {createdTasks: ownedByMe, sharedTasks: sharedWithMe} = (await Users.findOne({_id: userId}).populate('createdTasks').populate('sharedTasks').select('createdTasks sharedTasks').lean());
//          const publicTasks = await Tasks.find({ $or: [{canEdit: SHARING_TYPE.EVERYONE}, {canView: SHARING_TYPE.EVERYONE}]}).lean()
//          if(queryData.includes(QUERY_FILTER.ALL)) {    
//             responseData = [...ownedByMe, ...sharedWithMe, ...publicTasks]
//          } else if (queryData.includes(QUERY_FILTER.SHARED_WITH_ME)) {
//             if(queryData.includes(QUERY_FILTER.ONLY_VIEW)) {
//                 const onlyViewAccessTasks = sharedWithMe.find((task) => task.canView !== SHARING_TYPE.NO_ONE)
//                 responseData = [...onlyViewAccessTasks]
//             } else if(queryData.includes(QUERY_FILTER.ONLY_EDIT)) {
//                 const onlyEditAccessTasks = sharedWithMe.find((task) => task.canEdit !== SHARING_TYPE.NO_ONE)
//                 responseData = [...onlyEditAccessTasks]
//             }
//             responseData = [...sharedWithMe]
//          } else if(queryData.includes(QUERY_FILTER.OWNED_BY_ME)) {
//             responseData = [...ownedByMe]
//          }

//         return res.status(200).json(responseData);
//     } catch(error) {
//           next(error)
//     }

// }

// const getTaskSuggestion = async(req, res, next) => {
//     const queryData = url.parse(req.url, true).query;
//     const title = queryData.q;
//     console.log(title)
//     try {
//         const data = await Tasks.find({title: new RegExp(`^${title}`, 'i')}).select('title').lean()
//          return res.status(200).json(data);
//     } catch (error) {
//         return next(error)
//     }
// }

// const getSchedule = async(req, res, next) => {
//     const { date } = req.params;
//     const givenDate = new Date(date);
//     // find all the task which start from date start and date end.
//     const startDateTime = givenDate.setUTCHours(0,0,0,0);
//     const endDateTime = givenDate.setUTCHours(23,59,59,999);
//     console.log(startDateTime, endDateTime)
//     try {
//         const data = await Tasks.find({
//             startTime: {
//                 $gte: startDateTime,
//                 $lte: endDateTime
//             }, 
//             creatorId: req.user._id,
//             type: TASK_TYPE.SCHEDULE

//         }).lean()
//         return res.status(200).json(data);
//     } catch (error) {
//         return next(error)
//     }
// }


// const updateTask = async (req, res, next) => {
//     const { id: taskId } = req.params;
//     const { title, type, description, startTime, duration, tags, sharedWith: newUsers, canView, canEdit } = req.body;
//     const {username, _id: creatorId} = req.user;
//     if (!title ||  !description ||  !duration || !creatorId || !username) {
//         return res.status(400).json({
//             message: "Please provide all required fields"
//         });
//     }

//     try {
//         const task = await Tasks.findOne({_id: taskId})
//         const previousUsers = task.sharedWith;
//         const removedUsers =  previousUsers.filter(x => !newUsers.includes(x));
//         const addedUsers =  newUsers.filter(x => !previousUsers.includes(x));
//         const removedUsersId = removedUsers.map((x) => x._id)
//         const addedUsersId = addedUsers.map((x) => x._id)
//         await Users.updateMany({_id: {$in: addedUsersId}}, { $push: { sharedTasks: task._id } });
//         await Users.updateMany({_id: {$in:removedUsersId}}, { $pull: { sharedTasks: task._id } });
//         const newTask = await Tasks.findOneAndUpdate(taskId, {
//             title,
//             type,
//             description,
//             startTime,
//             duration,
//             tags,
//             creatorId,
//             username,
//             newUsers,
//             canView,
//             canEdit,
//         }, {new: true});

//         return res.status(200).json(newTask);
//     } catch (error) {
//         next(error)
//     }
// }

/*
task search in taskBucket, in 
req: url?q=cod&in=task_bucket/routine
res: list of all task with prefix match  
*/

module.exports = {
    createGoal,
    getGoals
}
