import { useLocation,useNavigate } from "react-router-dom";
import { useAuth } from "../Context/Authcontext";
import Swal from 'sweetalert2';


const Search = () => {
  const Navigate=useNavigate()
  const location = useLocation();
  const flights = location.state?.flight;
  const {user}=useAuth()


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
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      {(!flights || flights.length === 0) ? (
        <div className="text-center space-y-4">
          <img
            className="w-48 h-48 mx-auto"
            src="/404.png"  
            alt="Not Found"
          />
          <p className="text-lg font-semibold text-gray-600">
            Flight Not Found
          </p>
        </div>
      ) : (
        flights.map((flight) => (
          <div
            key={flight._id}
            className="w-[800px] mx-auto flex flex-col sm:flex-row justify-between items-center p-4 border rounded-xl shadow-sm hover:shadow-md transition"
          >
       
            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
              <img
                src={flight.logo}
                alt={flight.airlineName}
                className="w-12 h-12 object-contain"
              />
              <div>
                <h3 className="text-lg font-semibold">{flight.airlineName}</h3>
                <p className="text-sm text-gray-600">
                  {flight.departureAirport} ➔ {flight.arrivalAirport}
                </p>
              </div>
            </div>

            
            <div className="text-center mb-4 sm:mb-0">
              <p className="text-sm text-gray-500 font-semibold">Duration</p>
              <p className="text-sm text-gray-500">{flight.duration}</p>
            </div>

          
            <div className="text-right mb-4 sm:mb-0">
              <p className="text-xl font-bold text-blue-600">{flight.price}</p>
            </div>

         
            <button onClick={()=>HandlesBooking(flight._id)}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Book
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Search;
