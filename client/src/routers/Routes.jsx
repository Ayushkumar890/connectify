import Home from "../components/Home";
import Layout from "../components/Layout";
import Margin from "../components/Margin";
import Login from "../components/usercreate/Login";
import Otp from "../components/usercreate/Otp";
import Signup from "../components/usercreate/Signup";


const { Route, createRoutesFromElements, createBrowserRouter } = require("react-router-dom");

export const router = createBrowserRouter(
    createRoutesFromElements(

        <Route path="/" element={<Layout />}>
            <Route path="" element={<Home />} />
            <Route path="otp" element={<Otp />} />
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
            <Route path="home" element={<Margin />} />

        </Route>
    )
)

