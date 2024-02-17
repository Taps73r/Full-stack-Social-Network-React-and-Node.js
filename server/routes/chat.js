const express = require("express");
const router = express.Router();

const PrivateChat = require("../models/privateChatModel");

router.post("/private-chats", async (req, res) => {
  try {
    const { participants } = req.body;
    const newPrivateChat = await PrivateChat.create({ participants });
    res.status(201).json(newPrivateChat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/private-chats/:chatId/messages", async (req, res) => {
  try {
    const chatId = req.params.chatId;
    const chat = await PrivateChat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ message: "Чат не знайдено" });
    }
    res.json(chat.messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/private-chats/:chatId/messages", async (req, res) => {
  try {
    const chatId = req.params.chatId;
    const { sender, content } = req.body;
    const chat = await PrivateChat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ message: "Чат не знайдено" });
    }
    const newMessage = { sender, content };
    chat.messages.push(newMessage);
    await chat.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
