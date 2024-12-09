import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';
import InputEmoji from 'react-input-emoji';
import { format } from 'timeago.js';

const socket = io('http://localhost:8800');

const CommunityGroup = () => {
  const { communityId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [user, setUser] = useState(null);
  const [userCache, setUserCache] = useState({}); // Cache for sender details
  const [communityName, setCommunityName] = useState(''); // Cache for sender details

  const fetchUserData = async (senderId) => {
    if (userCache[senderId]) {
      return userCache[senderId];
    }

    try {
      const response = await axios.post(
        'http://localhost:3000/api/auth/user',
        { userId: senderId },
        { withCredentials: true }
      );
      const userName = response.data.user.name;
      setUserCache((prevCache) => ({ ...prevCache, [senderId]: userName })); // Cache the result
      return userName;
    } catch (error) {
      console.error('Error fetching user data:', error);
      return 'Unknown User';
    }
  };

  useEffect(() => {
    const fetchUserAndGroup = async () => {
      try {
        socket.emit('joinCommunityGroup', { communityId });

        const userResponse = await axios.get('http://localhost:3000/api/auth/profile', { withCredentials: true });
        const groupResponse = await axios.get(`http://localhost:3000/community/${communityId}/group`);

        
        setUser(userResponse.data.user);

        const allMessages = groupResponse.data.data || [];
        const enrichedMessages = await Promise.all(
          allMessages.map(async (msg) => ({
            ...msg,
            senderName: await fetchUserData(msg.senderId), // Enrich with sender name
          }))
        );

        setMessages(enrichedMessages);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchUserAndGroup();

    socket.on('receiveGroupMessage', async (message) => {
      const enrichedMessage = {
        ...message,
        senderName: await fetchUserData(message.senderId), // Enrich with sender name
      };
      setMessages((prev) => [...prev, enrichedMessage]);
    });

    return () => {
      socket.off('receiveGroupMessage');
    };
  }, [communityId, userCache]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const messageData = {
      communityId,
      senderId: user._id,
      text: newMessage,
    };

    try {
      await axios.post(`http://localhost:3000/community/${communityId}/group`, messageData);
      socket.emit('sendGroupMessage', messageData);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  useEffect(() => {
    const fetchCommunityName = async () => {
      try {
        const response = await axios.post(`http://localhost:3000/community/${communityId}`, {
          communityId,
        });
        setCommunityName(response.data.data.name);
        console.log('Community:', response.data.data);
      } catch (error) {
        console.error('Error fetching community name:', error);
      }
    };
    fetchCommunityName();
  }, [communityId]);

  return (
    <div className="flex flex-col h-[calc(110vh-100px)] bg-transparent text-white">
      <div className="flex gap-5 border-b border-gray-600 p-4">
        <h3 className="flex justify-center text-2xl font-semibold items-center">{communityName}</h3>
      </div>

      <div className="messages-container flex-grow overflow-y-auto p-4">
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div key={index} className={`flex mb-2 ${msg.senderId === user._id ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`p-3 rounded-lg max-w-xs ${
                  msg.senderId === user._id ? 'bg-blue-800' : 'bg-gray-700'
                }`}
              >
                <p className="text-xs text-gray-400">{msg.senderId === user._id? 'You': msg.senderName || 'Loading...'}</p>
                <p>{msg.text}</p>
                <span className="text-xs text-gray-400">{format(msg.createdAt)}</span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">No messages yet</p>
        )}
      </div>

      <div className="flex p-4 items-center mt-4">
        <InputEmoji
          value={newMessage}
          onChange={setNewMessage}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="flex-grow p-2 bg-gray-800 text-white rounded-lg"
        />
        <button onSubmit={handleSendMessage} className="bg-green rounded-xl px-6 py-2 ml-2">
          Send
        </button>
      </div>
    </div>
  );
};

export default CommunityGroup;
