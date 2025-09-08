import React, { useEffect, useState } from "react";
import axios from "axios";
import Conversation from "./Conversation";
import ChatBox from "./ChatBox";
import { HiOutlineChatBubbleBottomCenterText } from "react-icons/hi2";
import ClipLoader from "react-spinners/ClipLoader";
import { socket } from "../../socket"; // import the shared socket
import { MessageCircle, Users, Search, Settings, Menu, X } from "lucide-react";

const Chat = () => {
  const [user, setUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

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

  // Filter chats based on search term
  const filteredChats = chats.filter(chat => {
    return true; 
  });

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-black overflow-hidden">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black backdrop-blur-sm z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:relative inset-y-0 left-0 z-50 w-80 lg:w-96
        bg-black border-r border-zinc-700/50
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col shadow-2xl
      `}>
        {/* Header */}
        <div className="bg-black border-b border-zinc-600/50 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10  rounded-full flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Messages</h1>
                <p className="text-sm text-green">{onlineUsers.length} online</p>
              </div>
            </div>

          </div>


        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-transparent">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 space-y-4">
              <ClipLoader color="#0d8007" loading={loading} size={50} />
              <p className="text-zinc-400 text-sm">Loading conversations...</p>
            </div>
          ) : filteredChats.length > 0 ? (
            <div className="p-4 space-y-2">
              {filteredChats.map((chat) => (
                <div
                  key={chat._id}
                  className={`
                    cursor-pointer rounded-xl p-4 transition-all duration-200 transform hover:scale-[1.02]
                    ${currentChat?._id === chat._id
                      ? "bg-gradient-to-r from-zinc-900 to-zinc-950 border"
                      : "hover:bg-zinc-700/50 border border-transparent"
                    }
                  `}
                  onClick={() => {
                    if (currentChat?._id === chat._id) {
                      setCurrentChat(null);
                    } else {
                      setCurrentChat(chat);
                      closeSidebar(); 
                    }
                  }}
                >
                  <Conversation data={chat} currentUserId={user._id} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 space-y-4 p-6">
              <div className="w-16 h-16 bg-zinc-700/50 rounded-full flex items-center justify-center">
                <MessageCircle className="w-8 h-8 text-zinc-400" />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-white mb-2">No conversations yet</h3>
                <p className="text-zinc-400 text-sm">Start a new conversation to begin chatting</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-zinc-700/50 p-4">
          <div className="flex items-center space-x-3">
            <img
              src={user?.image || "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"}
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-green"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">You</p>
              <p className="text-xs text-green">Online</p>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green rounded-full animate-pulse"></div>
              <span className="text-xs text-zinc-400">{onlineUsers.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <div className="lg:hidden bg-gradient-to-r from-zinc-800 to-zinc-700 border-b border-zinc-600/50 p-4 flex items-center justify-between">
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-zinc-600/50 rounded-full transition-all duration-200 group"
          >
            <Menu className="w-6 h-6 text-white group-hover:text-green" />
          </button>
          <h1 className="text-lg font-semibold text-white">
            {currentChat ? "Chat" : "Messages"}
          </h1>
          <div className="w-10"></div> {/* Spacer for centering */}
        </div>

        {/* Chat Content */}
        <div className="flex-1 min-h-0">
          {currentChat ? (
            <ChatBox
              chat={currentChat}
              currentUser={user?._id}
              setSendMessage={setSendMessage}
              receivedMessage={receivedMessage}
            />
          ) : (
            <div className="h-full flex flex-col justify-center items-center p-8 text-center">
              <div className="relative mb-8">
                <div className="w-32 h-32 bg-gradient-to-r from-green to-green rounded-full flex items-center justify-center border border-green">
                  <HiOutlineChatBubbleBottomCenterText size={60} className="text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-green to-green-600 rounded-full flex items-center justify-center animate-bounce">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
              </div>

              <div className="space-y-4 max-w-md">
                <h2 className="text-2xl font-bold text-white">Welcome to Messages</h2>
                <p className="text-zinc-400 leading-relaxed">
                  Select a conversation from the sidebar to start chatting, or create a new conversation to connect with others.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    onClick={toggleSidebar}
                    className="lg:hidden flex items-center justify-center space-x-2 bg-gradient-to-r from-green to-green-600 hover:from-green hover:to-green-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-green transform hover:scale-105"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>View Chats</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;