
import '../stylesheet/signup.css';
import {NavLink,useNavigate} from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';




const Signup=()=>{

  const navigate=useNavigate();

     const [fromdata,setFormdata]=useState({
        username:"",
        email:"",
        password:""
     })

     const handlechange=(e)=>{
         setFormdata({...fromdata,[e.target.name]:e.target.value}) 
     }


     const handlesubmit=async(e)=>{
          e.preventDefault();
          try{
             const res=await axios.post("http://localhost:3001/register",fromdata)
              console.log(res.data);
              const user_id=res.data.user_id;
               navigate("/Verification",{state:{user_id}})
             Swal.fire({
              title: 'Success!',
               text: 'User registered successfully!',
               icon: 'success',
               confirmButtonText: 'OK'
               });
              
              setFormdata({ username: "", email: "", password: "" });
             
          }catch(err){
            console.error(err);
            // alert("user already exists")
            setFormdata({ username: "", email: "", password: "" });
          }
     }






    return(
        <div className="signup-page">
           <div className="signup-container">
      <h2>Sign Up</h2>

      <form onSubmit={handlesubmit}>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" value={fromdata.username} name="username" onChange={handlechange} />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={fromdata.email} name="email" onChange={handlechange} />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={fromdata.password} name="password" onChange={handlechange} />

        {/* Confirm password removed as you requested */}

        <button type="submit">Sign Up</button>
      </form>

      <p className="login-link">
        Already have an account? <NavLink to="/login">Login</NavLink>
      </p>

        <p className="login-link">
            Back to Home? <NavLink to="/" end>Home</NavLink>
      </p>
       
    </div>
   
         
        </div>
    )
}



export default Signup