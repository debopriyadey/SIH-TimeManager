const singleIdMismatchNotify = async (callback) => {

    let message = {
        notification: {
            title: 'Document Verification Rejected.',
            body: 'Document Verification Rejected.',
            image: './backgroundImage/background.jpg'
        },
    }
    return callback(null, message)

}

const bulkIdMismatchNotify = async (callback) => {
    let message = {
        notification: {
            title: 'Document Verification Rejected.',
            body: 'Document Verification Rejected.',
            image: './backgroundImage/background.jpg'
        },
    }
    return callback(null, message)
}


module.exports = {
    singleIdMismatchNotify,
    bulkIdMismatchNotify
}