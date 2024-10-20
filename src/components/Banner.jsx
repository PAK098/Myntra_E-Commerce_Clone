import React from "react";

const Banner = ({ backgroundImage, bannerTag }) => {
  return (
    <div
      className="banner"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <h1 className="banner-text">{bannerTag}</h1>
    </div>
  );
};

export default Banner;
