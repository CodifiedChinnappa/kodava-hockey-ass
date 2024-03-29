"use client";

import { useEffect, useState } from "react";
import { MatchCardFront } from "../common/MatchCardFront";

function LiveScoreCarousel() {
  const [matches, setMatches] = useState([]);

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
    }
  };


  return (
    <div>
      {matches.map((match, index) => (
        <MatchCardFront key={index} match={match} />
      ))}
    </div>
  );
}

export default LiveScoreCarousel;
