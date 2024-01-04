import React, { useState, useEffect } from "react";
import axios from "axios";
import firebase from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, remove } from "firebase/database";

const Dashboard = ({ userId }) => {
  const navigate = useNavigate();
  const user = firebase.auth().currentUser;
  const [showPopup, setShowPopup] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const [sites, setSites] = useState([]);
  const [siteData, setSiteData] = useState({
    site: "",
    admin_password: "",
  });
  const [showDropSitePopup, setShowDropSitePopup] = useState(false);

  // Check user's subcription status and update if the subscription expired
  const checkAndUpdateSubscriptionStatus = async () => {
    const currentDate = new Date();
    const user = firebase.auth().currentUser;

    if (user && subscription) {
      const planEndDate = new Date(subscription.planEndDate);

      if (currentDate > planEndDate) {
        const subscriptionRef = firebase
          .database()
          .ref(`users/${user.uid}/subscription`);
        await subscriptionRef.update({ active: false });
        setSubscription({ ...subscription, active: false });
        navigate("/");
      }
    }
  };

  // Fetch user's subscrption data
  const fetchSubscriptionData = async (uid) => {
    const subscriptionRef = firebase
      .database()
      .ref(`users/${uid}/subscription`);
    try {
      checkAndUpdateSubscriptionStatus();
      const snapshot = await subscriptionRef.once("value");
      if (snapshot.exists()) {
        setSubscription(snapshot.val());
      }
    } catch (error) {
      console.error("Error fetching subscription data:", error);
    }
  };

  // Display user's created sites
  useEffect(() => {
    const displaySites = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        fetchSubscriptionData(user.uid);
        fetchSites(user.uid).then((fetchedSites) => {
          setSites(fetchedSites);
        });
      } else {
        console.log("User is not logged in");
      }
    });

    return () => displaySites();
  }, []);

  // Fetch user's created sites
  const fetchSites = async (uid) => {
    const sitesRef = firebase.database().ref(`users/${uid}/sites`);
    try {
      const snapshot = await sitesRef.once("value");
      if (snapshot.exists()) {
        const sitesArray = [];
        snapshot.forEach((childSnapshot) => {
          const key = childSnapshot.key;
          const site = childSnapshot.val();
          sitesArray.push({ ...site, key });
        });
        return sitesArray;
      }
      return [];
    } catch (error) {
      console.error("Error fetching sites:", error);
      return [];
    }
  };

  // Create new-site in EC2 & store site in databse
  const handleNewSiteSubmit = async (event) => {
    event.preventDefault();
    setShowPopup(true);
    try {
      const response = await axios.post(
        "https://bdvj7kid48.execute-api.us-east-1.amazonaws.com/dev/cors",
        siteData
      );
      const { siteUrl, siteName } = response.data;
      const newSite = { siteUrl, siteName };

      // Update Firebase
      const userSitesRef = firebase.database().ref(`users/${user.uid}/sites`);
      userSitesRef.push(newSite);

      // Update local state
      setSites([...sites, newSite]);
      setShowPopup(false);
      setSiteData({ site: "", admin_password: "" });
    } catch (error) {
      console.error("Error creating new site:", error);
      setShowPopup(false);
    }
  };

  // Handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSiteData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Drop site from the database as well as EC2 instance
  const dropSite = async (siteName, siteKey) => {
    setShowDropSitePopup(true);
    try {
      // Call the API Gateway
      await axios.delete(
        "https://bdvj7kid48.execute-api.us-east-1.amazonaws.com/dev/cors",
        { data: { site: siteName } }
      );

      // Remove the site from Firebase
      const siteRef = ref(getDatabase(), `users/${user.uid}/sites/${siteKey}`);
      await remove(siteRef);

      // Update local state to reflect the change
      setSites((prevSites) => prevSites.filter((site) => site.key !== siteKey));
    } catch (error) {
      console.error("Error dropping site:", error);
    }
    setShowDropSitePopup(false);
  };

  return (
    <div className="container mx-auto p-4">
      {/* Subscription details */}
      <div className="mt-6">
        <h3 className="text-xl font-bold mb-3">Subscription Details</h3>
        {subscription ? (
          <div className="overflow-hidden rounded-lg shadow">
            <table className="min-w-full rounded">
              <thead>
                <tr className="bg-blue-500 text-white rounded-xl">
                  <th className="px-6 py-3 text-left">Active</th>
                  <th className="px-6 py-3 text-left">Plan Duration</th>
                  <th className="px-6 py-3 text-left">Plan End Date</th>
                  <th className="px-6 py-3 text-left">Plan Start Date</th>
                  <th className="px-6 py-3 text-left">Plan Type</th>
                </tr>
              </thead>

              <tbody className="bg-white">
                <tr>
                  <td className="px-6 py-4 text-left border-t">
                    {subscription.active.toString()}
                  </td>
                  <td className="px-6 py-4 text-left border-t">
                    {subscription.planDuration}
                  </td>
                  <td className="px-6 py-4 text-left border-t">
                    {subscription.planEndDate}
                  </td>
                  <td className="px-6 py-4 text-left border-t">
                    {subscription.planStartDate}
                  </td>
                  <td className="px-6 py-4 text-left border-t">
                    {subscription.planType}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <p>You haven't subscribe to the service yet.</p>
        )}
      </div>

      <div className="w-full border-t border-gray-500 mt-3"></div>

      {/* Your sites */}
      {subscription && subscription.active ? (
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-3">
            Your Sites (You can login using "Administrator" and your admin
            password)
          </h3>
          <div className="space-y-2">
            {sites.map((site) => (
              <div
                key={site.key}
                className="flex justify-between items-center p-3 border border-gray-200 rounded-lg"
              >
                <div>
                  <p>
                    <strong>Site Name:</strong> {site.siteName}
                  </p>
                  <p>
                    <strong>URL:</strong>{" "}
                    <a
                      href={site.siteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {site.siteUrl}
                    </a>
                  </p>
                </div>
                <button
                  onClick={() => dropSite(site.siteName, site.key)}
                  className="bg-red-300 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Drop site
                </button>
                {showDropSitePopup && (
                  <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
                    <div className="bg-white p-5 rounded-lg shadow-md">
                      <p>Dropping site, please do not refresh this page.</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-6 opacity-50">
          <h3 className="text-xl font-bold mb-3">Your Sites</h3>
          <p>
            Viewing sites is currently disabled due to inactive subscription.
          </p>
        </div>
      )}

      <div className="w-full border-t border-gray-500 mt-3"></div>

      {/* Create new-site */}
      {subscription && subscription.active ? (
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-3">Create a New Site</h3>
          <form onSubmit={handleNewSiteSubmit} className="space-y-4">
            <input
              type="text"
              name="site"
              value={siteData.site}
              onChange={handleInputChange}
              placeholder="Enter site name"
              required
              className="px-3 py-2 border border-gray-300 rounded-md"
            />
            <input
              type="password"
              name="admin_password"
              value={siteData.admin_password}
              onChange={handleInputChange}
              placeholder="Enter admin password"
              required
              className="px-3 py-2 border border-gray-300 rounded-md ml-3"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 ml-3"
            >
              Create New Site
            </button>
          </form>
          {showPopup && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
              <div className="bg-white p-5 rounded-lg shadow-md relative">
                <p>
                  Your site is being created. Please wait 5-10 minutes before
                  accessing the site.
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="mt-6 opacity-50">
          <h3 className="text-xl font-bold mb-3">Create a New Site:</h3>
          <p>
            Creating new sites is currently disabled due to inactive
            subscription.
          </p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
