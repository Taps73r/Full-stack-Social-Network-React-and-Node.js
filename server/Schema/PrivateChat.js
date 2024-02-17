const mongoose = require("mongoose");

const privateChatSchema = new mongoose.Schema({
  participants: [{ type: Number, ref: "User" }],
  messages: [
    {
      sender: { type: Number, ref: "User" },
      content: String,
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

const PrivateChat = mongoose.model("PrivateChat", privateChatSchema);

module.exports = PrivateChat;
