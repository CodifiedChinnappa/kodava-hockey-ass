"use client";

import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { FormError } from "@/components/common/form-error";
import { FormSuccess } from "@/components/common/form-success";
import { addTournament } from "@/actions/add-tournament";
import { useCurrentUser } from "@/hooks/use-current-user";
import { CustomSelect } from "@/components/common/CustomSelect";
import { familyOptions } from "@/data";

const createOption = (label) => ({
  label,
  value: label.toLowerCase().replace(/\W/g, ""),
});
const defaultOptions = [
  createOption("One"),
  createOption("Two"),
  createOption("Three"),
];

export const TournamentForm = () => {
  const user = useCurrentUser();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    createdBy: user.id,
    year: new Date().getFullYear(),
  });
  const [isPending, startTransition] = useTransition();


  const handleChange = ({ id, value }) => {
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };


  const onSubmit = async () => {
    if (!formData?.familiesId) {
      return setError("Please select a family!");
    }
    setError("");
    setSuccess("");

    startTransition(() => {
      addTournament(formData)
        .then((responseData) => {
          if (responseData.error) {
            setError(responseData.error);
          } else {
            setSuccess(responseData.success);
          }
        })
        .catch((err) => setError("Something went wrong"));
    });
  };
  return (
    <div className="flex min-h-screen  items-center justify-center text-gray-600 ">
      {/* register */}
      <div className=" flex flex-col  sm:w-[30rem] rounded-lg border-gray-400 bg-white shadow-lg ">
        <div className="flex-auto p-6">
          {/* Logo */}
          <div className="mb-10 flex flex-shrink-0 flex-grow-0 items-center justify-center overflow-hidden">
            <a
              href="#"
              className="flex cursor-pointer items-center gap-2 text-indigo-500 no-underline hover:text-indigo-500"
            >
              <span className="flex-shrink-0 text-3xl font-black lowercase tracking-tight opacity-100">
                Kodava hockey.
              </span>
            </a>
          </div>
          {/* /Logo */}
          <h4 className="mb-2 font-medium text-gray-700 xl:text-xl">
            Add tournament details
          </h4>

          <div className="pb-5">
            <h3 className="pb-2">Select family</h3>

            <CustomSelect
                 name="familiesId"
              setValue={handleChange}
              options={familyOptions}
            />
         

          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            disabled={isPending}
            type="button"
            onClick={onSubmit}
            className="w-full bg-black text-white mt-2"
          >
            {isPending ? "Adding Tournament..." : "Add"}
          </Button>
        </div>
      </div>
      {/* /Register */}
    </div>
  );
};
