import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Conversation from "./Conversation";
import ChatBox from "./ChatBox";
import { io } from "socket.io-client";
import { HiOutlineChatBubbleBottomCenterText } from "react-icons/hi2";
import ClipLoader from "react-spinners/ClipLoader";

const Chat = () => {
  const [user, setUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [loading, setLoading] = useState(true);
  const socket = useRef();

  useEffect(() => {
    socket.current = io("https://connectify-93bj.onrender.com");

    if (user?._id) {
      socket.current.emit("new-user-add", user._id);
    }

    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.current.disconnect();
    };
  }, [user]);

  useEffect(() => {
    if (sendMessage) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  useEffect(() => {
    const handleReceiveMessage = (data) => {
      setReceivedMessage(data);

      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat._id === data.chatId
            ? { ...chat, lastMessage: data.text, updatedAt: new Date() }
            : chat
        )
      );

      if (currentChat?._id === data.chatId) {
        setCurrentChat((prevChat) => ({
          ...prevChat,
          messages: [...(prevChat?.messages || []), data],
        }));
      }
    };

    socket.current.on("receive-message", handleReceiveMessage);

    return () => {
      socket.current.off("receive-message", handleReceiveMessage);
    };
  }, [currentChat, receivedMessage]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        "https://connectify-93bj.onrender.com/api/auth/profile",
        {
          withCredentials: true,
        }
      );
      if (response.data?.user) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  };

  const fetchChats = async (userId) => {
    try {
      setLoading(true);
      const response = await axios.get(`https://connectify-93bj.onrender.com/chat/${userId}`, {
        withCredentials: true,
      });
      setChats(response.data || []);
    } catch (error) {
      console.error("Error fetching chats:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (user?._id) {
      fetchChats(user._id);
    }
  }, [user]);

  return (
    <div className="flex flex-col md:flex-row gap-4 h-full">
      <div className="w-full md:w-1/4 border-r border-gray-600">
        <h2 className="text-2xl font-bold p-4 mb-4">Chats</h2>
        <div className="text-white p-4 w-full">
          {loading ? (
            <div className="flex justify-center mt-20">
              <ClipLoader
                color={"#0d8007"}
                loading={loading}
                size={100}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          ) : chats.length > 0 ? (
            chats.map((chat) => (
              <div
                key={chat._id}
                className={`cursor-pointer w-full rounded-lg mb-8 py-4 px-4 hover:bg-gray-900 ${currentChat?._id === chat._id ? "bg-gray-900" : ""
                  }`}
                onClick={() =>
                  currentChat?._id === chat._id
                    ? setCurrentChat(null)
                    : setCurrentChat(chat)
                }
              >
                <Conversation data={chat} currentUserId={user._id} />
              </div>
            ))
          ) : (
            <p>No chats available</p>
          )}
        </div>
      </div>
      <div className="flex-grow h-full">
        {currentChat ? (
          <ChatBox
            chat={currentChat}
            currentUser={user?._id}
            setSendMessage={setSendMessage}
            receivedMessage={receivedMessage}
          />
        ) : (
          <div className="h-[calc(100vh-60px)] flex flex-col justify-center items-center">
            <HiOutlineChatBubbleBottomCenterText size={150} color="green" />
            <div className="flex flex-col items-center py-6">
              <p className="p-2">Select a chat to start messaging</p>
              <button className="bg-green-600 px-4 py-2 rounded-xl flex">
                Chat
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
