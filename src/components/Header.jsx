import React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

export default function Header() {
  const [pageState, setPageState] = useState("Sign In");
  const location = useLocation();
  const navigate = useNavigate();
  const path = (route) => {
    if (location.pathname === route) {
      return true;
    }
  };
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setPageState("Profile");
      } else {
        setPageState("Sign In");
      }
    });
  }, [auth]);

  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-40">
      <header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
        <div>
          <img
            className="h-5 cursor-pointer"
            src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg"
            alt="logo"
            onClick={() => navigate("/")}
          />
        </div>
        <div>
          <ul className="flex space-x-10">
            <li
              className={`cursor-pointer py-3 text-sm font-semibold
            text-gray-400 border-b-[3px] border-b-transparent
            ${path("/") && "text-black border-b-red-500"}`}
              onClick={() => navigate("/")}
            >
              Home
            </li>
            <li
              className={`cursor-pointer py-3 text-sm font-semibold
            text-gray-400 border-b-[3px] border-b-transparent
            ${path("/offers") && "text-black border-b-red-500"}`}
              onClick={() => navigate("/offers")}
            >
              Offers
            </li>
            <li
              className={`cursor-pointer py-2 text-sm font-semibold
            text-gray-400 border-b-[3px] border-b-transparent
            ${(path("/sign-in") || path("/profile")) && "text-black border-b-red-500"}`}
              onClick={() => navigate("/profile")}
            >
              <button className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-slate-200 hover:text-red-500">
                {pageState}
              </button>
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}
