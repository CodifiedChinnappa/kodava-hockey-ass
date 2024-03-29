"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { RegisterSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { register } from "@/actions/register";
import { FormError } from "@/components/common/form-error";
import { FormSuccess } from "@/components/common/form-success";

export const RegisterForm = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      phoneNumber: "",
      alternatePhone: "",
      name: "",
    },
  });

  const onSubmit = async (data) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      register(data)
        .then((responseData) => {
          if (responseData.error) {
            setError(responseData.error);
          } else {
            setSuccess(responseData.success);
            form.reset();
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
            Welcome to admin panel!
            <p className="text-sm">Register a user</p>
          </h4>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="Enter the name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="Enter the Email"
                          type="email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="Enter the contact"
                          type="number"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="alternatePhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Alternate Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="Enter the alternate contact"
                          type="number"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormError message={error} />
              <FormSuccess message={success} />
              <Button
                disabled={isPending}
                type="submit"
                className="w-full bg-blue-500 text-white hover:text-black"
              >
                {isPending ? "Registering..." : "Register"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
