const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    token: {
        type: String, 
        default: ""
    }
});

const Users = mongoose.model('Users', userSchema);

module.exports = Users;