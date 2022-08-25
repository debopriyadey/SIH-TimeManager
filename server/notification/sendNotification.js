const firebase_admin = require('firebase-admin'); // change to firebaseadmin
const mongoose = require("mongoose");
const { notifyRouteSingle, notifyRouteBulk } = require('./notifyRoute');

class sendNotification {
    notifySingle(userId, notifyType, callback) {
        try {
            notifyRouteSingle(userId, notifyType, (error, payload) => {
                if (error) {
                    return callback(error, null)
                }
                const messaging = firebase_admin.messaging();
                messaging.sendMulticast(payload)
                    .then((response) => {
                        return callback(null, response)
                    })
                    .catch((catchError) => {
                        return callback(catchError, null)
                    });
            })
        } catch (error) {
            return callback(error, null)
        }
    }
    
    notifyBulk(notifyType, callback) {
        try {
            notifyRouteBulk(notifyType, (error, payload) => {
                if (error) {
                    return callback(error, null)
                }
                firebase_admin.messaging().send(payload)
                    .then((response) => {
                        return callback(null, response)
                    })
                    .catch((catchError) => {
                        return callback(catchError, null)
                    });
            })
        } catch (error) {
            return callback(error, null)
        }
    }

}

module.exports = {
    sendNotification:sendNotification
};