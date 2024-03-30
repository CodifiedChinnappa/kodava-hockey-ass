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

function addSuffixToMinute(minute) {
  if (minute === 11 || minute === 12 || minute === 13) {
    return minute + "th";
  } else {
    const lastDigit = minute % 10;
    switch (lastDigit) {
      case 1:
        return minute + "st";
      case 2:
        return minute + "nd";
      case 3:
        return minute + "rd";
      default:
        return minute + "th";
    }
  }
}

export function generateCommentary(matchData) {
  const commentaryArray = [];

  const team1 = matchData.participants[0].families.familyName;
  const team2 = matchData.participants[1].families.familyName;
  const goalsTeam1 = matchData.participants[0].goals;
  const goalsTeam2 = matchData.participants[1].goals;
  let winner = null;

  commentaryArray.push(`Exciting match between ${team1} & ${team2}!`);

  // Combine and sort all goals
  const allGoals = [...goalsTeam1, ...goalsTeam2];
  allGoals.sort((a, b) => a.minute - b.minute);

  allGoals.forEach((goal) => {
    const teamName = matchData.participants.find((participant) =>
      participant.goalsId.includes(goal.id)
    ).families.familyName;
    commentaryArray.push(
      `It's a goal! ${teamName.charAt(0).toUpperCase() + teamName.slice(1)}'s ${
        goal.players[0].playerName.charAt(0).toUpperCase() +
        goal.players[0].playerName.slice(1)
      } scored at ${addSuffixToMinute(goal.minute)} minute as ${goal.type} goal`
    );
  });

  if (
    matchData.participants[0].penaltyShoot.length > 0 ||
    matchData.participants[1].penaltyShoot.length > 0
  ) {
    commentaryArray.push("The match went into a shootout.");
  }

  if (matchData.status === "PLAYED") {
    //check walkover
    if (matchData.participants[0].walkover === true) {
      winner = team2;
      commentaryArray.push(
        `Team ${team1.charAt(0).toUpperCase() + team1.slice(1)} gave walkover`
      );
    } else if (matchData.participants[1].walkover === true) {
      winner = team1;
      commentaryArray.push(
        `Team ${team2.charAt(0).toUpperCase() + team2.slice(1)} gave walkover`
      );
    }

    // If both teams have the same number of goals, consider shootout
    const totalShootoutTeam1 =
      matchData.participants[0].penaltyShoot.filter(Boolean).length;
    const totalShootoutTeam2 =
      matchData.participants[1].penaltyShoot.filter(Boolean).length;

    // Check if team 1 scored more goals than team 2
    const totalGoalsTeam1 = goalsTeam1.length;
    const totalGoalsTeam2 = goalsTeam2.length;

    if (totalGoalsTeam1 > totalGoalsTeam2) {
      winner = team1;
    } else if (totalGoalsTeam1 < totalGoalsTeam2) {
      winner = team2;
    }

    // Determine the winner based on the shootout
    if (totalShootoutTeam1 > totalShootoutTeam2) {
      winner = team1;
    } else if (totalShootoutTeam1 < totalShootoutTeam2) {
      winner = team2;
    }

    commentaryArray.push(
      `The winner of the match is ${
        winner.charAt(0).toUpperCase() + winner.slice(1)
      }`
    );
  }

  return commentaryArray;
}
