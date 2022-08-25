const singleApproveNotify = async(callback) => {
    let message = {
        notification: {
            title: 'AM Registration Approved',
            body: 'Registration For Amrit Mahotsav has been accepted.',
            image: './backgroundImage/background.jpg'
        },
    }
    return callback(null, message)
}

module.exports = {
    singleApproveNotify: singleApproveNotify
}
