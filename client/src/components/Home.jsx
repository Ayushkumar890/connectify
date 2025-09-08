import React from "react";
import { useNavigate } from "react-router-dom";
import logo1 from "../Assets/logo-no-background.png";
import main2 from "../Assets/main2.png";
import About from "./About";
import Footer from "./Footer";

function Home() {
  const navigate = useNavigate();
  
  const handlesignup = () => {
    navigate("otp");
  };
  
  const handlelogin = () => {
    navigate("login");
  };
  
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="min-h-screen bg-black">
        <nav className="w-full px-6 md:px-16 py-6 flex justify-between items-center backdrop-blur-sm bg-black/20 border-b border-green/20">
          <div className="w-[50%] flex items-center">
            <img 
              className="w-[200px] hover:scale-105 transition-transform duration-300" 
              src={logo1} 
              alt="home" 
            />
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => scrollToSection("about")}
              className="text-center px-6 py-3 rounded-lg border-green border-2 text-green font-semibold hover:bg-green hover:text-black transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-green/25"
            >
              ABOUT
            </button>
          </div>
          
          <div className="flex items-center">
            <button 
              onClick={handlesignup}
              className="border-2 border-green text-green px-6 py-3 rounded-lg font-semibold hover:bg-green hover:text-black transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-green/25"
            >
              GET STARTED
            </button>
          </div>
        </nav>

        <div className="flex flex-col-reverse md:flex-row justify-between items-center min-h-[calc(100vh-100px)]">
          <div className="flex w-full md:w-1/2">
            <div className="w-full text-center md:text-left px-10 mt-10 space-y-6 mx-auto">
              <div className="space-y-4">
                <h1 className="text-green w-full font-bold md:pt-16 text-4xl md:text-7xl leading-tight">
                  <span className="block animate-fade-in">CONNECTING</span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green to-green/60 animate-fade-in-delay">
                    Health Experts
                  </span>
                  <span className="block animate-fade-in-delay-2">TO PEOPLE</span>
                </h1>
                
                <div className="w-20 h-1 bg-gradient-to-r from-green to-green/50 mx-auto md:mx-0"></div>
              </div>

              <p className="text-lg text-gray-300 leading-relaxed max-w-xl mx-auto md:mx-0">
                Empowering communities by connecting experts with people, fostering 
                <span className="text-green font-semibold"> knowledge sharing</span>, 
                professional guidance, and meaningful interactions for 
                <span className="text-green font-semibold"> personal growth</span>.
              </p>

              <div className="flex flex-col sm:flex-row justify-center md:justify-start py-10 space-y-4 sm:space-y-0 sm:space-x-6">
                <button 
                  onClick={handlelogin} 
                  className="group relative overflow-hidden h-14 px-10 rounded-lg border-2 border-green bg-green text-white font-semibold cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-green/30"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    <span>Home</span>
                    <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                  <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black to-gray-900 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-right rounded-lg"></span>
                </button>
                
                <button 
                  onClick={handlesignup} 
                  className="group relative overflow-hidden h-14 px-10 rounded-lg border-2 border-green text-white font-semibold cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-green/30"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    <span>Sign Up</span>
                    <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                  </span>
                  <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#075504] to-[#29a623] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-left rounded-lg"></span>
                </button>
                <button 
                  onClick={handlelogin} 
                  className="group relative overflow-hidden h-14 px-10 rounded-lg border-2 border-green text-white font-semibold cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-green/30"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    <span>Sign In</span>
                    <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                  </span>
                  <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#075504] to-[#29a623] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-left rounded-lg"></span>
                </button>
              </div>

              <div className="flex justify-center md:justify-start items-center space-x-8 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green">1000+</div>
                  <div className="text-sm text-gray-400">Experts</div>
                </div>
                <div className="w-px h-12 bg-gray-600"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green">50k+</div>
                  <div className="text-sm text-gray-400">Connections</div>
                </div>
                <div className="w-px h-12 bg-gray-600"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green">24/7</div>
                  <div className="text-sm text-gray-400">Support</div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex justify-center items-center p-10">
            <div className="relative group">
              <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-green/30 to-green/10 opacity-30 blur-2xl group-hover:opacity-50 transition-opacity duration-500"></div>
              <div className="absolute top-0 left-0 w-full h-full rounded-2xl bg-green/10 opacity-20 blur-xl"></div>
              
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-green/30 rounded-full blur-sm animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-green/20 rounded-full blur-md animate-pulse" style={{ animationDelay: '1s' }}></div>
              
              <div className="relative bg-transparent p-2 rounded-2xl shadow-2xl">
                <img
                  src={main2}
                  alt="Main Visual"
                  className="relative z-10 rounded-xl shadow-2xl transform group-hover:scale-105 transition-all duration-500 w-full h-auto"
                />
                
                <div className="absolute inset-2 rounded-xl bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <div className="absolute -left-6 top-1/4 bg-black/80 backdrop-blur-sm border border-green/30 p-3 rounded-lg shadow-lg animate-float">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green rounded-full"></div>
                  <span className="text-sm text-gray-300">Expert Available</span>
                </div>
              </div>
              
              <div className="absolute -right-8 top-3/4 bg-black/80 backdrop-blur-sm border border-green/30 p-3 rounded-lg shadow-lg animate-float-delay">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-300">24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="about">
        <About />
      </div>
      <div id="footer">
        <Footer />
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        
        .animate-fade-in-delay {
          animation: fade-in 0.8s ease-out 0.2s forwards;
          opacity: 0;
        }
        
        .animate-fade-in-delay-2 {
          animation: fade-in 0.8s ease-out 0.4s forwards;
          opacity: 0;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-float-delay {
          animation: float 3s ease-in-out infinite 1.5s;
        }
      `}</style>
    </>
  );
}

export default Home;