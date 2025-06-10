import { useState, useEffect, createContext, useContext } from "react";
import  { jwtDecode } from 'jwt-decode'
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user,Setuser]=useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const Navigate=useNavigate()

  
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      setIsLoggedIn(true);
      const decode=jwtDecode(savedToken)
      console.log("userdateails",decode);
      
      Setuser(decode)
    }
  }, []);

  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    const decode=jwtDecode(newToken) 
    setToken(newToken);  
    Setuser(decode) ;                   
    setIsLoggedIn(true);
  };

  const logout = () => {
     
   

     Swal.fire({
                        title: 'Logout!',
                         text: 'Are you sure !',
                         icon: 'warning',
                         showCancelButton: true,
                         confirmButtonText: 'OK'
                         
                          }).then((result)=>{
                          if(result.isConfirmed){
                             localStorage.removeItem("token");
                             setToken(null);
                            Setuser(null)
                             setIsLoggedIn(false);
                             Navigate("/")
                          }
                         })

  
  };

  return (
    <AuthContext.Provider value={{user, token, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
