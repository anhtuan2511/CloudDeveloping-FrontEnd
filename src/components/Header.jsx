import React, { useEffect, useState } from "react";
import toggleMenu from "../script/script";
import script from "../script/script"
import Header_login from "./Header_login";
import firebase from "../firebase/firebaseConfig"

const Header = () => {
  return (
    <header className="bg-white">
      <nav className="bg-white py-4 shadow-md">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center">
            <a className="text-lg font-semibold" href="/">
              ERPNext
            </a>
            <div className="hidden md:flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-gray-900 block px-2 py-1">
                FAQ
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 block px-2 py-1">
                About Us
              </a>
              <a href="/pricing" className="text-gray-600 hover:text-gray-900 block px-2 py-1">
                Pricing
              </a>
              {/* <a href="/register" className="text-gray-600 hover:text-gray-900 block px-2 py-1">
                Register
              </a>
              <a href="/login" className="text-blue-600 hover:text-blue-800 block px-2 py-1">
                Login
              </a> */}
              <Header_login></Header_login>
            </div>
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-gray-600 hover:text-gray-900 focus:outline-none"
              >
                <i className="fas fa-bars"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="md:hidden">
          <div id="mobile-menu" className="hidden px-4 pt-2 pb-2">
            <a
              href="#"
              className="block px-2 py-1 text-gray-600 hover:text-gray-900"
            >
              FAQ
            </a>
            <a
              href="#"
              className="block px-2 py-1 text-gray-600 hover:text-gray-900"
            >
              About Us
            </a>
            <a
              href="/pricing"
              className="block px-2 py-1 text-gray-600 hover:text-gray-900"
            >
              Pricing
            </a>
            <Header_login></Header_login>
            {/* <a
              href="/register"
              className="block px-2 py-1 text-gray-600 hover:text-gray-900"
            >
              Register
            </a>
            <a
              href="/login"
              className="block px-2 py-1 text-blue-600 hover:text-blue-800"
            >
              Login
            </a> */}
          </div>
        </div>
      </nav>
      <div className="w-full border-t border-gray-300"></div>
    </header>
  );
};
export default Header;