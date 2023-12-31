import React, { useEffect, useState } from "react";
import firebase from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [sessionId, setSessionId] = useState("");

  useEffect(()=>{
    firebase.auth().onAuthStateChanged((user)=> {
      if(user){
        setUserId(user.uid)
        const userRef = firebase.database().ref("users/" + user.uid);
        userRef.on('value', (snapshot) => {
          const user = snapshot.val();
          if(user){
            setSessionId(user.subscription.sessionId || "")
          }
        })
      }
    })
  }, [userId, sessionId]);

  useEffect(()=>{
    handlePaymentSuccess()}
   );
// EC2 IP address
  const handlePaymentSuccess = () => {
    fetch("http://3.233.164.47:5000/api/v1/payment-success", {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({sessionId: sessionId, firebaseId: userId})
    })
    .then(res => {
      if(res.ok) return res.json();
      return res.json().then(json => Promise.reject(json));
    })
    .then(data => {
      console.log(data.message);
      // navigate("/")
    })
    .catch(e => {
      console.log(e.error);
    });
  }

  return (
    <>
      <div className="mx-auto h-screen">
        <main>
          <section className="text-center py-10 bg-white flex">
            <div className="container mx-auto px-4">
              <div className="flex justify-center items-center pb-4">
                <img
                  width="100"
                  height="100"
                  src="https://i.imgur.com/T9q1MQe.png"
                  alt="check_mark"
                />
              </div>

              <h1 className="text-5xl font-bold mb-6 text-blue-500">
                Payment Success
              </h1>
              <p className="text-lg mb-6">
                Thank you for subcribing. You can now use the ERPNext services avaiable in the webiste.
              </p>
              <a href="/">
              <button
                  className="w-[20%] bg-blue-500 text-white py-2 rounded-md mt-auto hover:bg-blue-700 mb-6"
                >
                  Click here to get started
                </button>
              </a>
              <p>* Terms and conditions applied.</p>
            <p>* Features are subjected to change.</p>
            </div>
          </section>

          <section className="mx-auto  text-center text-gray-600 text-sm bg-white pb-10">
            
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 ">
              <div className="bg-white p-6 rounded-xl shadow-xl border-grey-300 border">
                <h2 className="text-2xl font-bold mb-4 text-left">
                  Open Source
                </h2>
                <p className="text-gray-600 mb-6 text-left">
                  Deploy on your own server using our installation scripts.
                  Great for companies with a tech team. GPLv3 licensed.
                </p>
                <a
                  href="https://github.com/frappe/erpnext"
                  className="inline-block bg-black text-white py-3 px-6 rounded-lg"
                >
                  Learn More
                </a>
              </div>
            </div>
          </section>
          {/* <div className="w-full border-t border-gray-300"></div> */}
        </main>
      </div>
    </>
  );
};

export default Success;
