
import React from "react";
import { useState } from "react";
import firebase from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();  
    console.log(email, password)
    try{
      const response = await firebase.auth().signInWithEmailAndPassword(email, password);
    if (response.user){
      setEmail("");
      setPassword("");
      await navigate("/");
    }
    } catch(error){
      setLoginError("Invalid email or password!")
      console.log(error)
    }
  }
  return (
    <>
      <div className="">
        <div className="flex items-center w-full mx-auto h-1/2 justify-center flex-col min-h-screen">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl border-2">
            <h1 className="text-3xl font-semibold  text-center text-blue-600">Login</h1>
            <div className="error-msg">{loginError}</div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 py-3"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="smith.john@gmail.com"
                  className="py-1 block w-full border-gray-300 border-2 rounded-md shadow-sm focus:border-blue-500 focus:outline-none focus:ring-0 pl-2"
                  required
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 py-3 "
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="********"
                  className="py-1  block w-full border-gray-300 border-2 rounded-md shadow-sm focus:border-blue-500 focus:outline-none focus:ring-0 pl-2"
                  required
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                />
              </div>
              <div className="w-full flex justify-between items-center px-0 pb-4 text-blue-600">
                <div className="text-left">
                  <a href="/register" className="hover:underline">
                  Don't have an account?
                  </a>
              
                </div>

              </div>
              <div className="mx-auto flex justify-center items-center py-4">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-800 text-white rounded-md text-base uppercase w-1/2 py-2"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
    </>
  );
};
export default Login;
