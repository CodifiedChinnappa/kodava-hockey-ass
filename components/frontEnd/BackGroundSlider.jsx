"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

const imageSlides = [
  {
    url: "/img1.JPG",
    title: "Kundiyolanda",
    body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae velit dolorem at repudiandae ut .",
  },
  {
    url: "/img2.JPG",
    title: "Kundiyolanda",
    body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae velit dolorem at repudiandae ut .",
  },
  {
    url: "/img3.JPG",
    title: "Kundiyolanda",
    body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae velit dolorem at repudiandae ut .",
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

  return (
    <div className="h-full relative ">
      <div style={{ width: "100vw", height: "91vh" }}>
        <Image
          src={imageSlides[currentState].url}
          layout="fill"
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
          alt="name"
        />
      </div>

      <div class="bg-white opacity-75 p-1 md:p-3 sm:w-full absolute w-[280px] md:w-[600px] z-auto bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 sm:top-auto sm:left-1/4 md:left-2/4 flex flex-col space-y-5">
        <div>
          <h1 className="text-lg md:text-4xl">
            {imageSlides[currentState].title}{" "}
          </h1>
          <p className="text-sm md:text-xl">
            {imageSlides[currentState].body}{" "}
          </p>
        </div>
        <div className="flex items-center justify-center space-x-3 ">
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
