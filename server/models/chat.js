const mongoose = require("mongoose");

const chatSchema = mongoose.Schema({
  roomID: {
    type: String,
    required: true,
    trim: true,
  },
  messages: [
    {
        owner: {
            type: String,
            required: true
        },
        timestamp: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        }
    }
  ]
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
