"use client";

import { useState, useEffect } from "react";
import { MatchCard } from "@/components/common/MatchCard";
import { Loader } from "@/components/common/Loader";

export const ListMatches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch("/api/matches",{cache:"no-store"});
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

    fetchMatches();
  }, []);

  if (matches.length === 0) {
    return (
      <h3 className="text-2xl font-extrabold text-indigo-50 leading-snug text-center  mb-10">
        No matches found, Please add a match to continue.
      </h3>
    );
  }

  return (
    <div className=" min-h-screen pt-7 pb-10  text-gray-600 ">
      <h3 className="text-2xl font-extrabold text-indigo-50 leading-snug text-center capitalize mb-10">
        Todays matches
      </h3>
      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {matches.map((match, index) => (
            <MatchCard key={index} match={match} />
          ))}
        </div>
      )}
    </div>
  );
};
