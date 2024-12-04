const express = require('express');
const router = express.Router();
const { createCommunity, joinCommunity, getAllCommunities, getUserCommunities, getCommunityGroup, getCommunityWithMembers } = require('../controllers/community');
const { addGroupMessage } = require('../controllers/MessageController');



router.post('/create', createCommunity);
router.post('/join', joinCommunity);
router.post('/myCommunities', getUserCommunities);
router.get('/', getAllCommunities);
router.post('/:communityId/group', addGroupMessage);
router.get('/:communityId/group', getCommunityGroup);
router.get('/:communityId/members', getCommunityWithMembers);
module.exports = router;
