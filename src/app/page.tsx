"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Footer from "./@footer/default";
import Header from "./@header/default";
import Banner from "./_components/Banner";
import { RatingCard } from "./_components/RatingCard";
import "./page.css";

interface IProduct {
  sliderImg: string;
  thumbnail: string;
  rate: number;
  name: string;
}

export default function Home() {
  const [itemList, setItemList] = useState<IProduct[]>([]);

  useEffect(() => {
    fetch(
      "https://ocop-backend.vercel.app/api/products?fbclid=IwAR0ZYzhunRSp5ESvM_mx4k5ijzMyPFqpsApD-z3SchASGMYf15vts35s8MM"
    )
      .then((response) => response.json())
      .then((json) => {
        setItemList(json.data);
      });
  }, []);

  return (
    <main>
      <Header />
      <Banner />
      <section className="list-item">
        <h1 className="list-item__header">Sản phẩm</h1>
        <div className="list-item__logo">
          <img src="/OCOP-logo.png" />
        </div>
      </section>
      <div className="list-item__container ">
        {itemList.map((item, index) => {
          return (
            // <div className=" list-item__card">
            <Link href="/" className="list-item__link">
              <img
                className="list-item__thumbnail "
                src={item.thumbnail}
                alt=""
              />
              <div className="list-item__desc">
                <h2 className="list-item__title">{item.name}</h2>
                <div className="list-item__rate ml-2 mt-3">
                  <RatingCard rateNum={item.rate} size="sm" />
                </div>
              </div>
            </Link>
            // </div>
          );
        })}
      </div>
      <Footer />
    </main>
  );
}
