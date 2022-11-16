import { doc, getDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { db } from "../firebase";

export default function Contact({ listing, useRef }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getLandlord = async () => {
      const docRef = doc(db, "users", useRef);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setLandlord(docSnap.data());
      } else {
        toast.error("Could not get landlord/Agent details");
      }
    };
    getLandlord();
  }, [useRef]);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };
  return (
    <>
      {landlord !== null && (
        <div className="flex flex-col w-full">
          <p className="">
            Contact {landlord.name} for the
            {listing.name.toLowerCase()}
          </p>
          <div className="mt-3 mb-6">
            <textarea
            className="w-full px-4 py-2 text-lg text-gray-700
            bg-white border border-gray-300 rounded transition
            duration-500 ease-in-out focus:text-gray-700 focus:bg-white
            focus:border-slate-600"
              name="message"
              id="message"
              rows="2"
              value={message}
              onChange={handleChange}
            ></textarea>
          </div>
          <a
            href={`mailto:${landlord.email}?Subject=${listing.name}&body=${message}`}
          >
            <button 
            type="button"
            className="px-7 py-3 bg-blue-600 text-white rounded text-sm uppercase
            shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700
            focus:shadow-lg active:bg-blue-800 w-full text-center
            active:shadow-lg transition duration-150 ease-in-out mb-6">
              Send Message</button>
          </a>
        </div>
      )}
    </>
  );
}
