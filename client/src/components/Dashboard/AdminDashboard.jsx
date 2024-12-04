import React, { useEffect, useState } from "react";
import axios from "axios";
import MyCommunity from "./MyCommunity";
import { PiSmileySadLight } from "react-icons/pi";


const AdminDashboard = () => {
  const [userId, setUserId] = useState("");
  const [myCommunities, setMyCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [role , setRole] = useState('');

  // Fetch user ID
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/auth/profile",
          {
            withCredentials: true,
          }
        );

        if (response.data && response.data.user._id) {
          setUserId(response.data.user._id);
          setRole(response.data.user.role);
        } else {
          console.error("Error fetching user data:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []); // Run only once on mount

  // Fetch communities when userId changes
  useEffect(() => {
    const fetchMyCommunities = async () => {
      if (!userId) return; // Wait until userId is available

      setLoading(true);
      setError("");
      try {
        const response = await axios.post(
          "http://localhost:3000/community/myCommunities",
          { userId: userId },
          { withCredentials: true }
        );

        setMyCommunities(response.data.communities || []);
      } catch (err) {
        console.error("Error fetching my communities:", err);
        setError(err.response?.data?.message || "Failed to fetch communities.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyCommunities();
  }, [userId]); // Re-run whenever userId changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if(role=='Visitor'){
    return <div>
      
    </div>
  }
  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="text-white">
      {myCommunities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {myCommunities.map((community) => (
            <MyCommunity key={community._id} community={community} />
          ))}
        </div>
      ) : (
      
        <p>DOnt have any community</p>
        
      )}
    </div>
  );
};

export default AdminDashboard;

