
const mongoose = require('mongoose');
const Community = require('./Community');
const GroupChat = new mongoose.Schema(
    {
        CommunityId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Community",
        },
        senderId:{
            type: String,
        },
        text:{
            type: String,
        },

    },
    {
        timestamps: true,
    },
    {
        
    }
)

const GroupChatModel = mongoose.model("GroupChat", GroupChat);
module.exports = GroupChatModel;