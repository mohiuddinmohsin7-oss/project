import React from "react";
import { useNavigate } from "react-router-dom";
const LandingPage = () => {
  const nav=useNavigate();
  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center p-4">
      {/* The Center Card: Flex-col on mobile, Flex-row on Laptop (md:) */}
      <div className="flex flex-col md:flex-row items-center justify-center bg-white shadow-2xl rounded-xl overflow-hidden max-w-4xl w-full p-8 md:p-12 transition-all duration-500">
        
        {/* Image: Hidden on mobile, shown on laptop (md:block) */}
        <div className="hidden md:block w-1/2 p-4">
          <img 
            src="Gemini_Generated_Image_8hiu9m8hiu9m8hiu.png" 
            alt="Skill-Bridge Hero" 
            className="w-full h-auto object-contain hover:scale-105 transition-transform"
          />
        </div>

        {/* Text and Buttons Content */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center text-center space-y-6">
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-gray-900">
            THIS IS <span className="text-blue-600">SKILL-BRIDGE</span>
          </h1>
          
          <div className="flex flex-col w-full space-y-3">
            <button 
              onClick={()=>nav("/register")}
              className="bg-black text-white py-3 px-8 rounded-lg font-bold hover:bg-gray-800 transition-colors uppercase text-sm tracking-widest"
            >
              Get started
            </button>
            
            <button 
              onClick={()=>nav("/login")}
              className="bg-white text-black border-2 border-black py-3 px-8 rounded-lg font-bold hover:bg-gray-100 transition-colors uppercase text-sm tracking-widest"
            >
              I already have an account
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LandingPage;