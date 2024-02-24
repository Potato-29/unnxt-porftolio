import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { firestore } from "../../config/firebase";
import { success } from "../../store/slice";
import { ToastContainer, toast } from "react-toastify";
import { toastOptions } from "../../helpers/toastOptions";
import { sidebarMenus } from "../../helpers/tempData";

const AdminSidebar = ({ currentSlide, setCurrentSlide, sliderRef }) => {
  const navigate = useNavigate();
  const [isRemoveOpen, setIsRemoveOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const clientList = useSelector((state) => state.clientList.value);
  const dispatch = useDispatch();

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

  const getSidebarMenus = async () => {
    let results;

    const clientListSnap = await getDocs(
      collection(firestore, "sidebar-menus", `1`, "clientList")
    );
    let sortedArray = [];
    clientListSnap.forEach(async (item) => {
      let clientData = item.data();
      let obj = { ...clientData, docId: item.id };
      // results.push(obj);
      // results.push(item.data());
      sortedArray.push(obj);
    });

    results = sortedArray.sort((a, b) => a.clientId - b.clientId);

    dispatch(success(results));
  };

  const deleteClient = async (item) => {
    await deleteDoc(
      doc(firestore, "sidebar-menus", `1`, "clientList", item.docId)
    )
      .then((result) => {
        console.log("--------", result);
        toast.success("Client deleted!", toastOptions);
        getSidebarMenus();
      })
      .catch((error) => {
        toast.error("Failed to delete!", toastOptions);
        console.log("--------- err", error);
      });
  };

  return (
    <aside className="h-screen w-1/6 fixed top-0 left-0 border-2 ">
      <ToastContainer />
      <ul className="h-screen flex flex-col justify-center px-12 font-Poppins">
        <div className="my-2 text-blue-900">
          <p className="text-xl">unnxt's</p>
          <p className="text-5xl">Portfolio</p>
        </div>
        {/* 
        {sidebarMenus?.map((item, index) => (
          <div key={`menu-${index}`}>
            <p
              className={`transition-all duration-300 cursor-pointer mx-1 my-2 text-3xl font-semibold text-blue-900
              hover:[text-shadow:_2px_3px_25px_rgb(0_0_0_/_50%)] ${
                dropdownOpen === item.id
                  ? "[text-shadow:_2px_3px_25px_rgb(0_0_0_/_50%)]"
                  : ""
              }`}
              onClick={() => {
                navigate("/dashboard");
                runAnim(item.id);
              }}
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
        ))} */}

        <div>
          <p
            className={`transition-all duration-300 cursor-pointer mx-1 my-2 text-3xl font-semibold text-blue-900
          hover:[text-shadow:_2px_3px_25px_rgb(0_0_0_/_50%)]`}
            onClick={() => navigate("/dashboard/add")}
          >
            Add
          </p>
        </div>
        <div>
          <p
            className={`transition-all duration-300 cursor-pointer mx-1 my-2 text-3xl font-semibold text-blue-900
          hover:[text-shadow:_2px_3px_25px_rgb(0_0_0_/_50%)]`}
            onClick={() => {
              // navigate("/dashboard/remove");
              setIsRemoveOpen(!isRemoveOpen);
              getSidebarMenus();
            }}
          >
            Remove
          </p>

          <motion.div
            className="text-sm px-3"
            initial="closed"
            animate={isRemoveOpen ? "open" : "closed"}
            variants={anim}
          >
            {clientList.length > 0 &&
              clientList?.map((item, index) => (
                <p
                  key={`client-${index}`}
                  className={`my-2 cursor-pointer transition-all duration-700 hover:scale-110 hover:ml-2`}
                  onClick={() => deleteClient(item)}
                >
                  {item.clientName}
                </p>
              ))}
          </motion.div>
        </div>
      </ul>
    </aside>
  );
};

export default AdminSidebar;
