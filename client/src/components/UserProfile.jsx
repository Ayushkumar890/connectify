import React, { useState } from "react";
import MyPost from "./Mypost/MyPost";
import axios from "axios";
import bg from '../Assets/stars.png'
import { Link } from "react-router-dom";

const UserProfile = () => {
    const [email, setEmail] = useState([]);
    const [name, setName] = useState([]);
    const [role, setRole] = useState([]); 
    const [avatarLink, setAvatarLink]= useState("https://i.pinimg.com/736x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg");
    const fetchUserData = async () => {
        try {
            const response = await axios.get('https://connectify-93bj.onrender.com/api/auth/profile', {
                withCredentials: true 
            });
            
            // console.log('API response:', response.data); // Debugging: log the full response
            if (response.data && response.data.user.email) {
                await setEmail(response.data.user.email);
                await setName(response.data.user.name);
                await setRole(response.data.user.role);
                await setAvatarLink(response.data.user.image);
            } else {
                console.error('Error fetching user data:', response.data.message);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };
    fetchUserData();
  return (
    <div className="max-w-full mt-5 shadow-xl rounded-lg bg-black text-white z-50">
      <div className="pt-5 bg-black border-b-2 border-green">
        <div className="rounded-lg h-48 md:h-52 overflow-hidden border-green border-4">
          <img
            className="object-cover object-top w-full"
            src={bg}
            alt="star"
          />
        </div>
        <div className="flex flex-col md:flex-row mx-auto items-center w-full pl-16 gap-8 ">
          <div className="   w-32 h-32 md:w-52 md:h-52 relative -mt-16 border-green border-4 rounded-full overflow-hidden">
            <img
              className="object-cover object-center h-32 md:h-52"
              src={avatarLink}
              alt="Woman looking front"
            />
            <div></div>
          </div>
          <div className="md:text-start text-center">
            <h2 className="font-extrabold  flex gap-1 text-3xl">
              {name}
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="green"
                  className="size-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                  />
                </svg>
              </span>
            </h2>
            <p className="text-gray-200">{role}</p>
            <p className="text-gray-500 text-sm">{email}</p>
          </div>
        </div>
      <div className="py-4 mt-2  flex flex-col items-center justify-around">
        <div className="flex gap-5 items-center ">
          <h1 className="font-semibold text-xl">Posts</h1>
          <Link to='/mypost' className=" text-md border-2 border-gray-500 px-2 py-1 rounded-xl">View All</Link>
          
        </div>
      </div>
      </div>
      <div className="z-10 ">
        <MyPost/>
      </div>
    </div>
  );
};

export default UserProfile;
