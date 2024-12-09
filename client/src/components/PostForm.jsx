import React, { useState, useRef, useEffect } from "react";
import { TbCirclePlus } from 'react-icons/tb'; // Import the icon
import axios from 'axios';
import { useLocation, useParams } from "react-router-dom";

function PostForm() {
  const [showForm, setShowForm] = useState(false);
  const [user, setUser] = useState(null); // State to store the user
  const formRef = useRef(null);
  const params = useParams();


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/auth/posts'); // Adjust URL
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  const handleAddPostClick = () => {
    setShowForm(true);
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;

    console.log({ title, description }); // Ensure no 'id' field is being sent

    try {
      const response = await axios.post(
        'http://localhost:3000/api/auth/posts',
        { title, description },
        { withCredentials: true }
      );
      console.log("Post created:", response.data);
      setShowForm(false);
      window.location.reload(true); // Reload from server (bypass cache)
    } catch (error) {
      console.error("Error creating post:", {
        message: error.message,
        response: error.response ? error.response.data : null,
        stack: error.stack,
      });
    }
  };




  const handleClickOutside = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      setShowForm(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const location = useLocation()
  if (params.communityId || location.pathname === '/otp' || location.pathname === '/' || location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/profile'|| location.pathname === '/chat'||location.pathname === '/community'||location.pathname === '/community/create'||location.pathname === 'community/:communityId') return

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div>
        <button
          onClick={handleAddPostClick}
          className="overflow-hidden border rounded-full absolute bottom-6 right-0 text-white transition"
          style={{ width: '60px', height: '60px' }}
        >
          <TbCirclePlus
            fill="green"
            stroke="black"
            className="w-full h-full"
            style={{ width: '60px', height: '60px' }}
          />
        </button>
      </div>

      {showForm && (
        <section
          ref={formRef}
          onClick={handleClickOutside}
          className="fixed inset-0 bg-opacity-30 backdrop-blur-sm z-20 p-4 bg-zinc-900 flex justify-center items-center"
        >
          <div className="bg-zinc-900 border-2 border-green p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-end p-2">
              <button onClick={() => setShowForm(false)} className="text-zinc-500 hover:text-red-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="3"
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form className="flex flex-col gap-6 bg-zinc-900 p-6 rounded-md" onSubmit={handleFormSubmit}>
              <div>
                <label
                  htmlFor="title"
                  className="block mb-2 text-sm font-medium text-zinc-300 dark:text-white"
                >
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter Title"
                  required
                  className="p-2 border border-zinc-300 rounded-lg bg-zinc-50 focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-zinc-300 dark:text-white"
                >
                  Description
                </label>
                <textarea
                  name="description"
                  placeholder="Enter Description"
                  required
                  className="p-2 border border-zinc-300 rounded-lg bg-zinc-50 focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
                ></textarea>
              </div>
              <button
                type="submit"
                className="flex w-full justify-center py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="green"
                  className="w-6 h-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </button>
            </form>
          </div>
        </section>
      )}
    </div>
  );
}

export default PostForm;
