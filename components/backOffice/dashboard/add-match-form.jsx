"use client";

import { useContext, useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { FormError } from "@/components/common/form-error";
import { FormSuccess } from "@/components/common/form-success";
import { useCurrentUser } from "@/hooks/use-current-user";

import { addMatch } from "@/actions/add-match";
import CustomDropDown from "@/components/common/CustomDropDown";
import { poolOptions, roundOptions, venueOptions } from "@/data";
import { CustomSelect } from "@/components/common/CustomSelect";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { addFamily } from "@/actions/add-family";
import { useFamilyContext } from "@/context/Families.provider";
import { Pool, Round, Venues } from "@prisma/client";
import { convertObjectToOptions } from "@/lib/utils";

export const AddMatchForm = () => {
  const { families, fetchFamilies } = useFamilyContext();
  const user = useCurrentUser();

  const initialState = { createdBy: user.id };

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState(initialState);
  const [isPending, startTransition] = useTransition();

  //dialog box
  const [open, setOpen] = useState(false);

  const handleChange = ({ id, value }) => {
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleConfirmation = () => {
    setError("");
    setSuccess("");

    startTransition(() => {
      addMatch(formData)
        .then((responseData) => {
          if (responseData.error) {
            console.log(responseData);
            setError("Please fil all fields ");
          } else {
            setSuccess(responseData.success);
            setFormData(initialState);
          }
        })
        // .catch((err) => console.log(err));
        .catch((err) => setError("Something went wrong"));
    });
  };

  const onFamilyCreate = async (data) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      addFamily({ ...data, createdBy: user.id })
        .then((responseData) => {
          if (responseData.error) {
            setError(responseData.error);
          } else {
            fetchFamilies();
            setSuccess("Family Created!");
          }
        })
        .catch((err) => console.log(err));
    });
  };

  return (
    <div className="flex min-h-max pt-7 pb-10  items-center justify-center text-gray-600 ">
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
            Add Match
          </h4>

          <div className="space-y-4 mb-6">
            <div>
              <h3 className="pb-2">Venue</h3>

              <CustomSelect
                setValue={handleChange}
                options={convertObjectToOptions(Venues)}
                name="venue"
              />
            </div>

            {/* //date */}
            <div className="flex flex-col space-y-2">
              <label>Scheduled On</label>

              <input
                className="text-black bg-white border"
                type="datetime-local"
                value={formData?.scheduledOn}
                min="2024-03-27T00:00"
                max="2024-04-26T00:00"
                name="schedule"
                onChange={(e) =>
                  handleChange({ id: "scheduledOn", value: e.target.value })
                }
                required
              />
            </div>
            {/* //pool */}
            <div>
              <h3 className="pb-2">Pool</h3>

              <CustomSelect
                name="pool"
                setValue={handleChange}
                options={convertObjectToOptions(Pool)}
              />
            </div>
            {/* //Round */}
            <div>
              <h3 className="pb-2">Round</h3>

              <CustomSelect
                name="round"
                setValue={handleChange}
                options={convertObjectToOptions(Round)}
              />
            </div>
            {/* //select teams 1 */}
            <div>
              <h3 className="py-2">Select sides</h3>

              <h6 className="pb-2 text-sm">Team 1</h6>

              <CustomDropDown
                name="team1"
                setValue={handleChange}
                setOptions={onFamilyCreate}
                options={families}
              />
            </div>
            {/* //select teams 2*/}
            <div>
              <h6 className="pb-2 text-sm">Team 2</h6>

              <CustomDropDown
                name="team2"
                setValue={handleChange}
                setOptions={onFamilyCreate}
                options={families}
              />
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button
              onClick={handleConfirmation}
              className="w-full bg-blue-500 text-white hover:text-black"
            >
              {isPending ? "Saving..." : "Confirm"}
            </Button>
          </div>

          {/* <Dialog  open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="w-full bg-blue-500 text-white hover:text-black">
                Add
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle> Re-Validate</DialogTitle>
                <DialogDescription>
                  Any mistakes, close this and re-submit.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 ">
                {formData &&
                  Object.entries(formData).map(([key, value], index) => (
                    <div
                      key={index}
                      className="grid grid-cols-4 items-center gap-1"
                    >
                      <label htmlFor={key}>{key}</label>
                      <input
                        id={key}
                        type={key}
                        value={value}
                        className="col-span-3"
                        readOnly // To prevent user input, assuming you want to display only
                      />
                    </div>
                  ))}
              </div>
              <DialogFooter>
                <Button
                  onClick={handleConfirmation}
                  className="w-full bg-blue-500 text-white hover:text-black"
                >
                  {isPending ? "Saving..." : "Confirm"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog> */}
        </div>
      </div>
    </div>
  );
};
