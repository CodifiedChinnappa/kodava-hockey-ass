import Image from "next/image";
import React from "react";

export function ImageSection({ images, speed }) {
  const imagesStyle = {
    animation: `swipe ${speed}ms linear infinite`,
  };

  return (
    <div className="images" style={imagesStyle}>
      {images.map(({ src, name }) => (
        <Image src={src} alt={name} width={300} height={300} key={src} />
      ))}
    </div>
  );
}

export const CustomScroll = ({ images, speed }) => {
  return (
    <div>
      <div className="banner-wrapper">
        <div className="wrapper">
          <ImageSection images={images} speed={speed} />
        </div>
      </div>
    </div>
  );
};
