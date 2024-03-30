"use client";

import { useEffect, useState } from "react";
import { MatchCardFront } from "./MatchCardFront";
import { Loader } from "../common/Loader";
import Link from "next/link";

function LiveScoreCarousel() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const response = await fetch("/api/matches", { cache: "no-store" });
      if (!response.ok) {
        throw new Error("Failed to fetch matches");
      }
      const data = await response.json();
      setMatches(data.matches);
    } catch (error) {
      console.error("Error fetching matches:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20  bg-orange-200">
      <h3 className="text-xl lg:text-4xl font-black text-gray-900  mb-10 text-center capitalize">
        Today&apos;s live matches
      </h3>

      {loading ? (
        <div className="flex justify-center">Loading matches...</div>
      ) : (
        <>
          {matches.length === 0 ? (
            <div className="flex justify-center ">
              <p className="text-center font-semibold">
                No matches scheduled, please reload the page!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-4  justify-items-center">
              {matches.map((match, index) => (
                <MatchCardFront key={index} match={match} />
              ))}
            </div>
          )}
        </>
      )}

      <div className="flex justify-center md:justify-end px-10 py-10">
        <Link
          href=""
          className="group relative grid overflow-hidden rounded-full px-4 py-3 shadow-[0_1000px_0_0_hsl(0_0%_20%)_inset] transition-colors duration-200"
        >
          <span>
            <span className="spark mask-gradient animate-flip before:animate-rotate absolute inset-0 h-[100%] w-[100%] overflow-hidden rounded-full [mask:linear-gradient(white,_transparent_50%)] before:absolute before:aspect-square before:w-[200%] before:rotate-[-90deg] before:bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] before:content-[''] before:[inset:0_auto_auto_50%] before:[translate:-50%_-15%]" />
          </span>
          <span className="backdrop absolute inset-[1px] rounded-full bg-black transition-colors duration-200 group-hover:bg-slate-800" />
          <span className="text z-10 text-[#cbd5e1]">Played matches -&gt;</span>
        </Link>
      </div>
    </div>
  );
}

export default LiveScoreCarousel;
