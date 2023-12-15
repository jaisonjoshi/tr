import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import axiosInstance from "../utils/axiosInstance";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login =() => {
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 const navigate = useNavigate()
  const {loggedIn} =useContext(AuthContext)
    useEffect(()=>{
        if(loggedIn === true){
            navigate('/')
        }
    },[loggedIn])

  const { getLoggedIn } = useContext(AuthContext);


  async function login(e) {
    e.preventDefault();

    try {
      const loginData = {
        email,
        password,
      };

      // await axios.post("http://localhost:5000/auth/login", loginData);
      await axiosInstance.post(
        '/admin/auth/login',
        loginData
      );
      await getLoggedIn();
    } catch (err) {
      console.error(err);
    }
  }

    return(
        <div className="h-[100vh] flex items-center text-[#494949]">
            <div className="w-[20%]  py-8 rounded mx-auto flex flex-col  items-center">
                <img src="/images/logos/logo.png" alt="" className="w-24"/>
                <h1 className="mt-4 text-2xl font-medium ">Admin Login</h1>

                <form onSubmit={login} className="mt-8 w-full">
                    <div className="flex flex-col gap-2 my-8">
                    <label htmlFor="">E-mail</label>
                    <input
          type="email"
          placeholder="Email"
          className="w-full bg-[#ebebeb] px-4 py-2 rounded"

          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />                    </div>
                    <div className="flex flex-col gap-2 my-8">
                        <label htmlFor="">Password</label>
                        <input
          type="password"
          placeholder="Password"
          className="w-full bg-[#ebebeb] px-4 py-2 rounded"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />                    </div>
                    <div>
                    <button type="submit" className="bg-bg w-full text-[white] py-2 rounded">Log in</button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default Login