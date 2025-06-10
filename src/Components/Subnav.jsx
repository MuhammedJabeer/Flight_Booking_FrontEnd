

import { useLocation } from "react-router-dom";



const Subnav = () => {

    const location=useLocation()
    const Flights=location.state?.Flights


  return (
    <nav className="max-w-2xl  p-4 h-auto flex  justify-item-center items-center">
        
        <p className="text-sm text-gray-600">✈️Kochi➔ Delhi</p>
    </nav>
  );
};

export default Subnav;
