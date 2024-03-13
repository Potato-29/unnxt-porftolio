import React, { useState } from "react";
import menuIcon from "../../assets/icons/menu.svg";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { sidebarMenus } from "../../helpers/tempData";
import { useLocation, useNavigate } from "react-router-dom";

const MobileNavbar = ({ currentSlide, setCurrentSlide, sliderRef }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const clientList = useSelector((state) => state.clientList.value);

  const runAnim = (id) => {
    if (dropdownOpen === id) {
      setDropdownOpen(false);
    } else {
      if (id === 1) {
        setDropdownOpen(id);
      } else {
        setDropdownOpen(false);
      }
    }
  };

  const anim = {
    open: {
      y: 0,
      transition: { type: "spring", duration: 0.3, delay: 0.2 },
      display: "block",
    },
    closed: {
      y: -10,
      transition: {
        type: "spring",
        duration: 0.3,
      },
      transitionEnd: {
        display: "none",
      },
    },
  };

  const handleClientClick = (index, item) => {
    if (location.pathname.includes("ClientPage")) {
      navigate(`/ClientPage/${item.docId}`);
    } else {
      sliderRef.current.slickGoTo(index);
      setIsOpen(false);
    }
  };
  return (
    <div className="absolute w-full z-[999] top-0 bg-[#e5e7eb] font-Poppins flex justify-between items-center">
      <div className="my-2 text-blue-900 px-2" onClick={() => navigate("/")}>
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
          <ul className="w-full flex flex-col justify-center items-center h-full text-center pb-10">
            {sidebarMenus?.map((item, index) => (
              <div key={`menu-${index}`}>
                <p
                  className={`transition-all text-center duration-300 cursor-pointer mx-1 my-2 text-3xl font-semibold text-blue-900`}
                  onClick={() => runAnim(item.id)}
                >
                  {item.name}
                </p>

                <motion.div
                  className="text-sm px-3 text-center"
                  initial="closed"
                  animate={dropdownOpen === item.id ? "open" : "closed"}
                  variants={anim}
                >
                  {clientList.length > 0 &&
                    clientList?.map((item, index) => (
                      <p
                        key={`client-${index}`}
                        className={`my-2 text-center cursor-pointer transition-all duration-700 hover:scale-110 hover:ml-2 ${
                          currentSlide === index ? "" : ""
                        }`}
                        onClick={() => handleClientClick(index, item)}
                      >
                        {item.clientName}
                      </p>
                    ))}
                </motion.div>
              </div>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default MobileNavbar;
