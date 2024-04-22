import React from "react";
import { IoMdStar } from "react-icons/io";
import "./RatingCard.css";

interface IProps {
  rateNum: number;
  size: string;
}

export function RatingCard(props: IProps) {
  return (
    <div
      className={`rate-card `}
      style={{ borderRadius: "8px", boxShadow: "" }}
    >
      <h3
        className={`rate-card__text ${
          props.size === "lg" ? "text-lg" : "text-sm"
        }
      `}
      >
        OCOP:{""}
      </h3>

      <div className="rate-card__star-box ">
        <i className={`${props.size === "lg" ? "icon-lg" : "icon-sm"}`}>
          <IoMdStar />
        </i>
        <i className={`${props.size === "lg" ? "icon-lg" : "icon-sm"}`}>
          <IoMdStar />
        </i>
        <i
          className={`${props.rateNum === 2 && "icon-opacity"} ${
            props.size === "lg" ? "icon-lg" : "icon-sm"
          }`}
        >
          <IoMdStar />
        </i>
        <i
          className={`${
            (props.rateNum === 3 || props.rateNum === 2) && "icon-opacity"
          } ${props.size === "lg" ? "icon-lg" : "icon-sm"}`}
        >
          <IoMdStar />
        </i>
        <i
          className={`${
            (props.rateNum === 4 ||
              props.rateNum === 3 ||
              props.rateNum === 2) &&
            "icon-opacity"
          } ${props.size === "lg" ? "icon-lg" : "icon-sm"}`}
        >
          <IoMdStar />
        </i>
      </div>
    </div>
  );
}
