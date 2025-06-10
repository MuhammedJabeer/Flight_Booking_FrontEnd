
import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../Context/Authcontext";
import { useParams,useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';





const FlightCard = () => {

   const Navigate=useNavigate()
   const {user}=useAuth()
   const [flights, setFlights] = useState([]);

useEffect(()=>{
    fetch("http://localhost:3001/flight")
      .then((response) => response.json())
      .then((data) => {
         setFlights(data);
         console.log(data);
      })
      .catch((error) => {
         console.error("Error fetching flights:", error);
      });
},[])



  const HandlesBooking=(flightsId)=>{
      if(!user){
              Swal.fire({
                                title: 'Error!',
                                 text:"Please Login For booking",
                                 icon: 'error',
                                 confirmButtonText: 'OK'
                                 });

      }else{
         const selectedFlight = flights.find(flight => flight._id === flightsId);
         console.log("see",selectedFlight)
         Navigate(`/Booking/${flightsId}`, { state: { Flight: selectedFlight } });

      }
  }





  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4 h-auto">
      <h1 >Avilable Flights</h1>
      {flights.map((flight) => (
        <div
          key={flight.id}
          className="flex justify-between items-center p-4 border rounded-xl shadow-sm hover:shadow-md transition"
        >
          <div className="flex items-center space-x-4">
            <img
              src={flight.logo}
              alt={flight.airlineName}
              className="w-12 h-12 object-contain"
            />
            <div>
              <h3 className="text-lg font-semibold">{flight.airlineName}</h3>
              <p className="text-sm text-gray-600">{flight.departureAirport} ➔ {flight.
arrivalAirport}</p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-500 font-semibold">Duration</p>
            <p className="text-sm text-gray-500">{flight.duration}</p>
          </div>

          <div className="text-right">
            <p className="text-xl font-bold text-blue-600">{flight.price}</p>
          </div>
            <button  onClick={()=>{HandlesBooking(flight._id)}} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Book</button>
        </div>
      
      ))}
  
    </div>
  );
};

export default FlightCard
