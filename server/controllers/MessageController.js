const MessageModel = require('../models/MessageModel');
// const ChatModel = require('../models/ChatModel');
const ChatModel = require('../models/ChatModel')
const GroupChatModel = require('../models/GroupChat');
exports.addMessage = async (req, res) => {
    try {
        const { chatId, senderId, text } = req.body;
        const newMessage = new MessageModel({
            chatId,
            senderId,
            text,
        });
        const savedMessage = await newMessage.save();

        res.status(200).json(savedMessage);
    } catch (error) {
        res.status(500).json(error);
    }
};


// Assuming io is initialized in your server.js (or equivalent)
exports.addGroupMessage = async (req, res) => {
  try {
    const { communityId, senderId, text } = req.body;
    console.log('Received data:', { communityId, senderId, text });

    // Ensure all fields are received correctly
    if (!communityId || !senderId || !text) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    // Save the message to the database
    const newMessage = new GroupChatModel({
      communityId,
      senderId,
      text,
    });

    const savedMessage = await newMessage.save();
    console.log('Saved message:', savedMessage);

    // Emit the message to all users in the community group (Ensure req.io is correctly initialized)
    if (req.io) {
      req.io.to(communityId).emit('receiveGroupMessage', savedMessage);
    }

    res.status(200).json(savedMessage);
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ message: 'Error saving message', error });
  }
};

  



exports.getMessages = async (req, res) => {
    try {
        const messages = await MessageModel.find({
            chatId: req.params.chatId,
        });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json(error);
    }
}