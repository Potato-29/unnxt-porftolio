import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../config/firebase";
import { useParams } from "react-router-dom";
import loader from "../../assets/icons/loader.gif";
import {
  clientInfoFailure,
  clientInfoSuccess,
} from "../../store/clientInfoSlice/slice";
import { toastOptions } from "../../helpers/toastOptions";
import { toast } from "react-toastify";
import CarouselImage from "../../components/CarouselImage/CarouselImage";

const ClientPage = () => {
  const clientSliderRef = useRef();
  const clientInfo = useSelector((state) => state.clientInfo.value);
  const [isLoading, setIsLoading] = useState(true);
  const { clientData } = clientInfo;

  const dispatch = useDispatch();
  const { id } = useParams();

  const getClientData = async () => {
    setIsLoading(false);
    let results;
    try {
      const clientListSnap = await getDoc(
        doc(firestore, `sidebar-menus/1/clientList/${id}`)
      );

      results = clientListSnap.data();

      results.clientData = results.clientData.sort(
        (a, b) => a.fileOrderId - b.fileOrderId
      );

      dispatch(clientInfoSuccess(results));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      dispatch(clientInfoFailure(error));
      toast.error("Failed to retreive data!", toastOptions);
    }
  };

  const settings = {
    dots: false,
    accessibility: false,
    infinite: true,
    slidesToShow: 1,
    centerMode: true,
    swipeToSlide: true,
    touchMove: true,
    swipe: true,
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

  useEffect(() => {
    getClientData();
  }, [id]);

  return (
    <div className="flex w-full h-full justify-center items-center">
      {isLoading ? (
        <img src={loader} alt="Loader" />
      ) : (
        <Slider {...settings} ref={clientSliderRef}>
          {clientData?.map((item, index) => (
            <CarouselImage
              imageSrc={item.fileUrl}
              index={index}
              onClick={null}
            />
          ))}
        </Slider>
      )}
    </div>
  );
};

export default ClientPage;
