import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const CarouselImage = ({ imageSrc, index, onClick }) => {
  const navigate = useNavigate();

  return (
    <div className={``} key={`clientName-${index}`} onClick={onClick}>
      <img
        src={imageSrc}
        className={`w-[778.5px] h-[500px] rounded-3xl`}
        alt={`clientImage-${index}`}
      />
    </div>
  );
};

export default CarouselImage;
