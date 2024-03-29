import React from "react";
import Link from "next/link";

export const TiesDownload = () => {
  return (
    <div className="p-20 ">
      <div className="container flex flex-col md:flex-row justify-center items-center gap-20">
        <div className="max-w-lg flex flex-col items-center ">
          <p className="text-xl lg:text-4xl font-black text-gray-900  mb-5">
            KHC2024 Ties Card
          </p>

          <Link
            className=" w-fit bg-red-800 p-2 lg:p-4 text-white rounded-md  shadow-md hover:bg-red-900 transition duration-300"
            href="https://kundyolanda.com/KHC2024_Ties_Card.pdf"
            download
            target="_blank"
          >
            Download
          </Link>
        </div>
        <div className="max-w-lg flex flex-col  items-center">
          <p className="text-xl lg:text-4xl font-black text-gray-900  mb-5">
            KHC2024 Invitation
          </p>

          <Link
            className=" w-fit bg-red-800 p-2 lg:p-4 text-white rounded-md  shadow-md hover:bg-red-900 transition duration-300"
            href="https://kundyolanda.com/wp-content/uploads/2024/03/KHC2024-Invitation.pdf"
            download
            target="_blank"
          >
            Download
          </Link>
        </div>
      </div>
    </div>
  );
};
