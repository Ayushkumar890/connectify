import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'; 
import io from 'socket.io-client'; 
import axios from 'axios';

const socket = io('http://localhost:3000'); 

const CommunityGroup = () => {
  const { communityId } = useParams();
  const [group, setGroup] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('hii');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    // Fetch user data
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/auth/profile', {
          withCredentials: true,
        });

        if (response.data && response.data.user._id) {
          setUserId(response.data.user._id);
        } else {
          console.error('Error fetching user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    // Fetch group details and messages
    const fetchGroupDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/community/${communityId}/group`);
        setGroup(response.data.group);
        setMessages(response.data.group.messages || []);

        socket.emit('joinCommunityGroup', {
          communityId: response.data.group._id,
          userId,
        });
      } catch (error) {
        console.error('Error fetching group details:', error);
      }
    };

    fetchGroupDetails();

    socket.on('receiveGroupMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('receiveGroupMessage');
    };
  }, [communityId, userId]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return;
  
    // Prepare message data to send
    const messageData = {
      communityId,
      senderId: userId,
      text: newMessage, // Ensure this is not undefined
    };
  
    console.log('Sending message data:', messageData);  // This should log text field correctly
  
    // Emit the message to socket for real-time chat
    socket.emit('sendGroupMessage', messageData);
  
    // Reset input field after sending
    setNewMessage('');
  
    try {
      // Send message to backend to save it to the database
      const response = await axios.post(`http://localhost:3000/community/${communityId}/group`, messageData, {
        withCredentials: true,
      });
  
      console.log('Message sent to backend:', response.data); // Ensure the response is logged
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  
  return (
    <div className="p-6 overflow-hidden text-black">
    <div className='flex gap-4'>

      <h1 className="text-2xl font-bold mb-4 text-white">{group?.name}</h1>
      
      <Link to={`/community/${communityId}/members`}><h1 className="text-2xl font-bold mb-4 text-white border border-green px-2 hover:bg-green rounded-lg">Members</h1></Link>
    </div>
      
      <div className="border-green border-2 overflow-hidden  p-4 rounded-md h-96 overflow-y-scroll">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <span className="font-semibold">{msg.senderId}:</span> {msg.text}
          </div>
        ))}
      </div>

      <div className="mt-4 flex">
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-grow p-2 border rounded-md 
          bg-gray-200 focus:outline-none focus:ring focus:ring-green"
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 bg-green text-white  px-4 py-2 rounded-md"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default CommunityGroup;
