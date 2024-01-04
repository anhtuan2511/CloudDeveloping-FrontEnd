import React from "react";
import { useState } from "react";
import firebase from "../firebase/firebaseConfig";
import { Navigate, useNavigate } from "react-router-dom";
import validator from "validator";

const Register = () => {
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [passedFullName, setPassedFullName] = useState(false);
  const [fullNameError, setFullNameError] = useState("");
  const validateFullName = (e) => {
    setFullName(e.target.value);
    var FullName = e.target.value;

    if (FullName === "") {
      setFullNameError("Cannot be empty!");
      setPassedFullName(false);
    } else {
      setFullNameError("");
      setPassedFullName(true);
    }
  };

  const [emailError, setEmailError] = useState("");
  const [passedEmail, setPassedEmail] = useState(false);
  const validateEmail = (e) => {
    setEmail(e.target.value);
    var email = e.target.value;

    if (validator.isEmail(email)) {
      setEmailError("");
      setPassedEmail(true);
    } else {
      setEmailError("Invalid Email");
      setPassedEmail(false);
    }
  };

  const [passwordError, setPasswordError] = useState("");
  const [passedPassword, setPassedPassword] = useState(false);
  const validatePassword = (e) => {
    setPassword(e.target.value);
    var password = e.target.value;

    if (validator.isStrongPassword(password, { minLength: 6 })) {
      setPasswordError("");
      setPassedPassword(true);
    } else {
      setPasswordError(
        "Password must have at least 6 characters, 1 Uppercase, 1 lowercase, a number and a special symbol."
      );
      setPassedPassword(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      if (response.user) {
        await response.user.updateProfile({
          displayName: fullname,
        });
        const uid = response.user.uid;
        const userRef = firebase.database().ref("users/" + uid);
        await userRef.set({
          uid: uid,
          email: email,
          username: fullname,
        });
        firebase.auth().signOut();
        console.log("Account created.");
        setFullName("");
        setEmail("");
        setPassword("");
        navigate("/login");
      }
    } catch (error) {
      setEmailError("Email has already been registered.");
      console.log(error);
    }
  };

  return (
    <>
      <div className="">
        <div className="flex items-center w-full mx-auto h-1/2 justify-center flex-col min-h-screen">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl border-2">
            <h1 className="text-3xl font-semibold mb-8 text-center text-blue-600">
              Register
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="">
                <label
                  htmlFor="fullname"
                  className="block text-md font-medium text-gray-700 pt-3 pb-2"
                >
                  Fullname
                </label>
                <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  placeholder="John Smith"
                  className="py-1 block w-full border-gray-300 border-2 rounded-md shadow-sm focus:border-blue-500 focus:outline-none focus:ring-0 pl-2"
                  required
                  value={fullname}
                  onChange={(e) => validateFullName(e)}
                />
                <div className="error-msg">{fullNameError}</div>
              </div>
              <div className="">
                <label
                  htmlFor="email"
                  className="block text-md font-medium text-gray-700 pt-3 pb-2"
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
                  onChange={(e) => validateEmail(e)}
                />
                <div className="error-msg">{emailError}</div>
              </div>
              <div className="">
                <label
                  htmlFor="password"
                  className="block text-md font-medium text-gray-700 pt-3 pb-2"
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
                  onChange={(e) => validatePassword(e)}
                />
                <div className="error-msg">{passwordError}</div>
              </div>
              <div className="w-full flex justify-between items-center px-0 pb-4 text-blue-600">
                <div className="text-left">
                  <a href="/login" className="hover:underline">
                    Already have an account?
                  </a>
                </div>
              </div>
              <div className="mx-auto flex justify-center items-center py-4">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-800 text-white rounded-md text-base uppercase w-1/2 py-2 btn"
                  disabled={!passedEmail || !passedPassword || !passedFullName}
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Register;
