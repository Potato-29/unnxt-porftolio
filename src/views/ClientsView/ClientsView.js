import React from "react";
import { sidebarMenus } from "../../helpers/tempData";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../ClientsView/ClientsView.css";

const ClientsView = ({ currentSlide, setCurrentSlide, sliderRef }) => {
  const settings = {
    dots: false,
    accessibility: false,
    infinite: true,
    slidesToShow: 1,
    centerMode: true,
    swipeToSlide: false,
    swipe: false,
    arrows: false,
    centerPadding: "20px",
    slidesToScroll: 1,
    vertical: true,

    verticalSwiping: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="flex w-full h-full border-2 border-white justify-center items-center">
      <Slider {...settings} ref={sliderRef}>
        {sidebarMenus[0]?.clientList?.map((item, index) => (
          <div className={``}>
            <img
              src={item.clientPic}
              className={`w-3/4 h-3/4 rounded-3xl`}
              alt=""
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ClientsView;
