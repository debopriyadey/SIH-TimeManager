const Room = require("../models/room");
const errorHandler = require("../middleware/errorHandler");

const voucherCodes = require("voucher-code-generator");

exports.createRoom = async (req, res) => {
  try {
    const roomName = req.body.roomName;
    console.log(roomName);

    const errors = [];

    !roomName && errors.push("roomName is required");

    if (errors.length > 0) {
      res.status(400);
      throw new Error(errors.join(", "));
    }

    if (roomName.length < 4) {
      res.status(400);
      throw new Error("Room name must be more than 4 characters");
    }
    const code = voucherCodes.generate({
      length: 8,
      count: 1,
    });
    const room = await Room.create({
      roomCode: code[0],
      roomName: roomName,
      users: [req.user._id],
      roomAdmin: req.user._id,
    });
    if (room) {
      res.status(201).json({
        roomCode: code[0],
        roomName: roomName,
        roomId: room._id,
      });
    } else {
      res.status(400);
      throw new Error("Room creation failed!");
    }
  } catch (err) {
    errorHandler(err, req, res);
  }
};
