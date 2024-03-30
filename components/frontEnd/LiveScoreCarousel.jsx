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
        Todays live matches
      </h3>

      {matches.length === 0 && (
        <div className="flex justify-center px-10 py-10">
          <p className="text-center font-semibold">No matches scheduled, please reloads the page!</p>
        </div>
      )}
      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-4  justify-items-center">
          {matches.map((match, index) => (
            <MatchCardFront key={index} match={match} />
          ))}
        </div>
      )}

      <div className="flex justify-end px-10 py-10">
        <Link
          className=" w-fit border border-blue-300 text-black p-2 lg:p-4  rounded-md  shadow-md hover:bg-blue-200 transition duration-300"
          href="https://kundyolanda.com/wp-content/uploads/2024/03/KHC2024-Invitation.pdf"
          download
          target="_blank"
        >
          View Played Matches...
        </Link>
      </div>
    </div>
  );
}

export default LiveScoreCarousel;
