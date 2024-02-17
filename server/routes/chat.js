const express = require("express");
const router = express.Router();

const PrivateChat = require("../Schema/PrivateChat");
const verifyTokenAndUser = require("../Security/SecurityUser");
const Profile = require("../Schema/profileSchema");

router.post("/private-chats", verifyTokenAndUser, async (req, res) => {
  try {
    const { participants } = req.body;
    participants.push(req.userData.userId);
    const newPrivateChat = await PrivateChat.create({ participants });
    res.status(201).json(newPrivateChat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get(
  "/private-chats/:chatId/messages",
  verifyTokenAndUser,
  async (req, res) => {
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
  }
);

router.post(
  "/private-chats/:chatId/messages",
  verifyTokenAndUser,
  async (req, res) => {
    try {
      const chatId = req.params.chatId;
      const sender = req.userData.userId;
      const { content } = req.body;
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
  }
);

router.get("/private-chats/:userId", verifyTokenAndUser, async (req, res) => {
  try {
    const userId = req.params.userId;
    if (userId != req.userData.userId) {
      return res.status(403).json({ message: "Недостатньо прав доступу" });
    }
    console.log(userId);
    const privateChats = await PrivateChat.find({ participants: userId });

    if (!privateChats || privateChats.length === 0) {
      return res.json([]);
    }

    let formattedChats = [];

    for (const chat of privateChats) {
      const otherParticipantId = chat.participants.find(
        (participantId) => participantId !== userId
      );
      const otherParticipantProfile = await Profile.findOne({
        userId: otherParticipantId,
      });
      if (otherParticipantProfile) {
        formattedChats.push({
          chatId: chat._id,
          username: otherParticipantProfile.name,
          avatar: otherParticipantProfile.photo,
        });
      }
    }

    res.json(formattedChats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
