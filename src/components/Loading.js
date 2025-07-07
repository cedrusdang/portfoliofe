import React from "react";
import "./Loading.css";

export default function Loading() {
  return (
    <div className="loading-overlay loading-overlay-solid">
      <div className="loading-center">
        <div className="wave-loader">
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
        </div>
        <div className="loading-title">
          Little lemon:{" "}
          <span className="loading-desc">
            The little mediterranean world in chicago
          </span>
        </div>
      </div>
    </div>
  );
}
