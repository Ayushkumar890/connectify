import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";

const ChatBox = ({ chat, currentUser, setSendMessage, receivedMessage }) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

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
    if (receivedMessage && receivedMessage.chatId === chat?._id) {
      setMessages((prev) => [...prev, receivedMessage]);
    }
  }, [receivedMessage, chat?._id]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  const handleSend = async () => {
    if (!newMessage.trim()) {
      return; // Prevent sending blank or whitespace-only messages
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
    <div className=" flex flex-col h-[calc(110vh-100px)]">
    <div className='flex gap-5 border-b border-gray-600 p-4 '>
                <img className='w-12 h-12 rounded-full'  src={userData?.image} alt="avatar" />
                

                <h3 className="flex justify-center text-2xl font-semibold items-center " >{userData?.name}</h3>
            </div>
      
      <div className="messages-container flex-grow overflow-y-auto p-4">
        {messages.map((msg, index) => (
          <div 
            key={index}
            className={`flex mb-2 ${
              msg.senderId === currentUser ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-3 rounded-lg max-w-xs ${
                msg.senderId === currentUser ? "bg-blue-800" : "bg-gray-700"
              }`}
            >
              <p>{msg.text}</p>
              <span className="text-xs text-gray-400">{format(msg.createdAt)}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex p-4 items-center mt-4">
          
          <InputEmoji value={newMessage} onChange={setNewMessage}  onKeyDown={handleKeyDown}/>
        <button onClick={handleSend}  className="bg-green rounded-xl px-6 py-2 ml-2">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
