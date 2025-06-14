import Navbar from "../Components/Nav";
import FlightSearch from "../Components/FlightSearch";
import Services from "../Components/Services";
import Footer from "../Components/Footer";
import Profile from "../Components/Profilemodal";


 function Hoome(){
    return(
        <div> 
              <Navbar/>
              <FlightSearch/>
             
               <Services/>
               <Footer/>
            </div>
    )
 }

 

    export default Hoome    