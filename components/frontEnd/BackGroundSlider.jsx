"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const imageSlides = [
  {
    url: "/carousel/img1.jpg",
    title: "Kundiyolanda",
    body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae velit dolorem at repudiandae ut .",
  },
  {
    url: "/carousel/img2.jpg",
    title: "Architectural Marvel",
    body: "Stunning architectural design with modern buildings.",
  },
  {
    url: "/carousel/img3.jpg",
    title: "Technological Innovation",
    body: "Cutting-edge technology with futuristic designs.",
  },
];

export const BackGroundSlider = () => {
  const [currentState, setCurrentState] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentState((currentState + 1) % imageSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  });

  const bgImageStyle = {
    backgroundImage: `url(${imageSlides[currentState].url})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    height: "91vh",
    width: "100%",
  };
  return (
    <div className="h-full relative ">
      <div style={bgImageStyle}></div>
      <div className="w-full h-[91vh] sm:m-auto absolute z-auto top-0 left-0 bg-gradient-to-r from-cyan-600 "></div>
      <div className=" sm:w-full absolute w-[280px]  md:w-[600px] z-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 sm:top-1/2 sm:left-1/4 flex flex-col space-y-5">
        <div>
          <h1 className="text-lg md:text-4xl">
            {imageSlides[currentState].title}{" "}
          </h1>
          <p className="text-sm md:text-xl">
            {imageSlides[currentState].body}{" "}
          </p>
        </div>
        <div className="flex items-center space-x-3 ">
          {imageSlides.map((slide, index) => (
            <span
              key={index}
              onClick={() => setCurrentState(index)}
              className={cn(
                "text-1xl w-[45px] h-2 rounded-xl cursor-pointer shadow-sm",
                {
                  "bg-red-500": index === currentState,
                  "bg-slate-300": index !== currentState,
                }
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
