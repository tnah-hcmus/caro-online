const mongoose = require("mongoose");

//record a game
const gameSchema = mongoose.Schema({
  roomID: {
    type: String,
    required: true,
    trim: true,
  },
  start: { //time start game
    type: String,
    required: true,
  },
  status: { //0: Corrupt game, 1: has winner, 2: draw game
    type: Number,
    required: true,
  },
  winner: {
    type: String,
  },
  duration: { //total time of game, seconds
    type: Number,
  },
  history: [ //all moves in game
    {
      move: {
        x: {
          type: Number,
          required: true
        },
        y: {
          type: Number,
          required: true
        }
      },
      timestamp: {
        type: String,
        required: true
      }
    },
  ]
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
