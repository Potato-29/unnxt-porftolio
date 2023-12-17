import React from "react";

const Modal = () => {
  return (
    <div className="w-full h-full flex flex-col absolute justify-center items-center bg-[rgba(102,102,102,0.6)]">
      <div
        className="flex flex-col justify-evenly px-4 py-4 w-1/3 h-1/3 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm
       bg-opacity-30 border border-gray-100"
      >
        <div className="flex justify-center">
          <i className="fas fa-triangle-exclamation text-3xl"></i>
        </div>
        <div className="flex justify-center">
          <p className="text-xl">Client added succesfully</p>
        </div>
        <div className="flex justify-center">
          <button className="transition-all duration-200 border rounded-full border-gray-500 my-2 py-1 px-3 bg-slate-200">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
