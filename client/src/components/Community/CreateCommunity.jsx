import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateCommunity = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  // Fetch user details on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("https://connectify-93bj.onrender.com/api/auth/profile", {
          withCredentials: true,
        });

        // console.log("API response:", response.data); // Debugging: log the full response
        if (response.data && response.data.user.email) {
          setUser(response.data.user);
          // console.log("User data fetched:", response.data.user._id);
        } else {
          console.error("Error fetching user data:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []); // Empty dependency array ensures this runs only once

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("User not found. Please log in.");
      return;
    }

    if (user.role === "Visitor") {
      alert("Visitors are not allowed to create communities.");
      return;
    }

    try {
      const response = await axios.post("https://connectify-93bj.onrender.com/community/create", {
        name,
        description,
        category,
        userId: user._id,
      });
      // console.log(response.data);
      alert(response.data.message);
      navigate('/community');
    } catch (error) {
      console.error("Error creating community:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <form
      className="flex flex-col gap-4 bg-transparent p-6 rounded-lg shadow-md max-w-md mx-auto"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl text-green font-bold">Create a Community</h2>
      <input
        className="p-2 border rounded text-white bg-transparent"
        type="text"
        placeholder="Community Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <textarea
        className="p-2 border rounded text-white  bg-transparent"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        className="p-2 border rounded text-white  bg-transparent"
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />
      <button
        type="submit"
        className="bg-green text-white p-2 rounded hover:bg-green"
      >
        Create Community
      </button>
    </form>
  );
};

export default CreateCommunity;
