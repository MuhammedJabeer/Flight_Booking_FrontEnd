import React from 'react';
import '../stylesheet/signup.css';
import { useState } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import axios from 'axios';

const Otp = () => {

     const [otp,setotp]=useState('')
     const navigate=useNavigate()
     const location=useLocation()
     const user_id=location.state?.user_id
     console.log("id",user_id);
     

     const handlesubmit=async(e)=>{
           e.preventDefault();
           try{
               const res=await axios.post("https://flight-booking-backend-6dx0.onrender.com/otp",{otp:otp,user_id:user_id}) 
               console.log("res",res);
               navigate("/login")
           }catch(error){
                 console.error(error)
           }
     }




  return (
    <div className="signup-page">
      <div className="signup-container">
        <h2>OTP Verification</h2>

        <form onSubmit={handlesubmit}>
          <label htmlFor="otp">OTP:</label>
          <input
            type="text"
            id="otp"
            name="otp"
            placeholder="Enter your OTP"
            onChange={(e)=>setotp(e.target.value)}
          />

          <button type="submit">Verify OTP</button>
           
        </form>
      </div>
    </div>
  );
};

export default Otp;
