const responsedata = require('../responsedata')

function send(message, res) {
    utils.log(message)
    data = responsedata.getInitialData()
    data.status = false
    data.message = message
    data.responseString = JSON.stringify(data.response)
    res.status(200).send(data)
    res.end()
}
module.exports.send = send