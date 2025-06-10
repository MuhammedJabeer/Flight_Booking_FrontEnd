import { NavLink, useNavigate } from 'react-router-dom';
import '../stylesheet/signup.css';
import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../Context/Authcontext';
import Swal from 'sweetalert2';

const Login = () => {
  const navigate = useNavigate();
  const { login: loggin } = useAuth();

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/login", loginDetails);

      
      const { token } = res.data;
      loggin(token); 
      setLoginDetails({ email: "", password: "" });
   
       Swal.fire({
                    title: 'Success!',
                     text: 'Login successfully!',
                     icon: 'success',
                     confirmButtonText: 'OK'
                     }).then(()=>{
                      navigate("/")
                     })

      
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      const message = error.response?.data?.message || "Something went wrong";
           Swal.fire({
                    title: 'Error!',
                     text:message,
                     icon: 'error',
                     confirmButtonText: 'OK'
                     });
   
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={loginDetails.email}
            onChange={handleChange}
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={loginDetails.password}
            onChange={handleChange}
          />

          <button type="submit">Login</button>
        </form>

        <p className="login-link">
          Don’t have an account? <NavLink to="/signup">Sign Up</NavLink>
        </p>

        <p className="login-link">
          Back to Home? <NavLink to="/">Home</NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
