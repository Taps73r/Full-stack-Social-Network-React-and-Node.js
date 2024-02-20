const express = require("express");
const router = express.Router();

const PrivateChat = require("../Schema/PrivateChat");
const verifyTokenAndUser = require("../Security/SecurityUser");
const Profile = require("../Schema/profileSchema");

router.post("/private-chats", verifyTokenAndUser, async (req, res) => {
  try {
    const { partId } = req.body;
    const currentUserId = req.userData.userId;

    const existingChat = await PrivateChat.findOne({
      participants: { $all: [currentUserId, partId] },
    });

    if (existingChat) {
      return res.status(400).json({ message: "Чат уже существует" });
    }

    const newPrivateChat = await PrivateChat.create({
      participants: [currentUserId, partId],
    });

    res.status(201).json(newPrivateChat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete(
  "/private-chats/:chatId/messages/:messageId",
  verifyTokenAndUser,
  async (req, res) => {
    try {
      const chatId = req.params.chatId;
      const messageId = req.params.messageId;

      const chat = await PrivateChat.findById(chatId);
      if (!chat) {
        return res.status(404).json({ message: "Чат не знайдено" });
      }

      const messageIndex = chat.messages.findIndex(
        (message) => message._id == messageId
      );
      if (messageIndex === -1) {
        return res.status(404).json({ message: "Повідомлення не знайдено" });
      }

      chat.messages.splice(messageIndex, 1);
      await chat.save();

      res.json({ message: "Повідомлення успішно видалено" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

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

      let messages = [];

      for (const message of chat.messages) {
        const senderProfile = await Profile.findOne({ userId: message.sender });
        if (senderProfile) {
          messages.push({
            userId: senderProfile.userId,
            name: senderProfile.name,
            avatar: senderProfile.photo,
            content: message.content,
          });
        }
      }

      res.json(messages);
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
    const requestingUserId = req.userData.userId;

    if (userId != requestingUserId) {
      return res.status(403).json({ message: "Недостатньо прав доступу" });
    }

    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;

    const privateChats = await PrivateChat.find({ participants: userId })
      .skip(skip)
      .limit(parseInt(limit));

    if (!privateChats || privateChats.length === 0) {
      return res.json([]);
    }

    let formattedChats = [];

    for (const chat of privateChats) {
      const otherParticipantId = chat.participants.find(
        (participantId) => participantId != userId
      );
      const otherParticipantProfile = await Profile.findOne({
        userId: otherParticipantId,
      });
      if (otherParticipantProfile) {
        formattedChats.push({
          userId: otherParticipantProfile.userId,
          username: otherParticipantProfile.name,
          avatar: otherParticipantProfile.photo,
          chatId: chat._id,
        });
      }
    }

    res.json(formattedChats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
