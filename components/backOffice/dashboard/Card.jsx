import React from "react";
// import Icon from '../../images/icon-01.svg';
import Link from "next/link";
import LineChart01 from "../charts/LineChart01";

// Import utilities

function Card({ cardInfo }) {
  return (
    <div
      className={`flex flex-col col-span-full sm:col-span-6 lg:col-span-4 ${
        !cardInfo.chartData && "lg:col-span-3"
      } bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700`}
    >
      <div className="p-5">
        <header className="flex justify-between items-start mb-2">
          {/* Icon */}
          {/* <img src={Icon} width="32" height="32" alt="Icon 01" /> */}
        </header>
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">
          {cardInfo.title}
        </h2>

        <div className="flex items-start">
          <div className="text-3xl font-bold text-slate-800 dark:text-slate-100 mr-2">
            &#8377; {cardInfo.amount}
          </div>
          {/* <div className="text-sm font-semibold text-white px-1.5 bg-emerald-500 rounded-full">
            +49%
          </div> */}
        </div>
      </div>
      {/* Chart built with Chart.js 3 */}
      {cardInfo.chartData && (
        <div className="grow max-sm:max-h-[128px] xl:max-h-[128px]">
          {/* Change the height attribute to adjust the chart height */}
          <LineChart01 data={cardInfo.chartData} width={389} height={128} />
        </div>
      )}
    </div>
  );
}

export default Card;
