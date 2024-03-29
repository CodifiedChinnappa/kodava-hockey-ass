import Image from "next/image";
import React from "react";

export const Welcome = () => {
  return (
    <div className="p-20 bg-orange-200">
      <div className="container flex flex-col md:flex-row justify-center items-center gap-3">
        <Image src="/KHC.png" width={350} height={350} alt="Logo" />
        <div className="max-w-lg " style={{ margin: "0px" }}>
          <p className="text-4xl font-black text-gray-900  mb-5">
            Welcome to Kundyolanda Hockey Carnival
          </p>
          <p className="tracking-normal text-black md:text-lg ">
            Welcome to the official website of the Kundyolanda Hockey Carnival
            2024! Get ready for thrilling hockey matches and fun activities. We
            extend a warm invite to everyone to be a part of the 24th Kodava
            Hockey Festival, starting March 30th, 2024, and running until April
            30th, 2024.
          </p>
        </div>
      </div>
    </div>
  );
};
