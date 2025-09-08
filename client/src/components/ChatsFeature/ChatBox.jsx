import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";
import { Send, Phone, Video, MoreVertical, Smile } from "lucide-react";

const ChatBox = ({ chat, currentUser, setSendMessage, receivedMessage }) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = chat?.members.find((id) => id !== currentUser);
      try {
        const response = await axios.post(
          "https://connectify-93bj.onrender.com/api/auth/user",
          { userId },
          { withCredentials: true }
        );
        setUserData(response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (chat) fetchUserData();
  }, [chat, currentUser]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `https://connectify-93bj.onrender.com/message/${chat?._id}`,
          { withCredentials: true }
        );
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    if (chat) fetchMessages();
  }, [chat]);

  useEffect(() => {
    if (receivedMessage && receivedMessage.chatId === chat._id) {
      // Only add if it's not from me
      if (receivedMessage.senderId !== currentUser) {
        setMessages((prev) => [...prev, receivedMessage]);
      }
    }
  }, [receivedMessage, chat._id, currentUser]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = async () => {
    if (!newMessage.trim()) {
      return;
    }

    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat?._id,
    };

    try {
      const response = await axios.post(
        "https://connectify-93bj.onrender.com/message",
        message,
        { withCredentials: true }
      );
      setMessages((prev) => [...prev, { ...message, _id: response.data._id }]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }

    const receiverId = chat?.members.find((id) => id !== currentUser);
    setSendMessage({ ...message, receiverId });
  };

  return (
    <div className="flex flex-col h-full bg-black shadow-2xl border-l lg:border-l-0 lg:border border-zinc-700/50  overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between bg-gradient-to-r from-zinc-800 to-zinc-700 border-b border-zinc-600/50 p-4 lg:p-6 backdrop-blur-sm">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border-2 border-green/50 shadow-lg object-cover"
              src={userData?.image || "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"}
              alt="avatar"
            />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 lg:w-4 lg:h-4 bg-green rounded-full border-2 border-zinc-800 animate-pulse"></div>
          </div>
          <div>
            <h3 className="text-lg lg:text-xl font-bold text-white truncate max-w-32 lg:max-w-none">{userData?.name || "Loading..."}</h3>
            <h4 className="text-md lg:text-md text-white opacity-25 truncate max-w-32 lg:max-w-none">{userData?.email || "Loading..."}</h4>
          </div>
        </div>

        <div className="flex items-center space-x-1 lg:space-x-2">
          <button className="p-1.5 lg:p-2 hover:bg-zinc-600/50 rounded-full transition-all duration-200 group">
            <Phone className="w-4 h-4 lg:w-5 lg:h-5 text-zinc-400 group-hover:text-green" />
          </button>
          <button className="p-1.5 lg:p-2 hover:bg-zinc-600/50 rounded-full transition-all duration-200 group">
            <Video className="w-4 h-4 lg:w-5 lg:h-5 text-zinc-400 group-hover:text-green" />
          </button>
          <button className="p-1.5 lg:p-2 hover:bg-zinc-600/50 rounded-full transition-all duration-200 group">
            <MoreVertical className="w-4 h-4 lg:w-5 lg:h-5 text-zinc-400 group-hover:text-white" />
          </button>
        </div>
      </div>

      {/* Messages Container */}
      <div className="messages-container flex-grow overflow-y-auto p-3 lg:p-6 space-y-3 lg:space-y-4 scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-transparent">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
            <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-r from-green to-green-600 rounded-full flex items-center justify-center">
              <Smile className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
            </div>
            <div>
              <h3 className="text-lg lg:text-xl font-semibold text-white mb-2">Start a conversation</h3>
              <p className="text-sm lg:text-base text-zinc-400 px-4">Send a message to begin chatting with {userData?.name}</p>
            </div>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`flex mb-3 lg:mb-4 ${msg.senderId === currentUser ? "justify-end" : "justify-start"
                } animate-in slide-in-from-bottom-2 duration-300`}
            >
              <div className={`flex items-end space-x-2 max-w-[280px] sm:max-w-xs lg:max-w-md ${msg.senderId === currentUser ? "flex-row-reverse space-x-reverse" : ""
                }`}>
                {msg.senderId !== currentUser && (
                  <img
                    src={userData?.image || "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"}
                    alt="avatar"
                    className="w-6 h-6 lg:w-8 lg:h-8 rounded-full border border-zinc-600 flex-shrink-0"
                  />
                )}
                <div
                  className={`relative p-3 lg:p-4 rounded-2xl shadow-lg transform transition-all duration-200 hover:scale-105 ${msg.senderId === currentUser
                    ? "bg-gradient-to-r from-green to-green-600 text-white rounded-br-md border border-zinc-600"
                    : "bg-zinc-700/80 text-white rounded-bl-md border border-zinc-600/50"
                    }`}
                >
                  <p className="text-xs lg:text-sm leading-relaxed break-words">{msg.text}</p>
                  <div className={`flex items-center justify-end mt-1 lg:mt-2 space-x-1 ${msg.senderId === currentUser ? "text-white" : "text-zinc-400"
                    }`}>
                    <span className="text-xs">{format(msg.createdAt)}</span>
                  </div>

                  {/* Message tail */}
                  <div className={`absolute bottom-0 w-0 h-0 ${msg.senderId === currentUser
                    ? "right-0 border-l-8 border-l-transparent border-t-8 border-t-green"
                    : "left-0 border-r-8 border-r-transparent border-t-8 border-t-zinc-700"
                    }`}></div>
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-black border-t border-zinc-600/50 p-3 lg:p-4">
        <div className="flex items-end space-x-2 lg:space-x-3">
          <div className="flex-grow relative">
            <div className="bg-zinc-700/50 rounded-2xl border border-zinc-600/50 focus-within:border-green/50 transition-all duration-200 overflow-hidden">
              <InputEmoji
                value={newMessage}
                onChange={setNewMessage}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                borderRadius={16}
                borderColor="transparent"
                fontSize={14}
                background="rgba(63, 63, 70, 0.5)"
                color="#ffffff"
                placeholderColor="#9ca3af"
                height={20}
                cleanOnEnter
                theme="dark"
              />
            </div>
          </div>

          <button
            onClick={handleSend}
            disabled={!newMessage.trim()}
            className="group relative p-2.5 lg:p-3 bg-gradient-to-r from-green to-green-600 hover:from-green hover:to-green-700 disabled:from-zinc-600 disabled:to-zinc-700 rounded-full shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:hover:scale-100 flex-shrink-0"
          >
            <Send className="w-4 h-4 lg:w-5 lg:h-5 text-white group-disabled:text-zinc-400 transition-colors duration-200" />
            <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 group-disabled:opacity-0 transition-opacity duration-200"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;