import { useState } from "react";
import { motion } from "framer-motion";
// import { sidebarMenus } from "../../helpers/tempData";
import React from "react";
import { useSelector } from "react-redux";
import { sidebarMenus } from "../../helpers/tempData";

export default function App({ currentSlide, setCurrentSlide, sliderRef }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
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

  return (
    <aside className="hidden lg:block h-screen w-1/6 fixed top-0 left-0">
      <ul className="h-screen flex flex-col justify-center px-12 font-Poppins">
        <div className="my-2 text-blue-900">
          <p className="text-xl">unnxt's</p>
          <p className="text-5xl">Portfolio</p>
        </div>
        {sidebarMenus?.map((item, index) => (
          <div key={`menu-${index}`}>
            <p
              className={`transition-all duration-300 cursor-pointer mx-1 my-2 text-3xl font-semibold text-blue-900`}
              onClick={() => runAnim(item.id)}
            >
              {item.name}
            </p>

            <motion.div
              className="text-sm px-3"
              initial="closed"
              animate={dropdownOpen === item.id ? "open" : "closed"}
              variants={anim}
            >
              {clientList.length > 0 &&
                clientList?.map((item, index) => (
                  <p
                    key={`client-${index}`}
                    className={`my-2 cursor-pointer transition-all duration-700 hover:scale-110 hover:ml-2 ${
                      currentSlide === index ? "" : ""
                    }`}
                    onClick={() => sliderRef.current.slickGoTo(index)}
                  >
                    {item.clientName}
                  </p>
                ))}
            </motion.div>
          </div>
        ))}
      </ul>
    </aside>
  );
}
