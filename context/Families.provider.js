"use client";

import { createContext, useContext, useState, useEffect } from "react";

const FamilyContext = createContext();

export const FamilyProvider = ({ children }) => {
  const [families, setFamilies] = useState([]);

  const extractFamilyData = (data) =>
    data.map((family) => ({
      label: family.familyName,
      value: family.id,
    }));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/families");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        const parsed = extractFamilyData(data);
        setFamilies(parsed);
      } catch (error) {
        console.error("Error fetching families:", error);
      }
    };

    fetchData();
  }, []);

  const fetchFamilies = async () => {
    // Update families with the existing data
    const data = await fetch("/api/families");
    const jsonData = await data.json();
    const parsed = extractFamilyData(jsonData);
    setFamilies(parsed);
  };

  return (
    <FamilyContext.Provider value={{ families, fetchFamilies }}>
      {children}
    </FamilyContext.Provider>
  );
};

export const useFamilyContext = () => useContext(FamilyContext);
