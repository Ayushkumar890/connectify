import Home from "../components/Home";
import Layout from "../components/Layout";
import Margin from "../components/Margin";
import Login from "../components/usercreate/Login";
import Otp from "../components/usercreate/Otp";
import Signup from "../components/usercreate/Signup";
import ProtectedRoute from './ProtectedRoute';

const { Route, createRoutesFromElements, createBrowserRouter } = require("react-router-dom");

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route path="" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="otp" element={<ProtectedRoute><Otp /></ProtectedRoute>} />
            <Route path="signup" element={<ProtectedRoute><Signup /></ProtectedRoute>} />
            <Route path="login" element={<ProtectedRoute><Login /></ProtectedRoute>} />
            <Route path="home" element={<Margin />} />
        </Route>
    )
);