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

export const SponsorsScroll = ({ images, speed }) => {
  return (
      <div className="banner-wrapper">
        <p className="text-xl lg:text-4xl font-black text-gray-900  mb-5 text-center ">
          Our sponsor&apos;s
        </p>
        <div className="wrapper">
          <ImageSection images={images} speed={speed} />
          {/* <ImageSection images={images} speed={speed} /> */}
        </div>
      </div>
  );
};
