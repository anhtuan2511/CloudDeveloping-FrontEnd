import React from "react";

const Footer = () => {
  return (
    <>
    <div className="w-full border-t border-gray-300 "></div>
    <footer className="bg-gray-100 py-6 flex items-center justify-center mt-auto top-[100vh]">
      <div className="text-center">
        <p className="text-gray-600">
          &copy; {new Date().getFullYear()} ERPNext. All rights reserved.
        </p>
      </div>
    </footer>
    </>
  );
};
export default Footer;
