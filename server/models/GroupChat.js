const mongoose = require('mongoose');

const GroupChatSchema = new mongoose.Schema({
  communityId: { type: mongoose.Schema.Types.ObjectId, ref: 'Community', required: true },
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const GroupChatModel = mongoose.model('GroupChat', GroupChatSchema);
module.exports = GroupChatModel;