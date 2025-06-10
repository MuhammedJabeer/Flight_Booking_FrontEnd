import tokyoImg from '../assets/react.svg';



const Services=()=>{
    return(
        <>
          
 <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-10 text-blue-800">Top Travel Destinations</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img src="../public/taj.jpg" alt="Bali" className="w-full h-70 object-cover" />
          <div className="p-4">
            <h2 className="font-bold text-lg text-gray-800">Agra </h2>
            <p className="text-sm text-gray-600">India</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img src="../public/stunning.jpg" alt="Swiss Alps" className="w-full h-70 object-cover" />
          <div className="p-4">
            <h2 className="font-bold text-lg text-gray-800">Swiss Alps</h2>
            <p className="text-sm text-gray-600">Snowy Mountains</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img src="../public/newyork.jpg" alt="New York" className="w-full h-70 object-cover" />
          <div className="p-4">
            <h2 className="font-bold text-lg text-gray-800">New York City</h2>
            <p className="text-sm text-gray-600">Urban Adventure</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img src="../public/paris.jpg" alt="Paris" className="w-full h-48 object-cover" />
          <div className="p-4">
            <h2 className="font-bold text-lg text-gray-800">Paris, France</h2>
            <p className="text-sm text-gray-600">Romantic Escape</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img src="../public/maldivs.jpg" alt="Maldives" className="w-full h-48 object-cover" />
          <div className="p-4">
            <h2 className="font-bold text-lg text-gray-800">Maldives</h2>
            <p className="text-sm text-gray-600">Luxury Retreat</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img src="../public/tokyo.jpg" alt="Tokyo" className="w-full h-48 object-cover" />
          <div className="p-4">
            <h2 className="font-bold text-lg text-gray-800">Tokyo, Japan</h2>
            <p className="text-sm text-gray-600">Cultural Fusion</p>
          </div>
        </div>
      </div>
    </div>











        </>
    )
}             


export default Services

