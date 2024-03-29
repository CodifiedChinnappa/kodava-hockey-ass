import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const tailwindConfig = () => {
  // Tailwind config
  return resolveConfig("../tailwind.config");
};

export const hexToRGB = (h) => {
  let r = 0;
  let g = 0;
  let b = 0;
  if (h.length === 4) {
    r = `0x${h[1]}${h[1]}`;
    g = `0x${h[2]}${h[2]}`;
    b = `0x${h[3]}${h[3]}`;
  } else if (h.length === 7) {
    r = `0x${h[1]}${h[2]}`;
    g = `0x${h[3]}${h[4]}`;
    b = `0x${h[5]}${h[6]}`;
  }
  return `${+r},${+g},${+b}`;
};

export const formatValue = (value) =>
  Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumSignificantDigits: 3,
    notation: "compact",
  }).format(value);

export function getStartingLetters(inputString) {
  if (!inputString) return;
  const wordsArray = inputString.split(" ");
  const startingLetters = wordsArray.map((word) => word.charAt(0));
  return startingLetters.join("").slice(0, 4);
}

export const convertObjectToOptions = (object) => {
  return Object.entries(object)
    .map(([key, value]) => {
      if (value === "PLAYED") {
        return null; // Exclude PLAYED option
      }
      return {
        label: value,
        value: key,
      };
    })
    .filter((option) => option !== null); // Filter out excluded options
};

export function calculateWinner(teams) {
  const totalGoalsTeam1 = teams[0].goals.length;
  const totalGoalsTeam2 = teams[1].goals.length;

  if (totalGoalsTeam1 > totalGoalsTeam2) {
    return { winner: teams[0], loser: teams[1] };
  } else if (totalGoalsTeam1 < totalGoalsTeam2) {
    return { winner: teams[1], loser: teams[0] };
  } else {
    // If both teams have the same number of goals, consider shootout
    const totalShootoutTeam1 = teams[0].penaltyShoot.filter(Boolean).length;
    const totalShootoutTeam2 = teams[1].penaltyShoot.filter(Boolean).length;

    if (totalShootoutTeam1 > totalShootoutTeam2) {
      return { winner: teams[0], loser: teams[1] };
    } else if (totalShootoutTeam1 < totalShootoutTeam2) {
      return { winner: teams[1], loser: teams[0] };
    } else {
      return false; // If both teams have same goals and shootout, it's a tie
    }
  }
}
