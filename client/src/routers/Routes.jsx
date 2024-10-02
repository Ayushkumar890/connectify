import Home from "../components/Home";
import Layout from "../components/Layout";
import MyPost from "../components/Mypost/MyPost";
import TotalPost from "../components/TotalPost";
import Login from "../components/usercreate/Login";
import Otp from "../components/usercreate/Otp";
import Signup from "../components/usercreate/Signup";
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';

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
        </Route>
    )
);
