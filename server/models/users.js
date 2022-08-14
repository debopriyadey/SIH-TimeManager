const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
    },
    password: {
        type: String,
        require: true
    },
    type: {
        type: String,
        require: true
    },
    token: {
        type: String, 
        default: ""
    },
    childs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    restricted: {}
});

const Users = mongoose.model('Users', userSchema);

module.exports = Users;

