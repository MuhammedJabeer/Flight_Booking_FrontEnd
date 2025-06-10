
import MyBooking from "../Components/Mybooking"
import Navbar from "../Components/NAv"
import { useAuth } from "../Context/Authcontext"
import { useEffect } from "react";


function MyBookingPage(){
 


    return(
        <>
        <Navbar/>
          <MyBooking/>  
        
        
        </>
    )
}




export default MyBookingPage