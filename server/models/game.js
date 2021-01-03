const mongoose = require("mongoose");

//record a game
const gameSchema = mongoose.Schema({
  roomID: {
    type: String,
    required: true,
    trim: true,
  },
  start: { //time start game
    type: Date,
    required: true,
  },
  status: { //0: Game not end yet, 1: X win, 2: O win, 3 draw, 4 corrupt
    type: Number,
    required: true,
  },
  winner: {
    type: String,
  },
  history: [ //all moves in game
    {
      x: {
          type: Number,
          required: true
        },
      y: {
          type: Number,
          required: true
      },
      player: {
        type: String
      },
      timestamp: {
        type: Date,
        required: true
      }
    },
  ],
  chat: [
    {
      timestamp: {
        type: Date,
        required: true
      },
      message: {
        type: String,
        required: true
      },
      owner: {
        type: String,
        required: true
      }
    }
  ],
  timerId: {
    type: Number
  }
}, {timestamp: true});

gameSchema.pre("save", async function(next) {
  const game = this;
  if(this.timerId) clearTimeout(this.timerId);
  const id = setTimeout(function() {
    if(!game.status) game.status = 4;
    game.save();
  }, 3600000);
  this.timerId = id;
  next();
})
const Game = mongoose.model("Game", gameSchema);


module.exports = Game;
