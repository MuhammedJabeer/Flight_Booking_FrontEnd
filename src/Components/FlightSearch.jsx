import React, { useState } from "react";
import "../FlightSearch.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Home = () => {
  const navigate=useNavigate()
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  console.log("date",date)
  


  const handleSearch = async(e) => {
    e.preventDefault(); 

  try{  if (!from || !to || !date) {
      alert("Please fill all required fields");
      return;
    }
      const res=await axios.post("http://localhost:3001/serach",{from,to})
      const flight =res.data.flight
      navigate("/Search",{state:{flight}})
    
  }catch(error){
          console.log(error);
  }

  };

  return (
    <div className="min-h-100 bg-flight flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-5xl bg-white p-6 rounded-xl shadow-lg">
        {/* Travel Type */}
        <div className="flex space-x-4 mb-6">
          <button
            type="button"
            className="px-4 py-2 bg-blue-600 text-white rounded-md font-semibold"
          >
            One Way
          </button>
          <button
            type="button"
            className="px-4 py-2 border rounded-md text-gray-600"
          >
            Round Trip
          </button>
        </div>

        {/* Form starts here */}
        <form onSubmit={handleSearch}>
          {/* Search Fields */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {/* From */}
            <div>
              <label className="text-sm text-gray-600 mb-1 block">From</label>
              <input
                type="text"
                placeholder="City or Airport"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="w-full border rounded-md px-3 py-2 bg-gray-50 focus:outline-none"
                required
              />
            </div>

            {/* To */}
            <div>
              <label className="text-sm text-gray-600 mb-1 block">To</label>
              <input
                type="text"
                placeholder="City or Airport"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-full border rounded-md px-3 py-2 bg-gray-50 focus:outline-none"
                required
              />
            </div>

            {/* Date */}
            <div>
              <label className="text-sm text-gray-600 mb-1 block">
                Departure Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border rounded-md px-3 py-2 bg-gray-50 focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700"
            >
              Search Flights
            </button>
          </div>
        </form>
      </div>
     
    </div>
  );
};

export default Home;
