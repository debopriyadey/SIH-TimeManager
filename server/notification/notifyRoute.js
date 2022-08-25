const login = require("../models/login");
const Login = login.getSchema();
const { singleApproveNotify } = require("./notifyApprove");
const { singleIdMismatchNotify, bulkIdMismatchNotify } = require("./notifyIdMismatch");
const { singleRejectionNotify, bulkRejectionNotify } = require("./notifyRejection");
const { remainderNotify } = require("./notifyRemainder");
const { venueUpdateNotify } = require("./notifyVenueUpdate");
const NOTIFICATION_ENUM  = require("./notificationEnum");

const notifyRouteSingle = async (userId, notifyType, callback) => {
    Login.find({userId: userId }, (error, findResponse) => {
        if (error) {
            return callback(error, null)
        }
        if ( !findResponse.length ) {
            return callback("Invalid UserId", null)
        }
        let deviceTokenArray = [];
        findResponse.forEach(item => {
            deviceTokenArray.push(item.deviceToken)
        });
        switch (notifyType) {
            case NOTIFICATION_ENUM.APPROVE_NOTIFICATION_SINGLE:
                try {
                    singleApproveNotify((notificationError, notificationData) => {
                        if (notificationError) {
                            callback(notificationError, null);
                        }
                        notificationData['tokens'] = deviceTokenArray;
                        return callback(null, notificationData);
                    })
                } catch (catchError) {
                    return callback(catchError, null);
                }
                break;

            case NOTIFICATION_ENUM.REJECT_NOTIFICATION_SINGLE:
                try {
                    singleRejectionNotify(userId, (notificationError, notificationData) => {
                        if (notificationError) {
                            callback(notificationError, null)
                        }
                        notificationData['token'] = deviceTokenArray
                        return callback(null, notificationData)
                    })
                } catch (catchError) {
                    return callback(catchError, null);
                }
                break;

            case NOTIFICATION_ENUM.ID_MISMATCH_NOTIFICATION_SINGLE:
                try {
                    singleIdMismatchNotify((notificationError, notificationData) => {
                        if (notificationError) {
                            callback(notificationError, null)
                        }
                        notificationData['token'] = deviceTokenArray
                        return callback(null, notificationData)
                    })
                } catch (catchError) {
                    return callback(catchError, null);
                }
                break;

            default:
                return callback("Notification type mismatch", null);
        }
    })
}

const notifyRouteBulk = async (userId, notifyType, callback) => {
    let deviceTokenArray = [];
    if( !Array.isArray(userId)){
        return callback("INVALID TYPE OF PARAMETER PASSED.", null)
    }
    Login.find({ userId: { "$in" : userId}}, (error, response) => {
        if (error) {
            return callback(error, null)
        }
        if( !response.length ){
            return callback('NO USER FOUND.', null)
        }
        response.forEach(item => {
            deviceTokenArray.push(item.deviceToken)
        });
        switch (notifyType) {
            case NOTIFICATION_ENUM.REJECT_NOTIFICATION_BULK:
                try {
                    bulkRejectionNotify((notificationError, notificationData) => {
                        if (notificationError) {
                            callback(notificationError, null)
                        }
                        notificationData['token'] = deviceTokenArray
                        return callback(null, notificationData)
                    })
                } catch (catchError) {
                    return callback(catchError, null);
                }
                break;
    
            case NOTIFICATION_ENUM.ID_MISMATCH_NOTIFICATION_BULK:
                try {
                    bulkIdMismatchNotify((notificationError, notificationData) => {
                        if (notificationError) {
                            callback(notificationError, null)
                        }
                        notificationData['token'] = deviceTokenArray
                        return callback(null, notificationData)
                    })
                } catch (catchError) {
                    return callback(catchError, null);
                }
                break;

            case NOTIFICATION_ENUM.VENUE_UPDATE_NOTIFICATION_BULK:
                try {
                    venueUpdateNotify((notificationError, notificationData) => {
                        if (notificationError) {
                            callback(notificationError, null)
                        }
                        notificationData['token'] = deviceTokenArray
                        return callback(null, notificationData)
                    })
                } catch (catchError) {
                    return callback(catchError, null);
                }
                break;

            case NOTIFICATION_ENUM.REMINDER_NOTIFICATION_BULK:
                try {
                    remainderNotify((notificationError, notificationData) => {
                        if (notificationError) {
                            callback(notificationError, null)
                        }
                        notificationData['token'] = deviceTokenArray
                        return callback(null, notificationData)
                    })
                } catch (catchError) {
                    return callback(catchError, null);
                }
                break;

        }
    })
}

module.exports ={
    notifyRouteSingle:notifyRouteSingle,
    notifyRouteBulk:notifyRouteBulk
};