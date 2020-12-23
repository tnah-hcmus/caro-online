const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
  roomID: {
    type: String,
    required: true,
    trim: true,
  },
  XPlayer: {
    type: String,
    required: true,
  },
  OPlayer: {
    type: String,
  },
  viewers: [
      {
        viewer: {
            type: String
        }
      }
  ],
  status: { //0 = waiting, 1 = playing 
    type: Number,
    required: true
  }
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
