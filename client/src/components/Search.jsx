import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GoSearch } from "react-icons/go";
import { useNavigate } from 'react-router-dom';
import { Users, MessageCircle, Mail, Loader2, UserPlus, Search as SearchIcon } from 'lucide-react';

const Search = () => {
    const [currentUser, setcurrentUser] = useState('');
    const [query, setQuery] = useState('');
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [chatExists, setChatExists] = useState(false);
    const [chatId, setChatId] = useState(null);
    const navigate = useNavigate();

    const fetchUserData = async () => {
        try {
            const response = await axios.get('https://connectify-93bj.onrender.com/api/auth/profile', {
                withCredentials: true,
            });
            setcurrentUser(response.data.user._id);
           
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.get(`https://connectify-93bj.onrender.com/api/auth/search?query=${query}`);
            setUsers(response.data);
        } catch (err) {
            if (err.response && err.response.status === 404) {
                setError('No users found');
            } else {
                setError('Error searching users');
            }
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData()
    }, [users]);

    const handleChatClick = async (otherUserId) => {
        if (currentUser && otherUserId && currentUser !== otherUserId) {
            try {
                const response = await axios.post('https://connectify-93bj.onrender.com/chat/check', {
                    members: [currentUser, otherUserId],
                });

                if (response.data.chatExists) {
                    navigate(`/chat`);
                } else {
                    // create new chat
                    const createResponse = await axios.post('https://connectify-93bj.onrender.com/chat/', {
                        members: [currentUser, otherUserId],
                    });

                    if (createResponse.data.success) {
                        navigate(`/chat`);
                    } else {
                        alert("Failed to create chat.");
                    }
                }
            } catch (error) {
                console.error("Error handling chat:", error);
                alert("An error occurred while creating the chat.");
            }
        } else {
            alert("You cannot chat with yourself!");
        }
    };

    return (
        <div className="min-h-screen bg-black p-4 lg:p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-8 lg:mb-12">
                    <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                        Search for users and start conversations with people in your network
                    </p>
                </div>

                {/* Search Card */}
                <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-700/50 rounded-2xl shadow-2xl p-6 lg:p-8 mb-8">
                    {/* Search Form */}
                    <form onSubmit={handleSearch} className="space-y-4">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <SearchIcon className="h-5 w-5 text-zinc-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search by name or email..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 bg-zinc-800/50 border border-zinc-600/50 rounded-xl text-white placeholder-zinc-400 focus:ring-2 focus:ring-green/50 focus:border-green transition-all duration-200 outline-none text-lg"
                            />
                        </div>
                        
                        <button
                            type="submit"
                            disabled={!query.trim() || loading}
                            className="w-full lg:w-auto px-8 py-4 bg-gradient-to-r from-green to-emerald-600 hover:from-emerald-600 hover:to-green text-white rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-green/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 transform hover:scale-105 active:scale-95 disabled:hover:scale-100"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    <span>Searching...</span>
                                </>
                            ) : (
                                <>
                                    <GoSearch className="w-5 h-5" />
                                    <span>Search Users</span>
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-12 space-y-4">
                        <div className="relative">
                            <div className="w-12 h-12 border-4 border-zinc-600 border-t-green rounded-full animate-spin"></div>
                        </div>
                        <p className="text-green text-lg font-medium">Searching for users...</p>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 mb-8">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
                                <Users className="w-5 h-5 text-red-400" />
                            </div>
                            <div>
                                <h3 className="text-red-400 font-semibold">Search Error</h3>
                                <p className="text-red-300 text-sm">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Results Section */}
                {users.length > 0 && (
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3 mb-6">
                            <Users className="w-6 h-6 text-green" />
                            <h2 className="text-xl font-bold text-white">
                                Found {users.length} user{users.length !== 1 ? 's' : ''}
                            </h2>
                        </div>

                        <div className="grid gap-4">
                            {users.map((user, index) => (
                                <div 
                                    key={user._id} 
                                    className="bg-gradient-to-r from-zinc-800/50 to-zinc-700/50 border border-zinc-600/50 rounded-xl p-6 hover:border-green/30 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-green/10 animate-in slide-in-from-bottom-4"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                        {/* Avatar */}
                                        <div className="relative flex-shrink-0">
                                            <img
                                                className="w-16 h-16 lg:w-20 lg:h-20 rounded-full object-cover border-3 border-green/30 shadow-lg"
                                                src={user?.image || 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'}
                                                alt="avatar"
                                            />
                                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green rounded-full border-2 border-zinc-800"></div>
                                        </div>

                                        {/* User Info */}
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-xl font-bold text-white mb-2 truncate">
                                                {user?.name}
                                            </h3>
                                            <div className="flex items-center space-x-2 text-zinc-400 mb-3">
                                                <Mail className="w-4 h-4" />
                                                <p className="text-sm truncate">{user?.email}</p>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <div className="w-2 h-2 bg-green rounded-full animate-pulse"></div>
                                                <span className="text-xs text-green font-medium">Available</span>
                                            </div>
                                        </div>

                                        {/* Action Button */}
                                        <div className="flex-shrink-0 w-full sm:w-auto">
                                            <button
                                                onClick={() => handleChatClick(user._id)}
                                                className="w-full sm:w-auto group px-6 py-3 bg-gradient-to-r from-green to-emerald-600 hover:from-emerald-600 hover:to-green text-white rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-green/25 flex items-center justify-center space-x-2 transform hover:scale-105 active:scale-95"
                                            >
                                                <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                                                <span>{chatExists ? "Go to Chat" : "Start Chat"}</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && users.length === 0 && query && (
                    <div className="text-center py-16">
                        <div className="w-24 h-24 bg-zinc-700/50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Users className="w-12 h-12 text-zinc-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">No users found</h3>
                        <p className="text-zinc-400 mb-6">Try searching with different keywords</p>
                        <button
                            onClick={() => setQuery('')}
                            className="px-6 py-3 bg-zinc-700/50 hover:bg-zinc-600/50 text-zinc-300 hover:text-white rounded-xl font-medium transition-all duration-200 border border-zinc-600/50 hover:border-zinc-500"
                        >
                            Clear Search
                        </button>
                    </div>
                )}

                {/* Initial State */}
                {!loading && !error && users.length === 0 && !query && (
                    <div className="text-center py-16">
                        <div className="relative mb-8">
                            <div className="w-32 h-32 bg-gradient-to-r from-green/20 to-emerald-600/20 rounded-full flex items-center justify-center mx-auto border border-green/30">
                                <UserPlus className="w-16 h-16 text-green" />
                            </div>
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-green to-emerald-600 rounded-full flex items-center justify-center animate-bounce">
                                <SearchIcon className="w-4 h-4 text-white" />
                            </div>
                        </div>
                        
                        <div className="space-y-4 max-w-md mx-auto">
                            <h3 className="text-2xl font-bold text-white">Discover New Connections</h3>
                            <p className="text-zinc-400 leading-relaxed">
                                Enter a name or email address in the search box above to find people and start meaningful conversations.
                            </p>
                            
                            <div className="flex flex-wrap gap-2 justify-center pt-4">
                                <span className="px-3 py-1 bg-zinc-700/50 text-zinc-300 rounded-full text-sm">Search by name</span>
                                <span className="px-3 py-1 bg-zinc-700/50 text-zinc-300 rounded-full text-sm">Find by email</span>
                                <span className="px-3 py-1 bg-zinc-700/50 text-zinc-300 rounded-full text-sm">Start chatting</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search;