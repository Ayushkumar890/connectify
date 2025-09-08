import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';
import InputEmoji from 'react-input-emoji';
import { format } from 'timeago.js';
import { Users, Send, ArrowLeft, Hash, Loader2, MessageCircle, Crown } from 'lucide-react';

const socket = io(process.env.REACT_APP_SOCKET_URL);

const CommunityGroup = () => {
  const { communityId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [user, setUser] = useState(null);
  const [userCache, setUserCache] = useState({});
  const [communityName, setCommunityName] = useState('');
  const [loading, setLoading] = useState(true);
  const [onlineMembers, setOnlineMembers] = useState(0);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchUserData = useCallback(async (senderId) => {
    if (userCache[senderId]) return userCache[senderId];
    try {
      const response = await axios.post(`https://connectify-93bj.onrender.com/auth/user`, { userId: senderId }, { withCredentials: true });
      const userName = response.data.user.name;
      setUserCache((prevCache) => ({ ...prevCache, [senderId]: userName }));
      return userName;
    } catch (error) {
      console.error('Error fetching user data:', error);
      return 'Unknown User';
    }
  }, [userCache]);

  useEffect(() => {
    const fetchUserAndGroup = async () => {
      try {
        setLoading(true);
        socket.emit('joinCommunityGroup', { communityId });
        const userResponse = await axios.get(`https://connectify-93bj.onrender.com/auth/profile`, { withCredentials: true });
        const groupResponse = await axios.get(`https://connectify-93bj.onrender.com/community/${communityId}/group`);
        setUser(userResponse.data.user);
        const allMessages = groupResponse.data.data || [];
        const enrichedMessages = await Promise.all(allMessages.map(async (msg) => ({ ...msg, senderName: await fetchUserData(msg.senderId) })));
        setMessages(enrichedMessages);
        // Simulate online members count
        setOnlineMembers(Math.floor(Math.random() * 50) + 10);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndGroup();
    socket.on('receiveGroupMessage', async (message) => {
      const enrichedMessage = { ...message, senderName: await fetchUserData(message.senderId) };
      setMessages((prev) => [...prev, enrichedMessage]);
    });
    return () => socket.off('receiveGroupMessage');
  }, [communityId, fetchUserData]);

  const handleSendMessage = async () => {
    // Prevent message send if user is not loaded
    if (!user || !user._id) {
      console.warn("User not loaded. Cannot send message.");
      return;
    }

    if (!newMessage.trim()) return;

    const messageData = {
      communityId,
      senderId: user._id,
      text: newMessage,
    };

    try {
      await axios.post(`https://connectify-93bj.onrender.com/community/${communityId}/group`, messageData);
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
        const response = await axios.post(`https://connectify-93bj.onrender.com/community/${communityId}`, { communityId });
        setCommunityName(response.data.data.name);
      } catch (error) {
        console.error('Error fetching community name:', error);
      }
    };
    fetchCommunityName();
  }, [communityId]);

  if (loading) {
    return (
      <div className="flex flex-col h-screen bg-black items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-8 h-8 text-green animate-spin" />
          <p className="text-zinc-400">Loading community...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-black shadow-2xl border border-zinc-700/50 rounded-2xl overflow-hidden hide-scrollbar">
      {/* Header */}
      <div className="flex items-center justify-between bg-gradient-to-r from-zinc-800 to-zinc-700 border-b border-zinc-600/50 p-4 lg:p-6 backdrop-blur-sm">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/community')}
            className="p-2 hover:bg-zinc-600/50 rounded-full transition-all duration-200 group lg:hidden"
          >
            <ArrowLeft className="w-5 h-5 text-zinc-400 group-hover:text-green group-hover:-translate-x-1 transition-all duration-200" />
          </button>
          
          <div className="relative">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-green/20 to-emerald-600/20 rounded-full flex items-center justify-center border border-green/30">
              <Hash className="w-5 h-5 lg:w-6 lg:h-6 text-green" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 lg:w-4 lg:h-4 bg-green rounded-full border-2 border-zinc-800 animate-pulse"></div>
          </div>
          
          <div>
            <h3 className="text-lg lg:text-xl font-bold text-white truncate max-w-32 lg:max-w-none">
              {communityName || "Loading..."}
            </h3>
            <div className="flex items-center space-x-2 text-xs lg:text-sm text-green">
              <Users className="w-3 h-3 lg:w-4 lg:h-4" />
              <span>{onlineMembers} members online</span>
            </div>
          </div>
        </div>
      
      </div>
      
      {/* Messages Container */}
      <div className="messages-container flex-grow overflow-y-auto p-3 lg:p-6 space-y-3 lg:space-y-4 scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-transparent hide-scrollbar">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
            <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-r from-green/20 to-emerald-600/20 rounded-full flex items-center justify-center border border-green/30">
              <MessageCircle className="w-6 h-6 lg:w-8 lg:h-8 text-green" />
            </div>
            <div>
              <h3 className="text-lg lg:text-xl font-semibold text-white mb-2">Welcome to {communityName}</h3>
              <p className="text-sm lg:text-base text-zinc-400 px-4">Be the first to start a conversation in this community!</p>
            </div>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div 
              key={index}
              className={`flex mb-3 lg:mb-4 ${
                msg.senderId === user._id ? "justify-end" : "justify-start"
              } animate-in slide-in-from-bottom-2 duration-300`}
            >
              <div className={`flex items-end space-x-2 max-w-[280px] sm:max-w-xs lg:max-w-md ${
                msg.senderId === user._id ? "flex-row-reverse space-x-reverse" : ""
              }`}>
                {msg.senderId !== user._id && (
                  <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gradient-to-r from-green/20 to-emerald-600/20 rounded-full flex items-center justify-center border border-green/30 flex-shrink-0">
                    <span className="text-xs font-bold text-green">
                      {(msg.senderName || 'U')[0].toUpperCase()}
                    </span>
                  </div>
                )}
                <div
                  className={`relative p-3 lg:p-4 rounded-2xl shadow-lg transform transition-all duration-200 hover:scale-105 ${
                    msg.senderId === user._id 
                      ? "bg-gradient-to-r from-green/80 to-emerald-600/80 text-white rounded-br-md" 
                      : "bg-zinc-700/80 text-white rounded-bl-md border border-zinc-600/50"
                  }`}
                >
                  {msg.senderId !== user._id && (
                    <p className="text-xs font-semibold text-green mb-1">
                      {msg.senderName || 'Loading...'}
                    </p>
                  )}
                  <p className="text-xs lg:text-sm leading-relaxed break-words">{msg.text}</p>
                  <div className={`flex items-center justify-end mt-1 lg:mt-2 space-x-1 ${
                    msg.senderId === user._id ? "text-green-100" : "text-zinc-400"
                  }`}>
                    <span className="text-xs">{format(msg.createdAt)}</span>
                    {msg.senderId === user._id && (
                      <div className="flex space-x-1">
                        <div className="w-1 h-1 bg-current rounded-full"></div>
                        <div className="w-1 h-1 bg-current rounded-full"></div>
                      </div>
                    )}
                  </div>
                  
                  {/* Message tail */}
                  <div className={`absolute bottom-0 w-0 h-0 ${
                    msg.senderId === user._id 
                      ? "right-0 border-l-8 border-l-transparent border-t-8 border-t-green/80" 
                      : "left-0 border-r-8 border-r-transparent border-t-8 border-t-zinc-700"
                  }`}></div>
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="bg-gradient-to-r from-zinc-800 to-zinc-700 border-t border-zinc-600/50 p-3 lg:p-4">
        <div className="flex items-end space-x-2 lg:space-x-3">
          <div className="flex-grow relative">
            <div className="bg-zinc-700/50 rounded-2xl border border-zinc-600/50 focus-within:border-green/50 transition-all duration-200 overflow-hidden">
              <InputEmoji 
                value={newMessage} 
                onChange={setNewMessage}  
                onKeyDown={handleKeyDown}
                placeholder={`Message #${communityName}...`}
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
            onClick={handleSendMessage}
            className="group relative p-2.5 lg:p-3 bg-gradient-to-r from-green to-emerald-600 hover:from-emerald-600 hover:to-green disabled:from-zinc-600 disabled:to-zinc-700 rounded-full shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:hover:scale-100 flex-shrink-0"
          >
            <Send className="w-4 h-4 lg:w-5 lg:h-5 text-white group-disabled:text-zinc-400 transition-colors duration-200" />
            <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 group-disabled:opacity-0 transition-opacity duration-200"></div>
          </button>
        </div>
        
        {/* Typing indicator placeholder */}
        <div className="mt-1 lg:mt-2 h-3 lg:h-4 flex items-center">
          <p className="text-xs text-zinc-500 opacity-0">Someone is typing...</p>
        </div>
      </div>
    </div>
  );
};

export default CommunityGroup;