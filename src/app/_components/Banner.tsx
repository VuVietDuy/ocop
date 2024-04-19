"use client";
import React, { useEffect, useRef, useState } from "react";
import "./Banner.css";
import { SwiperSlide, useSwiper, Swiper, SwiperClass } from "swiper/react";
import {
  Autoplay,
  Controller,
  EffectFade,
  FreeMode,
  Navigation,
  Pagination,
} from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { RatingCard } from "./RatingCard";
import { IoMdStar } from "react-icons/io";

import img1 from "../../../public/OCOP_mangluctruc.png";
import img2 from "../../../public/OCOP_hongphuoctra.png";
import img3 from "../../../public/OCOP_tramamsuongsonHuongQue.png";
import img4 from "../../../public/OCOP_mangluctruc.png";
const Image = [
  "/OCOP_hongphuoctra.png",
  "/OCOP_mangluctruc.png",
  "/OCOP_tramamsuongsonHuongQue.png",
  "/OCOP_hongphuoctra.png",
];

// import "swiper/swiper-bundle.min.css";
import SwiperCore from "swiper";

// Kích hoạt hiệu ứng fade
SwiperCore.use([EffectFade]);

interface IProduct {
  sliderImg?: string;
  thumbnail?: string;
  rate: number;
  name: string;
}

export default function Banner(
  ref: React.MutableRefObject<HTMLElement | undefined | null>
) {
  const [itemList, setItemList] = useState<IProduct[]>([]);
  const [controlledSwiper, setControlledSwiper] = useState<SwiperClass>();

  const backgroundRef = useRef<any>(null);
  const swiperRef = useRef<any>(null);
  useEffect(() => {
    fetch(
      "https://ocop-backend.vercel.app/api/products?fbclid=IwAR0ZYzhunRSp5ESvM_mx4k5ijzMyPFqpsApD-z3SchASGMYf15vts35s8MM"
    )
      .then((response) => response.json())
      .then((json) => {
        setItemList(json.data);
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.swiper.allowTouchMove = false;
      // swiperRef.current.swiper.autoplay.paused = false;
      // swiperRef.current.swiper.realIndex = 0;

      console.log("swiper1", swiperRef.current?.swiper.autoplay);
    }
  }, [itemList]);
  console.log("check itemList: ", itemList);
  return (
    <div className="banner">
      {itemList.length > 0 && (
        <Swiper
          className="banner-container"
          ref={swiperRef}
          fadeEffect={{
            crossFade: true, // Cho phép hiệu ứng fade chéo
          }}
          speed={1000}
          allowTouchMove={false}
          slidesPerView={1}
          initialSlide={1} // Bắt đầu từ slide thứ 1
          effect={"fade"}
          onSlideChange={() => {
            const slideIndex = swiperRef.current?.swiper?.realIndex;
            console.log("check slider 1: ", slideIndex);
          }}
          spaceBetween={30}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          // pagination={{
          //   type: "fraction",
          // }}
          modules={[Autoplay, EffectFade, Pagination]}
        >
          {itemList.length > 0 &&
            itemList.map((item, index) => {
              return (
                <SwiperSlide key={index} className="bg-slider banner-container">
                  <img
                    style={{ width: "100%" }}
                    src={item?.sliderImg}
                    alt=""
                    className="sliderImg"
                    loading="lazy"
                  />
                  <div
                    className="bg-slider-content"
                    style={{ position: "absolute", top: "50%", left: "100px" }}
                  >
                    <h1>{item.name}</h1>
                    <RatingCard size="lg" rateNum={item.rate} />
                  </div>
                </SwiperSlide>
              );
            })}
        </Swiper>
      )}

      {/* Card Slider  */}
      {itemList.length > 0 && (
        <Swiper
          ref={swiperRef}
          initialSlide={1} // Bắt đầu từ slide thứ 1
          speed={1000}
          allowTouchMove={true}
          className="slider"
          slidesPerView={3}
          onSlideChange={() => {
            const slideIndex = swiperRef.current?.swiper?.realIndex;
            console.log("check slider 2: ", slideIndex);
          }}
          spaceBetween={50}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            // paused: false,
          }}
          modules={[Autoplay]}
        >
          {itemList.length > 0 &&
            itemList.map((item, index) => {
              return (
                <SwiperSlide key={index} className="card-slider">
                  <div className="card-slider">
                    <div className="card-slider__title">
                      <h3>{item.name}</h3>
                      <div className="card-slider__star">
                        <i>
                          <IoMdStar />
                        </i>
                        <i>
                          <IoMdStar />
                        </i>
                        <i className={`${item.rate === 2 && "icon-opacity"} `}>
                          <IoMdStar />
                        </i>
                        <i
                          className={`${
                            (item.rate === 3 || item.rate === 2) &&
                            "icon-opacity"
                          } `}
                        >
                          <IoMdStar />
                        </i>
                        <i
                          className={`${
                            (item.rate === 4 ||
                              item.rate === 3 ||
                              item.rate === 2) &&
                            "icon-opacity"
                          } `}
                        >
                          <IoMdStar />
                        </i>
                      </div>
                    </div>
                    <img
                      style={{ width: "100%" }}
                      src={item.thumbnail}
                      alt=""
                      className="sliderImg"
                      loading="lazy"
                    />
                  </div>
                </SwiperSlide>
              );
            })}
        </Swiper>
      )}
    </div>
  );
}
