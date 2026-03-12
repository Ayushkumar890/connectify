import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CommunityBox from './CommunityBox';
import BackendURL from "../../api/auth";

const AllCommunity = () => {
    const [communities, setCommunities] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const response = await axios.get(`${BackendURL}/community`, {
              withCredentials: true,
            });
    
            // console.log("API response:", response.data); 
            setCommunities(response.data.communities);
            // console.log("Communities data fetched:", response.data.communities);
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        };
    
        fetchUserData();
      }, []);


  return (
    <div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4"'> 
            {communities.map((community) => (
             
                <CommunityBox key={community._id} community={community}  />
            ))}
        </div>
        

    </div>
  )
}

export default AllCommunity