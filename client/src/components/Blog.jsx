import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Search from './Search';

const Blog = ({ post, currentUser }) => {
  const [userData, setUserData] = useState(null);
  const [chatExists, setChatExists] = useState(false);
  const [chatId, setChatId] = useState(null);
  const [avatar, setAvatar] = useState("https://i.pinimg.com/736x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg");
  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      const userId = post?.name?._id;
      const response = await axios.post(
        "https://connectify-93bj.onrender.com/api/auth/user",
        { userId },
        { withCredentials: true }
      );
      setUserData(response.data.user);
      setAvatar(response.data.user.image);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const checkChatExists = async () => {
    try {
      const response = await axios.post('https://connectify-93bj.onrender.com/chat/check', {
        members: [currentUser._id, post.name._id],
      });

      if (response.data.chatExists) {
        setChatExists(true);
        setChatId(response.data.chatId);
      } else {
        setChatExists(false);
      }
    } catch (error) {
      console.error("Error checking if chat exists:", error);
    }
  };

  const createChat = async () => {
    try {
      const response = await axios.post('https://connectify-93bj.onrender.com/chat/', {
        members: [currentUser._id, post.name._id],
      });

      if (response.data.success) {
        navigate(`/chat`);
      } else {
        alert("Failed to create chat.");
      }
    } catch (error) {
      console.error("Error creating chat:", error);
      alert("An error occurred while creating the chat.");
    }
  };

  useEffect(() => {
    fetchUserData();
    if (currentUser && post?.name?._id) {
      checkChatExists();
    }
  }, [post, currentUser]);

  const isExpert = post?.name?.role && post.name.role !== 'Visitor';

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

    <article className="p-6 bg-black rounded-lg border border-gray-700 shadow-md dark:border-gray-700">
      <div className=' hidden'>
        <Search currentUser={currentUser} />
      </div>

      <div className="flex justify-between items-center mb-5 text-gray-500">
        {isExpert && (
          <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center rounded dark:bg-primary-200 dark:text-primary-800">
            <div className="flex space-x-1">
              <span className="text-green">{post.name.role}</span>
            </div>
          </span>
        )}
      </div>
      <div className="flex items-center space-x-4 space-y-2">
        <img className="w-10 h-10 rounded-full" src={avatar} alt="Avatar" />
        <div className='flex justify-between w-full'>
          <div className="font-medium uppercase btn text-lg py-2 text-white">{post.name?.name || "Unknown"}</div>
          <div className="text-sm">{post.time ? new Date(post.time).toLocaleDateString() : "N/A"}</div>
        </div>
      </div>
      <h2 className="mb-2 text-2xl font-bold tracking-tight text-white dark:text-white">
        <Link to="#">{post.title || "Untitled Post"}</Link>
      </h2>
      <p className="font-light text-gray-200 dark:text-gray-400">{post.description || "No description available."}</p>

      {/* Chat button to open chat with the post author */}
      {currentUser && currentUser._id !== post.name._id && (
        <button
          onClick={handleChatClick}
          className="mt-4 px-4 py-2 border-2 border-green text-white rounded hover:bg-green"
        >
          {chatExists ? "Go to Chat" : "Start Chat"}
        </button>
      )}
    </article>
  );
};

export default Blog;
