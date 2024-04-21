"use client";
import React, { useEffect, useRef, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { IoMdStar } from "react-icons/io";
import { SwiperSlide, Swiper } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import "./Banner.css";
import { RatingCard } from "./RatingCard";
import { IProduct } from "../page";

// Kích hoạt hiệu ứng fade
SwiperCore.use([EffectFade]);

interface IProps {
  products: IProduct[];
}

export default function Banner(props: IProps): React.ReactNode {
  const products = props.products;
  const swiperRef = useRef<any>(null);
  const router = useRouter();

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.swiper.allowTouchMove = false;
      console.log("swiper1", swiperRef.current?.swiper.autoplay);
    }
  }, [products]);

  return (
    <div className="banner">
      {products.length > 0 && (
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
          spaceBetween={30}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, EffectFade]}
        >
          {products.length > 0 &&
            products.map((item, index) => {
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
      {products.length > 0 && (
        <Swiper
          ref={swiperRef}
          initialSlide={1} // Bắt đầu từ slide thứ 1
          speed={1000}
          allowTouchMove={true}
          className="slider"
          slidesPerView={3}
          spaceBetween={50}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            // paused: false,
          }}
          modules={[Autoplay]}
        >
          {products.length > 0 &&
            products.map((item, index) => {
              return (
                <SwiperSlide key={index} className="card-slider">
                  <div
                    onClick={() => router.push(`/${item._id}`)}
                    className="card-slider"
                  >
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
                      src={item.sliderThumbnail}
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
