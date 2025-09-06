import React, { useEffect, useState } from "react";
import axios from "axios";
import Conversation from "./Conversation";
import ChatBox from "./ChatBox";
import { HiOutlineChatBubbleBottomCenterText } from "react-icons/hi2";
import ClipLoader from "react-spinners/ClipLoader";
import { socket } from "../../socket"; // import the shared socket

const Chat = () => {
  const [user, setUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [loading, setLoading] = useState(true);

  // Connect socket once
  useEffect(() => {
    socket.connect();

    socket.on("get-users", (users) => {
      setOnlineUsers(users);
    });

    socket.on("receive-message", (msg) => {
      setReceivedMessage(msg);
    });

    return () => {
      socket.off("get-users");
      socket.off("receive-message");
      socket.disconnect();
    };
  }, []);

  // After user loads, join room
  useEffect(() => {
    if (user?._id) {
      socket.emit("new-user-add", user._id);
    }
  }, [user]);

  // Emit sendMessage when it changes
  useEffect(() => {
    if (sendMessage) {
      socket.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  // Fetch user and chats
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get("https://connectify-93bj.onrender.com/api/auth/profile", {
          withCredentials: true,
        });
        setUser(res.data.user);
      } catch (err) {
        console.error("Error fetching user:", err.message);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchChats = async (id) => {
      try {
        setLoading(true);
        const res = await axios.get(`https://connectify-93bj.onrender.com/chat/${id}`, {
          withCredentials: true,
        });
        setChats(res.data || []);
      } catch (err) {
        console.error("Error fetching chats:", err.message);
      } finally {
        setLoading(false);
      }
    };
    if (user?._id) fetchChats(user._id);
  }, [user]);

  return (
    <div className="flex flex-col md:flex-row gap-4 h-full">
      {/* Conversations */}
      <div className="w-full md:w-1/4 border-r border-gray-600">
        <h2 className="text-2xl font-bold p-4 mb-4">Chats</h2>
        <div className="text-white p-4 w-full">
          {loading ? (
            <div className="flex justify-center mt-20">
              <ClipLoader color={"#6C63FF"} loading={loading} size={100} />
            </div>
          ) : chats.length > 0 ? (
            chats.map((chat) => (
              <div
                key={chat._id}
                className={`cursor-pointer w-full rounded-lg mb-8 py-4 px-4 hover:bg-gray-900 ${
                  currentChat?._id === chat._id ? "bg-gray-900" : ""
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

      {/* ChatBox */}
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
            <HiOutlineChatBubbleBottomCenterText size={150} color="#6F00FF" />
            <div className="flex flex-col items-center py-6">
              <p className="p-2">Select a chat to start messaging</p>
              <button className="bg-[#6F00FF] px-4 py-2 rounded-xl flex">
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