import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import AdminSidebar from "./components/AdminSidebar/AdminSidebar";
import bgImage from "./assets/images/bg-image.jpg";
import { useSelector, useDispatch } from "react-redux";
import { collection, getDocs, query } from "firebase/firestore";
import { firestore } from "./config/firebase";
import { success } from "./store/slice";

function App({ children }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const dispatch = useDispatch();
  const sliderRef = useRef();

  const currentPath = window.location.pathname;
  const isLogin = currentPath === "/login" ? true : false;
  const isUnnat =
    JSON.parse(window.sessionStorage.getItem("userInfo")) !== null
      ? true
      : false;

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

  useEffect(() => {
    getSidebarMenus();
  }, []);

  return (
    <>
      <img
        src={bgImage}
        className="bg-image absolute w-screen h-screen z-0"
        alt=""
      />
      {!isLogin && !isUnnat && (
        <>
          <Sidebar
            currentSlide={currentSlide}
            setCurrentSlide={setCurrentSlide}
            sliderRef={sliderRef}
          />
        </>
      )}
      {isUnnat && <AdminSidebar />}
      <main
        className={`z-10 relative ${
          isLogin ? "h-screen" : "h-screen -ml-[calc(0%-16.66667%)] px-3 py-4"
        }`}
      >
        {React.cloneElement(children, {
          currentSlide: currentSlide,
          setCurrentSlide: setCurrentSlide,
          sliderRef: sliderRef,
        })}
      </main>
    </>
  );
}

export default App;
