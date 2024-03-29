"use client";

import Header from "@/components/backOffice/navbar/Header";
import Sidebar from "@/components/backOffice/sidebar/Sidebar";
import { useEffect, useState } from "react";

export default function RootLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.theme === "dark" || !("theme" in localStorage)) {
        document.documentElement.classList.add("dark");
        document.documentElement.style.colorScheme = "dark";
      } else {
        document.documentElement.classList.remove("dark");
        document.documentElement.style.colorScheme = "light";
      }
      if (localStorage.getItem("sidebar-expanded") == "true") {
        document.querySelector("body").classList.add("sidebar-expanded");
      } else {
        document.querySelector("body").classList.remove("sidebar-expanded");
      }
    }
  }, []);
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden ">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* main */}
        <main>
          <div className=" w-full max-w-9xl mx-auto  bg-blue-500 ">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
