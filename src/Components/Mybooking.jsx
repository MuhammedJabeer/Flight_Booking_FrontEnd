import { useEffect, useState } from "react";
import { useAuth } from "../Context/Authcontext";
import axios from "axios";
import moment from "moment";
import Swal from 'sweetalert2';

export default function MyBooking() {
  const [Mybooking, Setmybooking] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if(user && user.id){
         axios
      .post("http://localhost:3001/Mybooking", { userId: user.id })
      .then((res) => {
        const bookings = res.data.bbooking;
        Setmybooking(bookings);
        console.log("Booking Data:", bookings);
      })
      .catch((err) => {
        console.error("Error fetching booking:", err);
      });
    }
  }, [user]);
    


  const Handlecancel=(BookingId)=>{
    if(!BookingId) return

                 Swal.fire({
    title: "Are you sure?",
    text: "No Refund Available",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, cancel it!",
  }).then((result)=>{
    if(result.isConfirmed){
       axios.post("http://localhost:3001/cancelbooking",{bookId:BookingId})
        .then((res) => {
          Swal.fire("Cancelled!", "Your booking has been cancelled.", "success");
          Setmybooking((pre) => pre.filter((b) => b._id !== BookingId));
        })
    }
  }).catch((error)=>{
              console.log(error)
  }) 

  }
   

  return (
    <div className="max-w-md mx-auto mt-12 space-y-6 ">
       {(!MyBooking||MyBooking.length===0) ?(
             
           <div className="text-center space-y-4">
          <img
            className="w-48 h-48 mx-auto"
            src="/404.png"  
            alt="Not Found"
          />
          <p className="text-lg font-semibold text-gray-600">
              No Booking
          </p>
        </div>



       ):( Mybooking.map((booking) => (
      

        
        <div
          key={booking._id}
          className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden font-sans text-gray-900"
        >
          <header className="flex items-center justify-between px-6 py-5 bg-blue-50 border-b border-blue-100">
            <h2 className="text-lg font-semibold tracking-wide">
              Booked Flight
            </h2>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6h9m-9 6h9m-9 6h9M3 6l6 6-6 6"
              />
            </svg>
          </header>

          <section className="p-6 space-y-6">
            {/* Route */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xs font-medium text-gray-500">From</span>
                <span className="text-xl font-semibold text-gray-800">
                  {booking.flight.departureAirport}
                </span>
              </div>

              <div className="flex-shrink-0 text-blue-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 10l7-7m0 0l7 7m-7-7v18"
                  />
                </svg>
              </div>

              <div className="flex flex-col text-right">
                <span className="text-xs font-medium text-gray-500">To</span>
                <span className="text-xl font-semibold text-gray-800">
                  {booking.flight.arrivalAirport}
                </span>
              </div>
            </div>

            {/* Date & Time */}
            <div className="flex justify-between text-sm text-gray-600 font-medium tracking-wide">
              <div className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 7V3m8 4V3m-9 8h10m-12 4h14a2 2 0 002-2v-5a2 2 0 00-2-2H5a2 2 0 00-2 2v5a2 2 0 002 2z"
                  />
                </svg>
                <span>{moment(booking.flight.departureDate).format("ddd, MMM D, YYYY")}</span>
              </div>

              <div className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4l3 3m6-1a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{moment(booking.flight.departureDate).format("h:mm A")}</span>
              </div>
            </div>

            <hr className="border-gray-200" />

            {/* Booking Details */}
            <div className="space-y-1 text-gray-700">
              <p>
                <span className="font-semibold text-gray-900">Flight:</span>{" "}
                {booking.flight.airlineName} {booking.flight.flightNumber}
              </p>
              <p>
                <span className="font-semibold text-gray-900">Passenger:</span>{" "}
                {booking.passengers.map((p) => `${p.name} (${p.age}, ${p.gender})`).join(", ")}
              </p>
              <p>
                <span className="font-semibold text-gray-900">Duration:</span>{" "}
                {booking.flight.duration}
              </p>
              <p>
                <span className="font-semibold text-gray-900">Status:</span>{" "}
                {booking.status}
              </p>
              <p>
                <span className="font-semibold text-gray-900">Total:</span>{" "}
                ₹{booking.totalAmount}
              </p>
                  <button onClick={()=>{Handlecancel(booking._id)}}    type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                Cancel
              </button>
        
            </div>
             
          </section>
         
        </div>
        
      )))}
    
    
    </div>
    
  );

}

