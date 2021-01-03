const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
  roomID: {
    type: String,
    required: true,
    trim: true,
  },
  X: { 
    name: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required:true
    },
    coins: {
      type: Number,
      required: true
    }
  },
  Y: {
    name: {
      type: String,
    },
    id: {
      type: String,
    },
    coins: {
      type: Number,
    }
  },
  password: {
    type: String,
  },
  timer: {
    type: Number,
    required: true
  },
  coins: {
    type: Number,
    required: true
  },
  roomType: {
    type: String,
    required: true
  },
  lastGameInRoom: {
    type: Date
  },
  timerId: {
    type: Number
  }
}, {timestamp: true});

roomSchema.pre("save", async function(next) {
  const room = this;
  const timeOut = 10*60*1000;
  if(this.timerId) clearTimeout(this.timerId);
  if(room.lastGameInRoom) {
    const id = setTimeout(function() {
      if((room.lastGameInRoom + timeOut) < Date.now()) room.remove();
    }, timeOut);
    this.timerId = id;
  }  
  next();
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
