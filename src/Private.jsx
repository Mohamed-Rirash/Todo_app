import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isTokenExpired } from "./features/auth/authService";
import { useDispatch } from "react-redux";
import { logout } from "./features/auth/authSlice";
const Private = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const token = sessionStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // console.log("the", token);
    // const checkTokenExpiration = () => {
    //   if (isTokenExpired()) {
    //     console.log("fuck you expire");
    //     dispatch(logout());
    //     navigate("/login");
    //   }
    // };

    if (!token) {
      navigate("/login");
    } else {
      setAuth(true);
    }

    // const expiresAt = parseInt(sessionStorage.getItem("expires_at"), 10);
    // const currentTime = Date.now();
    // const remainingTimeInSeconds = Math.ceil((expiresAt - currentTime) / 1000);

    // console.log(`Token will expire in ${remainingTimeInSeconds} seconds.`);

    // const intervalId = setInterval(checkTokenExpiration, 1000); // Check every second

    // Clean up the interval on component unmount
    // return () => clearInterval(intervalId);
  }, [token, navigate, dispatch]);
  return auth ? children : null;
};

export default Private;
