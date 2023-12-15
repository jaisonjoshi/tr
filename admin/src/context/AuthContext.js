import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

function AuthContextProvider(props) {
    const navigate = useNavigate()


    const [loggedIn, setLoggedIn] = useState(undefined);

  async function getLoggedIn() {
    const loggedInRes = await axiosInstance.get('/admin/auth/loggedin')
    
    setLoggedIn(loggedInRes.data);
    if(loggedIn){
        navigate('/')
    }

  }

  useEffect(() => {
    getLoggedIn();
  }, []);

 
  
  return (
    <AuthContext.Provider value={{ loggedIn, getLoggedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };