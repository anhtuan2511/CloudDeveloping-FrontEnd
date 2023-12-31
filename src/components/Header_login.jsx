import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import firebase from "../firebase/firebaseConfig";

const Header_login = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");

  const handleSignOut = () => {
    firebase.auth().signOut()
    navigate("/")
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
        setUserName(user.displayName);
      } else {
        setUserId("");
        setUserName("");
      }
    });
  }, [userId]);

  return !userId ? (
    <>
      <a
        href="/register"
        className="block px-2 py-1 text-gray-600 hover:text-gray-900"
      >
        Register
      </a>
      <a
        href="/login"
        className=" block px-2 py-1 text-blue-600 hover:text-blue-800"
      >
        Login
      </a>
    </>
  ) : (
    <>
      <a href="/dashboard" className="block px-2 py-1 text-blue-600 hover:text-blue-800">
        {userName}
      </a>
      <button
        className="block px-2 py-1 text-blue-600 hover:text-blue-800"
        onClick={() => handleSignOut()}
      >
        Logout
      </button>
    </>
  );
};
export default Header_login;
