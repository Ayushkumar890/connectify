const MessageModel = require('../models/MessageModel');
const ChatModel = require('../models/ChatModel');
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
