import { useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    

    const checkToken = () => {
        const token = localStorage.getItem('token');

        if (!token && location.pathname != "/register") {
            navigate('/login/');
        }else if (token){
          var expiration_date = jwtDecode(token).exp * 1000;
          var current_date = Date.now(); // current date in milliseconds
         if (expiration_date < current_date) {
            localStorage.removeItem('token');
            navigate('/login/');
         }
        }
      };


    window.addEventListener('storage', checkToken);
    checkToken(); // Check token initially

    return () => {
      window.removeEventListener('storage', checkToken);
    };

  }, [navigate]);
};

export default useAuth;