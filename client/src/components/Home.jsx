import React from "react";
import { useNavigate } from "react-router-dom";
import logo1 from "../Assets/logo-no-background.png";
import main1 from "../Assets/main4.png";

function Home() {
  const navigate = useNavigate();
  const handlesignup = () => {
    navigate("otp");
  };
  const handlelogin = () => {
    navigate("login");
  };
  return (
    <>
      <div>
        <nav className="w-full px-6 md:px-16 py-5 flex  justify-between">
          <div className="w-[50%] flex  items-center">
            <img className="w-[200px]" src={logo1} alt="" />
          </div>
          <div className="border-2 flex justify-center items-center  border-green text-center px-3 py-2  rounded-md">
            <button onClick={handlesignup}>GET STARTED</button>
          </div>
        </nav>
        <div className="flex flex-col-reverse md:flex-row justify-between">
          <div className="flex w-full md:w-1/2   ">
            <div className="w-full text-center md:text-left px-10 mt-10 space-y-2  mx-auto">
              <h1 className="text-green w-full  font-bold md:pt-16 text-4xl md:text-7xl">
                CONNECTING Health Experts To People
              </h1>
              <p className="text-lg  text-gray-300">
              Empowering communities by connecting experts with people, fostering knowledge sharing, professional guidance, and meaningful interactions for personal growth.
              </p>
              <div className=" flex justify-center md:justify-start py-10 space-x-5">
                <button onClick={handlelogin} className="relative overflow-hidden h-12 px-8 rounded-md border-2 border-green bg-green text-gray-200  cursor-pointer group">
                  <span className="relative z-10">Home</span>
                  <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black to-black scale-x-0 group-hover:scale-x-100 transition-transform duration-[300ms] ease-in-out origin-right rounded-md"></span>
                </button>
                <button onClick={handlesignup} className="relative overflow-hidden h-12 px-8 rounded-md border-2  border-green text-gray-200   cursor-pointer group">
                  <span className="relative z-10">Sign Up</span>
                  <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#075504] to-[#29a623] scale-x-0 group-hover:scale-x-100 transition-transform duration-[300ms] ease-in-out origin-left rounded-md"></span>
                </button>
              </div>
            </div>
          </div>
          <div className=" w-full md:w-1/2 flex justify-center items-center  p-5">
            <img src={main1} alt="" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
