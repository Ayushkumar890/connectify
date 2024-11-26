const ChatModel = require('../models/ChatModel');

exports.createChat = async(req,res)=> {
    try {
        const { members } = req.body;

        const newChat = new ChatModel({ members });
        await newChat.save();
    
        return res.json({ success: true, message: 'Chat created successfully', chat: newChat });
      } catch (error) {
        console.error('Error creating chat:', error);
        return res.status(500).json({ success: false, message: 'Failed to create chat' });
      }
}

exports.userChats = async(req,res)=> {
    try {
        const chats = await ChatModel.find({
            members: { $in: [req.params.userId]}
        });
        res.status(200).json(chats);
    } catch (error) {
        res.status(500).json(error)
    }
}
exports.findChat = async(req,res)=> {
    try {
        const chat = await ChatModel.findOne({
            members: { $all: [req.params.firstId, req.params.secondId]}
        });
        res.status(200).json(chat);
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.checkIfChatExists = async (req, res) => {
    try {
        const { members } = req.body; 
        const chat = await ChatModel.findOne({
            members: { $all: members },
        });

        if (chat) {
            return res.status(200).json({ chatExists: true, chatId: chat._id });
        } else {
            return res.status(200).json({ chatExists: false });
        }
    } catch (error) {
        console.error("Error checking chat:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
