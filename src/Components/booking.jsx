import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/Authcontext";
import Swal from "sweetalert2";

const Booking = () => {
  const location = useLocation();
  const Flight = location.state?.Flight;
  const navigate = useNavigate();
  const { user } = useAuth();

  const [passengers, setPassengers] = useState([{ name: "", age: "", gender: "" }]);

  const handlePassengerChange = (index, field, value) => {
    const updated = [...passengers];
    updated[index][field] = value;
    setPassengers(updated);
  };

  const addPassenger = () => {
    setPassengers([...passengers, { name: "", age: "", gender: "" }]);
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    const isComplete = passengers.every((p) => p.name && p.age && p.gender);
    if (!isComplete) {
      Swal.fire("Missing Info", "Please fill all passenger details.", "error");
      return;
    }

    const amounts = Flight.price * passengers.length;

    try {
      const response = await axios.post("http://localhost:3001/create-order", {
        amounts,
        flightId: Flight._id,
        user: user.id,
      });

      const { orderId, amount, currency = "INR" } = response.data;
      console.log("rs",amount)

      const options = {
        key: "rzp_test_qx44vDxeEWIMqV", 
        Amount:amount*100,
        currency,
        name: "Flight Booking App",
        description: "Flight Ticket Purchase",
        order_id: orderId,
        handler: async function (response) {
          try{
              Swal.fire("Success", "Payment successful!", "success");

              await axios.post("http://localhost:3001/booking",{
                 totalAmount: Flight.price * passengers.length,
                 razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                flightId: Flight._id,
                user: user.id,
                passengers,

              })
              navigate('/Mybooking')

          }catch(Error){
            console.error("Booking confirmation failed:", err);
            Swal.fire("Error", "Payment succeeded, but booking confirmation failed.", "error");
          }
        
          
        },
        prefill: {
          name: user.name || "",
          email: user.email || "",
          contact: user.phone || "",
        },
        theme: {
          color: "blue",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Booking failed:", error);
      Swal.fire("Error", "Booking failed. Try again later.", "error");
    }
  };

  if (!Flight) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-xl font-semibold text-gray-700">No flight selected.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto my-12 p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
      <h1 className="text-4xl font-extrabold text-indigo-600 mb-10 text-center">Book Your Flight</h1>

      {/* Flight Info */}
      <section className="mb-12 bg-indigo-50 p-6 rounded-xl shadow-inner">
        <h2 className="text-2xl font-semibold text-indigo-700 mb-6 border-b border-indigo-300 pb-2">
          Flight Summary
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800">
          <div className="space-y-2">
            <p>
              <span className="font-semibold">Airline:</span> {Flight.airlineName}
            </p>
            <p>
              <span className="font-semibold">From:</span> {Flight.departureAirport}
            </p>
            <p>
              <span className="font-semibold">To:</span> {Flight.arrivalAirport}
            </p>
          </div>
          <div className="space-y-2">
            <p>
              <span className="font-semibold">Duration:</span> {Flight.duration}
            </p>
            <p>
              <span className="font-semibold">Price per Passenger:</span> ₹{Flight.price}
            </p>
          </div>
        </div>
      </section>

      
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-b border-gray-300 pb-2">
          Passenger Details
        </h2>

        {passengers.map((p, i) => (
          <div
            key={i}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 bg-gray-100 rounded-lg p-6 shadow-sm"
          >
            <input
              type="text"
              placeholder="Full Name"
              value={p.name}
              onChange={(e) => handlePassengerChange(i, "name", e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
            <input
              type="number"
              min="0"
              placeholder="Age"
              value={p.age}
              onChange={(e) => handlePassengerChange(i, "age", e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
            <select
              value={p.gender}
              onChange={(e) => handlePassengerChange(i, "gender", e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        ))}

        <button
          onClick={addPassenger}
          className="inline-block text-indigo-600 font-semibold hover:text-indigo-800 focus:outline-none focus:underline"
          aria-label="Add another passenger"
        >
          + Add Another Passenger
        </button>
      </section>

      {/* Price Summary */}
      <section className="mb-8 bg-indigo-100 p-5 rounded-xl text-indigo-900 shadow-inner">
        <h3 className="text-xl font-semibold mb-3">Price Summary</h3>
        <p className="mb-1">
          Total Passengers: <span className="font-bold">{passengers.length}</span>
        </p>
        <p className="text-lg font-bold">
          Total Amount: ₹{Flight.price * passengers.length}
        </p>
      </section>

      {/* Confirm Button */}
      <div className="text-right">
        <button
          onClick={handleBooking}
          className="bg-indigo-600 text-white font-semibold px-8 py-3 rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition"
          aria-label="Confirm booking"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default Booking;
