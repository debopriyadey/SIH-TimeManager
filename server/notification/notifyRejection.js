const EventsModel = require("../models/eventsModel/eventsModel");

const singleRejectionNotify = async (userId, callback) => {
    let participantModel = EventsModel.AmritParticipant;
    participantModel.find({ userId: userId }, (error, response) => {
        if (error) {
            return callback(error, null)
        }
        if (response.length > 0) {
            let user_rejected = (response[0].toObject()).isRejected
            if ( user_rejected == true ) {
                let reject_comment = (response[0].toObject()).rejectComment
                let message = {
                    notification: {
                        title: 'AM Registration Rejected',
                        body: reject_comment,
                        image: './backgroundImage/background.jpg'
                    },
                }
                return callback(null, message)
            }
            return callback('User is not currently rejected', null)
        } 
        return callback('No data found', null)
    })
}

const bulkRejectionNotify = async (callback) => {
    let message = {
        notification: {
            title: 'server test',
            body: 'sending message from server',
            image: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/df/2016_Summer_Olympics_logo.svg/300px-2016_Summer_Olympics_logo.svg.png'
        },
    }
    return callback(null, message)
}


module.exports = {
    singleRejectionNotify,
    bulkRejectionNotify
}