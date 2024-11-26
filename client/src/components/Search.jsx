import React, { useState } from 'react';
import axios from 'axios';
import { GoSearch } from "react-icons/go";

const Search = () => {
    const [query, setQuery] = useState('');
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.get(`http://localhost:3000/api/auth/search?query=${query}`);
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

    return (
        <div className="mt-10 text-white md:flex items-center justify-center p-2">
            <div className="w-full rounded-lg shadow-2xl ">
                <h1 className="text-3xl font-bold text-center text-green mb-6">Search Users</h1>
                {/* Search Form */}
                <form onSubmit={handleSearch} className="flex items-center gap-4 mb-6">
                    <input
                        type="text"
                        placeholder="Enter user name"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="md:flex-1 px-4 py-2 text-white rounded-lg focus:outline-none ring-2 ring-green bg-transparent "
                    />
                    <button
                        type="submit"
                        disabled={!query.trim()}
                        className="px-6 py-2 bg-green text-white rounded-lg hover:bg-green disabled:opacity-70"
                    >
                       <span className='hidden md:block py-2'>search</span><span className='md:hidden'><GoSearch/></span>
                    </button>
                </form>

                {/* Loading and Error Messages */}
                {loading && <p className="text-green text-center mb-4">Loading...</p>}
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                {/* Users List */}
                {users.length > 0 && (
                    <ul className="divide-y divide-gray-700">
                        {users.map((user) => (
                            <li key={user._id} className="py-4 flex items-center gap-4">
                                <img
                                    className="w-14 h-14 rounded-full object-cover border-2 border-white"
                                    src={user?.image || 'https://via.placeholder.com/150'}
                                    alt="avatar"
                                />
                                <div>
                                    <h3 className="text-lg font-semibold">{user?.name}</h3>
                                    <p className="text-gray-400 text-sm">{user?.email}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Search;
