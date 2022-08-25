const venueUpdateNotify = async (callback) => {
    let message = {
        notification: {
            title: 'Approved',
            body: 'sending message from server',
            image: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/df/2016_Summer_Olympics_logo.svg/300px-2016_Summer_Olympics_logo.svg.png'
        },
    }
    return callback(null, message)
}

module.exports = {
    venueUpdateNotify
}
