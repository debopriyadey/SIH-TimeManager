const Room = require("../models/room");
const errorHandler = require("../middleware/errorHandler");

const voucherCodes = require("voucher-code-generator");

exports.createRoom = async (req, res) => {
  try {
    const roomName = req.body.roomName;
    const code = voucherCodes.generate({
      length: 8,
      count: 1,
    });
    const room = await Room.create({
      roomCode: code[0],
      roomName: roomName,
      users: [req.user._id],
      rooomAdmin: req.user._id,
    });
    if (room) {
      res.status(201).json({
        roomCode: code[0],
        roomName: roomName,
      });
    } else {
      res.status(400);
      throw new Error("Room creation failed!");
    }
  } catch (err) {
    errorHandler(err, req, res);
  }
};
