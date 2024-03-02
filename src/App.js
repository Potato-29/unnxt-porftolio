import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import AdminSidebar from "./components/AdminSidebar/AdminSidebar";
import bgImage from "./assets/images/bg-image.jpg";
import { useSelector, useDispatch } from "react-redux";
import { collection, getDocs, query } from "firebase/firestore";
import { firestore } from "./config/firebase";
import { success } from "./store/slice";
import MobileNavbar from "./components/MobileNavbar/MobileNavbar";
import { getImageURL } from "./helpers/firestoreActions/firestoreActions";

function App({ children }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const sliderRef = useRef();

  const currentPath = window.location.pathname;
  const isLogin = currentPath === "/login" ? true : false;
  const isUnnat =
    JSON.parse(window.sessionStorage.getItem("userInfo")) !== null
      ? true
      : false;

  const getSidebarMenus = async () => {
    setIsLoading(true);
    let results;

    try {
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

      if (results) {
        for (let i = 0; i < results.length; i++) {
          results[i].clientPic = await getImageURL(results[i]?.clientPic);
        }
      }

      dispatch(success(results));
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSidebarMenus();
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handleResize = (e) => {
      setIsMobile(e.matches);
    };

    // Initial check
    handleResize(mediaQuery);

    // Add event listener
    mediaQuery.addEventListener("change", handleResize);

    // Cleanup function
    return () => {
      // Remove event listener on component unmount
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);

  return (
    <div className=" bg-custom-image bg-center bg-cover ">
      {/* <img
        src={bgImage}
        className="bg-image absolute w-screen h-screen z-0"
        alt=""
      /> */}
      {!isLogin && !isUnnat && (
        <>
          {isMobile ? (
            <MobileNavbar />
          ) : (
            <Sidebar
              currentSlide={currentSlide}
              setCurrentSlide={setCurrentSlide}
              sliderRef={sliderRef}
            />
          )}
        </>
      )}
      {isUnnat && (
        <AdminSidebar
          currentSlide={currentSlide}
          setCurrentSlide={setCurrentSlide}
          sliderRef={sliderRef}
        />
      )}
      <main
        className={`z-10 relative ${
          isLogin
            ? "h-screen"
            : "h-screen lg:-ml-[calc(0%-16.66667%)] px-0 lg:px-3 py-4"
        }`}
      >
        {React.cloneElement(children, {
          currentSlide: currentSlide,
          setCurrentSlide: setCurrentSlide,
          sliderRef: sliderRef,
          isLoading,
        })}
      </main>
    </div>
  );
}

export default App;
