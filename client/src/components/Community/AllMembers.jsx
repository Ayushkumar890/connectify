import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AllMembers = () => {
  const { communityId } = useParams();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get(`https://connectify-93bj.onrender.com/community/${communityId}/members`);
        // console.log('API response:', response.data);
        setMembers(response.data.community.members);
        // console.log('Members data fetched:', response.data.community);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch members');
        setLoading(false);
      }
    };

    fetchMembers();
  }, [communityId]);

  if (loading) {
    return <div className="text-center py-10 text-lg text-gray-600">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-lg text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-green mb-6">Members of the Community</h2>
      <div className="bg-transparent border border-green shadow-md rounded-lg p-4">
        {members.length > 0 ? (
          <ul className="divide-y divide-green">
            {members.map((member) => (
              <li key={member?.id} className="py-4 flex items-center gap-4">
                {/* Uncomment the image tag when the member's image URL is available */}
                <img
                  src={member?.image || 'https://i.pinimg.com/736x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg'}
                  alt="avatar"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white">{member?.name}</h3>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">No members found.</p>
        )}
      </div>
    </div>
  );
};

export default AllMembers;
