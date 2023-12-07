import React, { useRef, useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import bgImage from "./assets/images/bg-image.jpg";
function App({ children }) {
  const [currentSlide, setCurrentSlide] = useState(1);
  const sliderRef = useRef();

  return (
    <>
      <img
        src={bgImage}
        className="bg-image absolute w-screen h-screen"
        alt=""
      />
      <Sidebar
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
        sliderRef={sliderRef}
      />
      <main className="h-screen -ml-[calc(0%-16.66667%)] px-3 py-4">
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
