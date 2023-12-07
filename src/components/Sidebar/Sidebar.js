import { useState } from "react";
import { motion } from "framer-motion";
import { sidebarMenus } from "../../helpers/tempData";

export default function App({ currentSlide, setCurrentSlide, sliderRef }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const runAnim = (id) => {
    if (dropdownOpen === id) {
      setDropdownOpen(false);
    } else {
      setDropdownOpen(id);
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
    <aside className="h-screen w-1/6 fixed top-0 left-0 border-2 ">
      <ul className="h-screen flex flex-col justify-center px-12 font-Poppins">
        <div className="my-2 text-blue-900">
          <p className="text-xl">unnxt's</p>
          <p className="text-5xl">Portfolio</p>
        </div>
        {sidebarMenus?.map((item) => (
          <div>
            <p
              className="cursor-pointer mx-1 my-2 text-3xl font-semibold text-blue-900"
              style={{
                boxShadow: dropdownOpen === item.id ? "0px 0px 0px black" : "",
              }}
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
              {item?.clientList?.map((item) => (
                <p
                  className="my-2"
                  onClick={() => sliderRef.current.slickGoTo(item.clientId - 1)}
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
