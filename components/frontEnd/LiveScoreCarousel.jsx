"use client";

import { useEffect, useState } from "react";
import { MatchCardFront } from "../common/MatchCardFront";
import { Loader } from "../common/Loader";

function LiveScoreCarousel() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
   
    fetchMatches();
  },[]);

  const fetchMatches = async () => {
    try {
      const response = await fetch("/api/matches");
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
    <div className=" min-h-screen pt-7 pb-10  text-gray-600 ">
    <h3 className="text-2xl font-extrabold  leading-snug text-center capitalize mb-10">
      Todays matches
    </h3>
    {loading ? (
      <Loader />
    ) : (
      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {matches.map((match, index) => (
          <MatchCardFront key={index} match={match} />
        ))}
      </div>
    )}
  </div>
  );
}

export default LiveScoreCarousel;
