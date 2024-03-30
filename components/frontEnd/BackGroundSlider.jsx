"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const imageSlides = [
  {
    url: "https://images.unsplash.com/photo-1707343848723-bd87dea7b118?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Nature Scene",
    body: "Beautiful nature scene with trees and mountains.",
  },
  {
    url: "https://images.unsplash.com/photo-1708649290066-5f617003b93f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Architectural Marvel",
    body: "Stunning architectural design with modern buildings.",
  },
  {
    url: "https://images.unsplash.com/photo-1711139299064-f60e2753163f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
    height: "100vh",
    width:"100%",
  };
  return (
    <div className="h-full relative ">
      <div style={bgImageStyle}></div>
      <div className="w-full h-[100vh] sm:m-auto absolute z-auto top-0 left-0 bg-gradient-to-r from-cyan-600 "></div>
      <div className=" sm:w-full absolute w-[280px]  md:w-[600px] z-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 sm:top-1/2 sm:left-1/4 flex flex-col space-y-5">
        <div>
          <h1 className="text-lg md:text-4xl">{imageSlides[currentState].title} </h1>
          <p className="text-sm md:text-xl">{imageSlides[currentState].body} </p>
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
