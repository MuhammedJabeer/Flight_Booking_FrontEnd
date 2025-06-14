import React from 'react';
import Hoome from './Pages/Home';
import Flights from './Pages/Flights';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Booking from './Pages/Booking';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Otp from './Components/otp';
import Search from './Pages/Search';
import MyBookingPage from './Pages/Mybooking';
import { AuthProvider } from './Context/Authcontext';
import Profile from './Components/Profilemodal';





function App() {
  
  return (
    <div>
      <Router>
        <AuthProvider>
        <Routes>
          <Route path="/" element={<Hoome />} />
          <Route path="/Flights" element={< Flights />} />
          <Route path="/Booking/:userId" element={< Booking />} />
          <Route path='/signup' element={<Signup/>} />
          <Route path="/Verification" element={<Otp/>}/>
          <Route path='/login' element={<Login/>} />
          <Route path='/Search' element={<Search/>}/>
          <Route path='/Mybooking' element={<MyBookingPage/>}/>
          </Routes>
           <Profile/>
          </AuthProvider>
        </Router>
      {/* <FlightSearch/> */}
      {/* <Services/> */}
      {/* <Footer/> */}
      
 </div>
  )
}
 
export default App
