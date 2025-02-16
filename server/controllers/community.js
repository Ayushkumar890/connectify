const express = require('express');
const Community = require('../models/Community');
const User = require('../models/user');
const Group = require('../models/Group')
const GroupChat = require('../models/GroupChat');
const GroupChatModel = require('../models/GroupChat');
exports.createCommunity = async (req, res) => {
    try {
        const { userId, name, description, category } = req.body;

        if (!userId || !name || !description || !category) {
            return res.status(400).json({
                success: false,
                message: "All fields (userId, name, description, category) are required.",
            });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }
        if (user.role === 'Visitor') {
            return res.status(403).json({
                success: false,
                message: "Only non-Visitor users can create a community.",
            });
        }

        const community = new Community({
            name,
            description,
            category,
            creator: userId,
            members: [userId], // Add creator as the first member
        });

        await community.save();

        // Automatically create a group for the community
        const group = new Group({
            name: `${name} Group`,
            communityId: community._id,
            members: [userId], // Add creator to the group
        });

        await group.save();

        res.status(201).json({
            success: true,
            message: "Community and group created successfully.",
            community,
            group,
        });
    } catch (error) {
        console.error("Error creating community and group:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while creating the community and group.",
        });
    }
};

exports.joinCommunity = async (req, res) => {
    const { communityId, userId } = req.body;

    try {
        const community = await Community.findById(communityId);
        if (!community) {
            return res.status(404).json({ success: false, message: 'Community not found' });
        }

        if (community.members.includes(userId)) {
            return res.status(400).json({ success: false, message: 'You are already a member of this community' });
        }

        // Add the user to the community
        community.members.push(userId);
        await community.save();

        // Add the user to the corresponding group
        const group = await Group.findOne({ communityId });
        if (group) {
            group.members.push(userId);
            await group.save();
        } else {
            console.warn(`Group for community ${communityId} not found.`);
        }

        res.status(200).json({ success: true, message: 'Joined community successfully', data: community });
    } catch (error) {
        console.error("Error joining community and group:", error);
        res.status(500).json({ success: false, message: 'Error joining community and group' });
    }
};


exports.getUserCommunities = async (req, res) => {
    try {
      const { userId } = req.body;
      const userCommunities = await Community.find({ creator: userId })
        .populate("creator", "name email") ; // Populate `members` with specific fields
  
      // Check if communities are found
    //   if (!userCommunities.length) {
    //     return res.status(404).json({
    //       success: false,
    //       message: "No communities found for the specified user.",
    //     });
    //   }
      res.status(200).json({
        success: true,
        communities: userCommunities,
      });
      // console.log("userCommunitty", userCommunities);
    } catch (error) {
      console.error("Error fetching user communities:", error.message);
      res.status(500).json({
        success: false,
        message: "An error occurred while fetching user communities.",
      });
    }
  };
  

exports.getAllCommunities = async (req, res) => {
    try {
        // Fetch all communities
        const communities = await Community.find().populate('creator members');

        res.status(200).json({
            success: true,
            communities,
        });
    } catch (error) {
        console.error("Error fetching communities:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while fetching communities.",
        });
    }
};

exports.getCommunityGroup = async (req, res) => {
    const { communityId } = req.params;

    try {
        const group = await Group.findOne({ communityId }).populate('members', 'name email');
        if (!group) {
            return res.status(404).json({ success: false, message: 'Group not found for this community' });
        }

        res.status(200).json({ success: true, group });
    } catch (error) {
        console.error("Error fetching group:", error);
        res.status(500).json({ success: false, message: 'Error fetching group' });
    }
};

exports.sendGroupMessage = async (req, res) => {
  try {
      const { communityId, senderId, text } = req.body;

      if (!communityId || !senderId || !text) {
          return res.status(400).json({
              success: false,
              message: 'communityId, senderId, and text are required.',
          });
      }

      // Find the group chat by communityId
      let groupChat = await GroupChat.findOne({ communityId });

      // If group chat doesn't exist, create one
      if (!groupChat) {
          groupChat = new GroupChat({ communityId, messages: [] });
      }

      // Add the new message
      groupChat.messages.push({ senderId, text });

      // Save the updated document
      await groupChat.save();

      res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
      console.error('Error sending group message:', error);
      res.status(500).json({ success: false, error: error.message });
  }
};

exports.getGroupMessages = async (req, res) => {
  try {
      const { communityId } = req.params;

      if (!communityId) {
          return res.status(400).json({
              success: false,
              message: 'communityId is required.',
          });
      }

      // Fetch all messages for the community
      const messages = await GroupChatModel.find({ communityId }).sort({ createdAt: 1 });
      // console.log('Fetched messages:', messages); // Debugging line

      res.status(200).json({ success: true, data: messages });
  } catch (error) {
      console.error('Error fetching group messages:', error);
      res.status(500).json({ success: false, error: error.message });
  }
};



  exports.getCommunityWithMembers = async (req, res) => {
    try {
      const communityId = req.params.communityId;
      
      // Find the community and populate members
      const community = await Community.findById(communityId)
        .populate('members', 'name email')  // Populate the members with their name and email
        .populate('creator', 'name email')  // Optionally, populate the creator details
        .exec();
  
      if (!community) {
        return res.status(404).json({ success: false, message: 'Community not found' });
      }
  
      res.status(200).json({ success: true, community });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
  

  
exports.getCommunityById =  async (req, res) => {
    const { communityId } = req.body;

  try {
    // Validate input
    if (!communityId) {
      return res.status(400).json({ success: false, message: 'Community ID is required' });
    }

    // Fetch the community by ID
    const community = await Community.findById(communityId);

    if (!community) {
      return res.status(404).json({ success: false, message: 'Community not found' });
    }

    res.status(200).json({
      success: true,
      data: {
        name: community.name,
      },
    });
  } catch (error) {
    console.error('Error fetching community:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}