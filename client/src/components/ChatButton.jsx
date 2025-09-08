import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ChatButton = ({ currentUser, post, chatExists, createChat }) => {
  const [isCreatingChat, setIsCreatingChat] = useState(false);
  const navigate = useNavigate();

  const handleChatClick = async () => {
    if (currentUser?._id && post?.name?._id && currentUser._id !== post.name._id) {
      if (chatExists) {
        navigate(`/chat`);
      } else {
        await createChat();
      }
    } else {
      alert("You cannot chat with yourself!");
    }
  };

  return (
    <button
      onClick={handleChatClick}
      className="mt-4 px-4 py-2 border-2 border-green text-white rounded hover:bg-green"
    >
      {isCreatingChat ? "Creating Chat..." : chatExists ? "Go to Chat" : "Start Chat"}
    </button>
  );
};

export default ChatButton;
