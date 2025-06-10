import React from "react";
import Sidebar from "../Components/Filterbar";
import Navbar from "../Components/Nav";
import Search from "../Components/searchFlight";
import Subnav from "../Components/Subnav";
import Footer from "../Components/Footer";

function Searchpage() {
  return (
    <>

      <Navbar />
    
      <Sidebar/>
       <Search/>
    

   
    </>
  );
}

export default Searchpage;
