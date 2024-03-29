"use client";

import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { FormError } from "@/components/common/form-error";
import { FormSuccess } from "@/components/common/form-success";
import { addFamily } from "@/actions/add-family";
import { useCurrentUser } from "@/hooks/use-current-user";

import { AddFamilySchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";

const createOption = (label) => ({
  label,
  value: label.toLowerCase().replace(/\W/g, ""),
});
const defaultOptions = [
  createOption("One"),
  createOption("Two"),
  createOption("Three"),
];

export const FamilyForm = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [familyName, setFamilyName] = useState("");

  const [isPending, startTransition] = useTransition();
  const user = useCurrentUser();

  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    startTransition(() => {
      addFamily({ familyName, createdBy: user.id })
        .then((responseData) => {
          if (responseData.error) {
            setError(responseData.error);
          } else {
            setSuccess(responseData.success);
          }
        })
        // .catch((err) => console.log(err));
        .catch((err) => setError("Something went wrong"));
    });
  };

  return (
    <div className="flex min-h-screen  items-center justify-center text-gray-600 ">
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
            Add family
          </h4>

          <div className="mb-5">
            <input
              type="text"
              id="familyName"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter family name"
              required
              disabled={isPending}
              onChange={(e) => setFamilyName(e.target.value)}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            disabled={isPending}
            type="button"
            onClick={handleSubmit}
            className="w-full bg-blue-500 text-white hover:text-black"
          >
            {isPending ? "Adding..." : "Add"}
          </Button>
        </div>
      </div>
    </div>
  );
};
