"use client";

import { addPlayer } from "@/actions/add-player";
import { deleteGoal } from "@/actions/delete-goal";
import { deletePenalty } from "@/actions/delete-penalty";
import { endGame } from "@/actions/end-game";
import { penaltyShoot } from "@/actions/penalty-shoot";
import { postGoal } from "@/actions/post-goal";
import { updateWalkover } from "@/actions/team-walkover";
import { updateGameDuration } from "@/actions/update-game-duration";
import { updateGameStatus } from "@/actions/update-game-status";
import { Loader } from "@/components/common/Loader";
import RadioCard from "@/components/common/RadioCard";
import { FormError } from "@/components/common/form-error";
import { FormSuccess } from "@/components/common/form-success";
import { useCurrentUser } from "@/hooks/use-current-user";
import { convertObjectToOptions } from "@/lib/utils";
import { Duration, GoalType, Status } from "@prisma/client";
import { useParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

import CreatableSelect from "react-select/creatable";

const initialState = {
  minute: null,
  jersey: null,
  playerId: null,
  type: "FIELD",
};

export const LiveScore = () => {
  const { id } = useParams();
  const user = useCurrentUser();
  const [match, setMatch] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();

  // goalData
  const [scoreDataTeam1, setScoreDataTeam1] = useState(initialState);
  const [scoreDataTeam2, setScoreDataTeam2] = useState(initialState);

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const response = await fetch(`/api/matches/${id}`, {
          cache: "no-store",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch match");
        }
        const data = await response.json();
        setMatch(data[0]);
        setIsLoading(false);
      } catch (error) {
        // console.error("Error fetching match:", error);
        setError("Failed to fetch match");
        setIsLoading(false);
      }
    };

    if (id) {
      fetchMatch();
    }
  }, [id, success]);

  const handleInputChange = (e, team) => {
    const value = e.target.value;
    const name = e.target.name;

    // Update state based on the team and input name
    if (team === "team1") {
      setScoreDataTeam1({
        ...scoreDataTeam1,
        [name]: value,
      });
    } else if (team === "team2") {
      setScoreDataTeam2({
        ...scoreDataTeam2,
        [name]: value,
      });
    }
  };

  const handleSelectChange = (newValue, team) => {
    if (team === "team1") {
      setScoreDataTeam1({
        ...scoreDataTeam1,
        playerId: newValue, // Assuming you want to store the selected value in state
      });
    } else if (team === "team2") {
      setScoreDataTeam2({
        ...scoreDataTeam2,
        playerId: newValue, // Assuming you want to store the selected value in state
      });
    }
  };

  const handleOptionChange = (selectedOption, team) => {
    // Update state based on the team
    if (team === "team1") {
      setScoreDataTeam1({
        ...scoreDataTeam1,
        type: selectedOption,
      });
    } else if (team === "team2") {
      setScoreDataTeam2({
        ...scoreDataTeam2,
        type: selectedOption,
      });
    }
  };

  // create family
  const onFamilyCreate = async (data) => {
    setError("");
    setSuccess("");
    setIsLoading(true);

    startTransition(() => {
      addPlayer({
        playerName: data.playerName,
        families: data.familyId,
        createdBy: user.id,
      })
        .then((responseData) => {
          if (responseData.error) {
            setError(responseData.error);
          } else {
            setSuccess("Player added!");
          }
        })
        .catch((err) => console.log(err));
    });
    setIsLoading(false);
  };
  // create family
  const onPostGoal = async (teamId, id) => {
    setError("");
    setSuccess("");
    setIsLoading(true);

    let data;

    if (id === 0) {
      data = scoreDataTeam1;
    } else {
      data = scoreDataTeam2;
    }

    if (!data.playerId || !data.minute || !data.type) {
      setError("Player or family ID or goal type is missing.");
      setIsLoading(false);
      return;
    }

    startTransition(() => {
      postGoal({ ...data, teamId: teamId })
        .then((responseData) => {
          if (responseData.error) {
            setError(responseData.error);
          } else {
            resetScoreData();
            setSuccess("Goal posted!");
          }
        })
        .catch((err) => console.log(err));
    });
    setIsLoading(false);
  };
  // delete goal
  const onDeleteGoal = async (teamId, id) => {
    setError("");
    setSuccess("");
    setIsLoading(true);

    startTransition(() => {
      deleteGoal({ teamId: teamId, goalId: id })
        .then((responseData) => {
          if (responseData.error) {
            setError(responseData.error);
          } else {
            setSuccess("Goal deleted!");
          }
        })
        .catch((err) => console.log(err));
    });
    setIsLoading(false);
  };
  const onPenaltyShoot = async (teamId, result) => {
    setError("");
    setSuccess("");
    setIsLoading(true);

    startTransition(() => {
      penaltyShoot({ teamId: teamId, result })
        .then((responseData) => {
          if (responseData.error) {
            setError(responseData.error);
          } else {
            setSuccess("score updated!");
          }
        })
        .catch((err) => console.log(err));
    });
    setIsLoading(false);
  };
  const onDeletePenaltyShoot = async (teamId, index) => {
    setError("");
    setSuccess("");
    setIsLoading(true);

    startTransition(() => {
      deletePenalty({ teamId: teamId, index })
        .then((responseData) => {
          if (responseData.error) {
            setError(responseData.error);
          } else {
            setSuccess("Penalty Goal deleted!");
          }
        })
        .catch((err) => console.log(err));
    });
    setIsLoading(false);
  };
  const onGameStatusChange = async (matchId, status) => {
    setError("");
    setSuccess("");
    setIsLoading(true);

    startTransition(() => {
      updateGameStatus({ matchId, status })
        .then((responseData) => {
          if (responseData.error) {
            setError(responseData.error);
          } else {
            setSuccess("Status updated!");
          }
        })
        .catch((err) => console.log(err));
    });
    setIsLoading(false);
  };
  const onGameDuration = async (matchId, duration) => {
    setError("");
    setSuccess("");
    setIsLoading(true);

    startTransition(() => {
      updateGameDuration({ matchId, duration })
        .then((responseData) => {
          if (responseData.error) {
            setError(responseData.error);
          } else {
            setSuccess("Duration updated!");
          }
        })
        .catch((err) => console.log(err));
    });
    setIsLoading(false);
  };
  const onTeamWalkOver = async (matchId, teamId) => {
    setError("");
    setSuccess("");
    setIsLoading(true);

    startTransition(() => {
      updateWalkover({ matchId, teamId })
        .then((responseData) => {
          if (responseData.error) {
            setError(responseData.error);
          } else {
            setSuccess("Match updated!");
          }
        })
        .catch((err) => console.log(err));
    });
    setIsLoading(false);
  };
  const onEndGame = async (matchId) => {
    setError("");
    setSuccess("");
    setIsLoading(true);

    startTransition(() => {
      endGame({ matchId })
        .then((responseData) => {
          if (responseData.error) {
            setError(responseData.error);
          } else {
            setSuccess("Match updated!");
          }
        })
        .catch((err) => console.log(err));
    });
    setIsLoading(false);
  };

  const resetScoreData = () => {
    setScoreDataTeam1({
      minute: null,
      jersey: null,
      player: null,
      goalType: "FIELD",
    });
    setScoreDataTeam2({
      minute: null,
      jersey: null,
      player: null,
      goalType: "FIELD",
    });
  };

  const convertObjectToPlayersOptions = (participants) => {
    return participants.map((participant) => ({
      label: participant.playerName,
      value: participant.id,
    }));
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex min-h-screen pt-7 pb-10  items-start justify-center ">
      <div className="bg-white my-10 rounded fixed z-10 bottom-2 right-10">
        <FormError message={error} />
        <FormSuccess message={success} />
      </div>
      <div className="grid w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible ">
        {match && (
          <div>
            <h1 className="font-sans text-xl md:text-5xl antialiased font-semibold leading-tight tracking-normal text-inherit text-center text-white">
              {`${match?.participants[0]?.families.familyName} vs ${match?.participants[1]?.families.familyName}`}
            </h1>
            {/* //game control */}
            {match?.status !== "PLAYED" && (
              <div className="mt-10">
                <hr className="my-5 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />

                <div className="flex flex-col items-center  space-x-8">
                  <h3 className="font-sans text-2xl antialiased font-semibold leading-tight tracking-normal text-inherit text-white">
                    Status
                  </h3>
                  <RadioCard
                    options={convertObjectToOptions(Status)}
                    onChange={(value) => onGameStatusChange(match.id, value)}
                    defaultSelected={match.status}
                  />
                </div>
                <hr className="my-5 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />
                <div className="flex  flex-col items-center   space-x-8 ">
                  <h3 className="font-sans text-2xl antialiased font-semibold leading-tight tracking-normal text-inherit text-white">
                    Duration
                  </h3>
                  <RadioCard
                    options={convertObjectToOptions(Duration)}
                    onChange={(value) => onGameDuration(match.id, value)}
                    defaultSelected={match.duration}
                  />
                </div>
              </div>
            )}

            <hr className="my-5 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />

            <div>
              <div className="grid xs:grid-cols-12 md:grid-cols-2 gap-16 mt-8 justify-center">
                {match.participants.map((team, index) => (
                  <div
                    key={index}
                    className="text-black bg-white rounded shadow-lg p-4 md:p-10 space-y-5"
                  >
                    <h1 className="font-sans text-center text-xl md:text-5xl antialiased font-semibold leading-tight tracking-normal mb-5 ">
                      {`${match?.participants[
                        index
                      ]?.families.familyName.toUpperCase()} `}
                    </h1>
                    <div className="flex flex-col space-y-5 border p-5">
                      <div>
                        <h6 className="pb-2 text-md md:text-xl  font-semibold text-center">
                          Add score{" "}
                          <p className="text-xs md:text-sm">
                            (keep name unique)
                          </p>
                        </h6>

                        <CreatableSelect
                          isClearable
                          isDisabled={isLoading}
                          isLoading={isLoading}
                          onChange={(newValue) =>
                            handleSelectChange(
                              newValue?.value,
                              `team${index + 1}`
                            )
                          }
                          onCreateOption={(value) =>
                            onFamilyCreate({
                              playerName: value,
                              familyId: team.familiesId,
                            })
                          }
                          options={convertObjectToPlayersOptions(
                            team.families.players
                          )}
                        />
                      </div>
                      <div>
                        Time: &nbsp; &nbsp;
                        <input
                          className="border rounded py-1 px-2 mb-2 bg-white"
                          type="number"
                          placeholder="Time"
                          name="minute"
                          required
                          min={0}
                          max={60}
                          value={
                            index === 0
                              ? scoreDataTeam1.minute
                              : scoreDataTeam2.minute
                          }
                          onChange={(e) =>
                            handleInputChange(e, `team${index + 1}`)
                          }
                        />
                      </div>
                      <div>
                        <RadioCard
                          options={convertObjectToOptions(GoalType)}
                          onChange={(selectedOption) =>
                            handleOptionChange(
                              selectedOption,
                              `team${index + 1}`
                            )
                          }
                          defaultSelected="FIELD"
                        />
                      </div>
                      <button
                        type="button"
                        className="bg-blue-400 rounded-sm p-2 md:p-3 font-bold"
                        onClick={() => onPostGoal(team.id, index)}
                      >
                        Add Goal
                      </button>

                      {/* //ScoreCard */}
                      <div className="border-t-2 pt-5">
                        <h6 className="pb-2 text-md md:text-xl font-semibold text-center">
                          Goals: ({team.goals.length})
                        </h6>
                        <div className="flex flex-col justify-evenly space-y-2">
                          {team.goals.map((scorer, index) => (
                            <div
                              key={index}
                              className="flex justify-evenly space-x-3  "
                            >
                              <h3>{index + 1})</h3>
                              <h3>{scorer?.players[0].playerName}</h3>
                              <h3> {scorer?.minute} min </h3>
                              <h3> {scorer?.type} </h3>
                              <button
                                type="button"
                                className="bg-red-500 p-1 text-white rounded-sm"
                                onClick={() => onDeleteGoal(team.id, scorer.id)}
                              >
                                Delete
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* //shootout */}
                    <div className="border p-5">
                      <h6 className="pb-2 text-md md:text-xl  font-semibold text-center">
                        Shootout:(
                        {
                          team?.penaltyShoot.filter((item) => item === true)
                            .length
                        }
                        )
                      </h6>
                      <div className="flex justify-center space-x-6">
                        <button
                          type="button"
                          className="bg-green-600  text-white border rounded-sm shadow-md p-1 transition duration-300 ease-in-out transform hover:scale-105"
                          onClick={() => onPenaltyShoot(team.id, true)}
                        >
                          Score
                        </button>
                        <button
                          type="button"
                          className="bg-red-500 text-white border rounded-sm shadow-md p-1 transition duration-300 ease-in-out transform hover:scale-105"
                          onClick={() => onPenaltyShoot(team.id, false)}
                        >
                          Miss
                        </button>
                      </div>
                      <hr className="my-7 h-0.5 border-t-0 bg-neutral-100 dark:bg-black" />

                      <div className="flex flex-col justify-evenly space-y-2 my-5">
                        {team?.penaltyShoot.map((item, i) => (
                          <div
                            key={i}
                            className="flex space-x-4 items-center justify-center gap-5"
                          >
                            <h5>
                              {i + 1} : {item ? "scored" : "missed"}
                            </h5>
                            <button
                              type="button"
                              className="bg-red-500 p-1 text-white rounded-sm "
                              onClick={() => onDeletePenaltyShoot(team.id, i)}
                            >
                              Delete
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="bg-orange-400 rounded-sm p-3 font-bold"
                      onClick={() => onTeamWalkOver(match.id, team.id)}
                    >
                      Walkover
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <hr className="my-7 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />
            <div>
              {match?.status !== "PLAYED" && (
                <button
                  type="button"
                  className="bg-red-600 rounded-sm p-3 font-bold"
                  disabled={match?.status == "RESULT"}
                  onClick={() => onEndGame(match.id)}
                >
                  End Match
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
