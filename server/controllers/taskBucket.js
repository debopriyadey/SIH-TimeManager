const { TASK_TYPE } = require('../constant.js');
const Tasks = require('../models/task.js');
const Users = require('../models/users');

const createTask = async (req, res) => {
    const { title, type, description, startTime, duration, tags, sharedWith, canView, canEdit } = req.body;
    const {username, _id: creatorId} = req.user;
    if (!title || !type || !description || !startTime || !duration || !tags || !creatorId || !username) {
        return res.status(400).json({
            message: "Please provide all required fields"
        });
    }
    const newTask = new Tasks({
        title,
        type,
        description,
        startTime,
        duration,
        tags,
        creatorId,
        username,
        sharedWith,
        canView,
        canEdit,
    });
    // if can view true then only can edit others tasks

    // code with error handling
    // if('canView' in req.body) {
    //   if (req.body.canView) {
    //       resBody['canView'] = req.body.canView;

    //       if (req.body.canView === 'everyone' || req.body.canView === 'onlywith') {
    //         if ('canEdit' in req.body) {
    //             if (req.canEdit) {
    //                 resBody['canEdit'] = req.body.canEdit;
    //             }
    //         }
    //       }
    //   }
    // }

    try {
        const savedTask = await newTask.save();
        await Users.updateMany({_id: { $in: [sharedWith]}}, { $push: { sharedTasks: savedTask._id } });
        await findOneAndUpdate({ _id: creatorId}, { $push: { createdTasks: savedTask._id } })
        return res.status(201).json(savedTask);
    } catch (err) {
        console.log(err.message)
        next(err)
    }
}

const getTasks = async() => {
    const { _id: userId } = req.user;
    var queryData = url.parse(request.url, true).query;
    queryData = queryData.q.split('&');
    let responseData = []
    
    try {
         const {createdTasks: ownedByMe, sharedTasks: sharedWithMe} = (await Users.findOne({_id: userId}).populate('createdTasks').populate('sharedTasks').select('createdTasks sharedTasks').lean());
         const publicTasks = await Tasks.find({ $or: [{canEdit: SHARING_TYPE.EVERYONE}, {canView: SHARING_TYPE.EVERYONE}]}).lean()
         if(queryData.includes(QUERY_FILTER.ALL)) {    
            responseData = [...ownedByMe, ...sharedWithMe, ...publicTasks]
         } else if (queryData.includes(QUERY_FILTER.SHARED_WITH_ME)) {
            if(queryData.includes(QUERY_FILTER.ONLY_VIEW)) {
                const onlyViewAccessTasks = sharedWithMe.find((task) => task.canView !== SHARING_TYPE.NO_ONE)
                responseData = [...onlyViewAccessTasks]
            } else if(queryData.includes(QUERY_FILTER.ONLY_EDIT)) {
                const onlyEditAccessTasks = sharedWithMe.find((task) => task.canEdit !== SHARING_TYPE.NO_ONE)
                responseData = [...onlyEditAccessTasks]
            }
            responseData = [...sharedWithMe]
         } else if(queryData.includes(QUERY_FILTER.OWNED_BY_ME)) {
            responseData = [...ownedByMe]
         }

        return res.status(200).json(responseData);
    } catch(error) {
          next(error)
    }

}


const updateTask = async (req, res) => {
    const { id: taskId } = req.params;
    const { title, type, description, startTime, duration, tags, sharedWith: newUsers, canView, canEdit } = req.body;
    const {username, _id: creatorId} = req.user;
    if (!title || !type || !description || !startTime || !duration || !tags || !creatorId || !username) {
        return res.status(400).json({
            message: "Please provide all required fields"
        });
    }

    try {
        const task = await Tasks.findOne({_id: taskId})
        const previousUsers = task.sharedWith;
        const removedUsers = previousUsers.filter(x => !newUsers.includes(x));
        const addedUsers =  newUsers.filter(x => !previousUsers.includes(x));
        await Users.updateMany({_id: addedUsers}, { $push: { sharedTasks: task._id } });
        await Users.updateMany({_id: removedUsers}, { $pull: { sharedTasks: task._id } });
        return res.status(200).json(task);
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createTask,
    getTask,
    updateTask
}
