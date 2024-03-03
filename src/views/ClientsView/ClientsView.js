import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../ClientsView/ClientsView.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CarouselImage from "../../components/CarouselImage/CarouselImage";
import loader from "../../assets/icons/loader.gif";

const ClientsView = ({
  currentSlide,
  setCurrentSlide,
  isLoading,
  sliderRef,
}) => {
  const navigate = useNavigate();
  const clientList = useSelector((state) => state.clientList.value);

  // settigs from clientPage.jsx

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
    speed: 900,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: `70%`,
          swipeToSlide: true,
          swipe: true,
        },
      },
    ],
  };
  return (
    <div className="flex w-full h-full justify-center items-center">
      {isLoading ? (
        <img src={loader} alt="Loader" />
      ) : (
        <Slider {...settings} ref={sliderRef}>
          {clientList?.map((item, index) => (
            <CarouselImage
              index={index}
              imageSrc={item.clientPic}
              onClick={() => navigate(`/ClientPage/${item.docId}`)}
            />
          ))}
        </Slider>
      )}
    </div>
  );
};

export default ClientsView;
