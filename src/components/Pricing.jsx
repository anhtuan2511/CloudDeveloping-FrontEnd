import React, { useEffect, useState } from "react";
import firebase from "../firebase/firebaseConfig";

const Pricing = () => {
  const [userId, setUserId] = useState("");
  const [planType, setPlanType] = useState("");

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
        console.log("userid: ", userId);
        const userRef = firebase.database().ref("users/" + user.uid);
        userRef.on("value", (snapshot) => {
          const user = snapshot.val();
          if (user) {
            setPlanType(user.subscription.planType || "");
          }
        });
      } else {
        setUserId("");
      }
    });
  }, [userId]);
// EC2 IP address
  const checkout = (plan) => {
    fetch("http://3.233.164.47:5000/api/v1/create-subscription-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({ plan: plan, customerId: userId }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        console.log(res);
        return res.json().then((json) => Promise.reject(json));
      })
      .then(({ session }) => {
        window.location = session.url;
      })
      .catch((e) => {
        console.log(e.error);
      });
  };

  return (
    <>
      <div className="mx-auto">
        <main>
          <section className="text-center py-10 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-5xl font-bold mb-6 text-blue-500">
                Choose the right plan for you
              </h2>
              <p className="text-lg mb-6">
                Whether you are a small business or an enterprise, we have got
                you covered
              </p>
              <p className="text-md font-style: italic text-gray-500">
                Your first monthly subscription is on us. Use code TRIAL30 for a
                100% discount on your first 30 days.
              </p>
            </div>
          </section>
          {/* <div className="w-full border-t border-gray-300"></div> */}

          <section className="flex flex-col md:flex-row justify-center space-y-8 md:space-y-0 md:space-x-8 items-stretch bg-white py-10">
            {[
              {
                id: 1,
                title: "Monthly",
                price: "50",
                len: "month",
                desc: "Best for short-term projects",
              },
              {
                id: 2,
                title: "Annually",
                price: "480",
                len: "year",
                desc: "Best for long-term commitment",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`max-w-sm w-full mx-auto md:mx-0 rounded-lg border border-gray-300 p-6 card shadow-xl ${
                  planType === item.title.toLowerCase() &&
                  "border-[4px] border-blue-600"
                }`}
              >
                <div className="card-content">
                  <h2 className="text-2xl font-semibold text-blue-500">
                    {item.title}
                  </h2>
                  <p className="text-3xl font-bold my-4">
                    ${item.price}{" "}
                    <span className="text-xl font-normal">/{item.len}</span>
                  </p>
                  <p className="text-gray-600">{item.desc}</p>
                  <ul className="text-left my-6">
                    {item.id == 1 ? (
                      <>
                        <li>✔ Unlimited Users</li>
                        <li>✔ Managed Hosting</li>
                        <li>✔ Product Warranty</li>
                        <li>✔ Account Manager</li>
                        <li>✔ Priority SLA</li>
                        <li>✔ Phone Support</li>
                        <li>✔ Large DB Support</li>
                      </>
                    ) : (
                      <>
                        <li>✔ 20% Discount</li>
                        <li>✔ Unlimited Users</li>
                        <li>✔ Managed Hosting</li>
                        <li>✔ Product Warranty</li>
                        <li>✔ Account Manager</li>
                        <li>✔ Priority SLA</li>
                        <li>✔ Phone Support</li>
                        <li>✔ Large DB Support</li>
                      </>
                    )}
                  </ul>
                </div>
                {planType === item.title.toLowerCase() ? (
                  <button className="w-full bg-gray-400 text-white py-2 rounded-md mt-auto hover:bg-blue-700">
                    Subscribed
                  </button>
                ) : (
                  <button
                    onClick={() => checkout(Number(item.price))}
                    className="w-full bg-blue-500 text-white py-2 rounded-md mt-auto hover:bg-blue-700"
                  >
                    Subscribe
                  </button>
                )}
              </div>
            ))}
          </section>

          <div className="mx-auto  text-center text-gray-600 text-sm bg-white pb-10">
            <p>* Terms and conditions applied.</p>
            <p>* Features are subjected to change.</p>
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
          </div>
          {/* <div className="w-full border-t border-gray-300"></div> */}
        </main>
      </div>
    </>
  );
};
export default Pricing;
