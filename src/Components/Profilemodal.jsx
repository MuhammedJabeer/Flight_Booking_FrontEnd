import { useAuth } from "../Context/Authcontext";
import { Phone, Mail, MapPin, User, X, Camera } from 'lucide-react';
import {NavLink}from 'react-router-dom'

const Profile = () => {
  const { Show, Setshow,user } = useAuth();

  return (
    <>
      {Show && (
       <div className="fixed inset-0  bg-transparent backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="relative bg-black to-purple-600 px-6 py-8 text-white">
          <button className="absolute top-4 right-4  hover:bg-opacity-20 transition-all duration-200 p-2 rounded-full">
            <X onClick={()=>Setshow(false)} className="w-5 h-5" />
          </button>
          
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              <img
                src="../public/logo.jpg"
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
              />
            </div>
            
            <h2 className="text-2xl font-bold text-center mb-2">{user.username}</h2>
            <p className="text-white-100 text-center">{user.createdAt}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Bio Section */}
          {/* <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">About</label>
            <p className="text-gray-600 text-sm leading-relaxed">
              Digital nomad passionate about travel and technology. Love exploring new destinations and cultures.
            </p>
          </div> */}

          {/* Contact Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-500 mb-1">Email</label>
                <p className="text-gray-800 text-sm font-medium">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <Phone className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-500 mb-1">Phone</label>
                <p className="text-gray-800 text-sm font-medium">+1 (555) 123-4567</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                {/* <MapPin className="w-5 h-5 text-purple-600" /> */}
              </div>
              <div className="flex-1">
                {/* <label className="block text-xs font-medium text-gray-500 mb-1">Cancel Flight</label>
               <NavLink to="/Mybooking">MyBooking</NavLink> */}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        {/* <div className="border-t border-gray-100 px-6 py-4 bg-black">
          <div className="flex justify-center">
            <button onClick={()=>Setshow(false)} className="text-gray-500 hover:text-gray-700 transition-colors text-sm font-medium ">
              Close
            </button>
          </div> */}
        {/* </div> */}
      </div>
    </div>
      )}
    </>
  );
};

export default Profile;
