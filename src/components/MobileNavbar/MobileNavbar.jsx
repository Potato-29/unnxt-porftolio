import React, { useState } from "react";
import menuIcon from "../../assets/icons/menu.svg";
import { useSelector } from "react-redux";
import { sidebarMenus } from "../../helpers/tempData";

const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const clientList = useSelector((state) => state.clientList.value);

  return (
    <div className="absolute w-full z-[999] top-0 bg-[#e5e7eb] font-Poppins flex justify-between items-center">
      <div className="my-2 text-blue-900 px-2">
        <p className="text-xl">unnxt</p>
      </div>
      <div className="px-2" onClick={() => setIsOpen(true)}>
        <img className="h-8 w-8" src={menuIcon} alt="menu-icon" />
      </div>
      <div
        className={`fixed inset-y-0 right-0 w-full bg-custom-image bg-center bg-cover z-50 transform transition duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-end p-4">
          <button
            onClick={() => setIsOpen(false)}
            className="text-blue-900 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="000000"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <nav className="text-blue-900 flex justify-end h-full w-full">
          <ul className="w-full flex flex-col justify-center items-end h-full text-center pb-10">
            {sidebarMenus.map((item) => (
              <li
                className={`mx-1 my-2 text-3xl font-semibold text-blue-900 text-center w-full`}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default MobileNavbar;
