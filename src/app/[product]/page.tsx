"use client";
import React, { useEffect, useState } from "react";

import "./styles.scss";
import { RatingCard } from "../_components/RatingCard";

interface IProduct {
  name: string;
  client: string;
  content: string;
  ingredient: string;
  description: string;
  thumbnail: string;
  detailThumbnail: string;
  sliderImg: string;
  qrCode: string;
  rate: number;
  supplyId: {
    phone: string;
    supplyAssociation: string;
    supplyLocation: string;
  };
}

export default function Product({ params }: { params: { product: string } }) {
  const [data, setData] = useState<IProduct>();
  const id = params.product;

  useEffect(() => {
    fetch(`https://ocop-backend.vercel.app/api/products/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setData(json.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="detailProduct">
      <section>
        <img src={data?.sliderImg} id="bg" />
        <img
          src="https://cdit.ptit.edu.vn/ocop2/images/details/spmoccaukhecoc1.png"
          alt=""
          id="moon1"
        />
        <img
          src="https://cdit.ptit.edu.vn/ocop2/images/details/may1.png"
          alt=""
          id="road"
        />
        <img
          src="https://cdit.ptit.edu.vn/ocop2/images/titleHome/Tra%20moc%20cau%20Khe%20Coc-%20pc.png"
          alt=""
          id="saobang1"
        />
      </section>
      <div className="nameProduct">
        <h1>{data?.name}</h1>
      </div>
      <div className="headerContent">
        <img
          src="https://cdit.ptit.edu.vn/ocop2/images/qr/qrnontamtrahoanxuyen.png"
          alt=""
        />
        <div className="social">
          <div className="itemSocial">
            <img
              src="https://cdit.ptit.edu.vn/ocop2/images/details/home.png"
              alt=""
            />
            <h3>{data?.supplyId?.supplyAssociation}</h3>
          </div>
          <div className="itemSocial">
            <img
              src="https://cdit.ptit.edu.vn/ocop2/images/details/location.png"
              alt=""
            />
            <h3>{data?.supplyId?.supplyLocation}</h3>
          </div>
          <div className="itemSocial">
            <img
              src="https://cdit.ptit.edu.vn/ocop2/images/details/moblie.png"
              alt=""
            />
            <h3>{data?.supplyId?.phone}</h3>
          </div>
        </div>
      </div>
      <div className="addressProduct-container">
        <div className="addressProduct">
          <div className="imgProduct">
            <img
              src="https://cdit.ptit.edu.vn/ocop2/images/iconPro/Anhsanphamtrangcon_Tra%20moc%20cau%20Khe%20Coc-20.png"
              alt=""
            />
          </div>
          <div className="content">
            <h2>{data?.name}</h2>
            <div className="des"></div>
            <p>Người đại diện: {data?.client}</p>
            <p>Thành Phần: {data?.ingredient}</p>
            <p>Thời hạn sử dụng sản phẩm: 12 tháng kể từ ngày sản xuất</p>
            <p>{data?.description}</p>

            <div className="ocopRate">
              <RatingCard rateNum={data?.rate} size="sm" />
            </div>
          </div>
        </div>
      </div>
      <div className="storyProduct">
        <div className="content">
          <div className="contain">
            <h2>CÂU TRUYỆN SẢN PHẨM</h2>
            <div className="img2">
              {/* <img
                src="https://cdit.ptit.edu.vn/ocop2/images/certificate/giay%20chung%20nhan%20htx%20hoan%20xuyen.jpg"
                alt=""
              /> */}
              <div className="info">{data?.content}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="img360">
        <div className="text">Vùng nguyên liệu</div>

        <iframe src="https://momento360.com/e/u/ade63444623d4d72b55a51d5e750c620?utm_campaign=embed&utm_source=other&heading=73.85&pitch=16.51&field-of-view=75&size=medium&display-plan=true"></iframe>
      </div>
    </div>
  );
}
