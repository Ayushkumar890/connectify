const express = require('express');
const { createChat, findChat, userChats, checkIfChatExists } = require('../controllers/chatController');
const router = express.Router();

router.post("/", createChat)
router.get("/:userId", userChats)
router.post("/check", checkIfChatExists)
router.get("/find/:firstId/:secondId", findChat)
// export default router;
module.exports = router;