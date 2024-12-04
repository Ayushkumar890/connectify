import Chat from "../components/ChatsFeature/Chat";
import ChatBox from "../components/ChatsFeature/ChatBox";
import AllCommunity from "../components/Community/AllCommunity";
import CreateCommunity from "../components/Community/CreateCommunity";
import Home from "../components/Home";
import Layout from "../components/Layout";
import MyPost from "../components/Mypost/MyPost";
import Search from "../components/Search";
import TotalPost from "../components/TotalPost";
import Login from "../components/usercreate/Login";
import Otp from "../components/usercreate/Otp";
import Signup from "../components/usercreate/Signup";
import UserProfile from "../components/UserProfile";
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import CommunityGroup from "../components/Community/CommunityGroup";
import AllMembers from "../components/Community/AllMembers";
import AdminDashboard from "../components/Dashboard/AdminDashboard";
import MyCommunity from "../components/Dashboard/MyCommunity";

const { Route, createRoutesFromElements, createBrowserRouter } = require("react-router-dom");

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route path="" element={<Home />} />
            <Route path="otp" element={<PublicRoute><Otp /></PublicRoute>} />
            <Route path="signup" element={<PublicRoute><Signup /></PublicRoute>} />
            <Route path="login" element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="home" element={<ProtectedRoute> <TotalPost /></ProtectedRoute>} />
            <Route path="mypost" element={<ProtectedRoute> <MyPost /></ProtectedRoute>} />
            <Route path="chat" element={<ProtectedRoute> <Chat /></ProtectedRoute>} />
            <Route path="community/myCommunities" element={<ProtectedRoute> <MyCommunity /></ProtectedRoute>} />
            <Route path="community" element={<ProtectedRoute> <AllCommunity/> </ProtectedRoute>} />
            <Route path="community/:communityId" element={<ProtectedRoute> <CommunityGroup/> </ProtectedRoute>} />
            <Route path="community/:communityId/members" element={<ProtectedRoute> <AllMembers/> </ProtectedRoute>} />
            <Route path="dashboard" element={<ProtectedRoute> <AdminDashboard/> </ProtectedRoute>} />
            <Route path="community/create" element={<ProtectedRoute> <CreateCommunity /></ProtectedRoute>} />
            <Route path="chatbox" element={<ProtectedRoute> <ChatBox /></ProtectedRoute>} />
            <Route path="profile" element={<ProtectedRoute> <UserProfile /></ProtectedRoute>} />
            <Route path="search" element={<ProtectedRoute> <Search /></ProtectedRoute>} />
        </Route>
    )
);
