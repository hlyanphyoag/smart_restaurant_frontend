"use client";
import React from "react";
import { AuthFrom } from "../components/AuthForm";
import { signUpSchema } from "@/lib/validations";
import { useRegisterMutation } from "@/services/AuthServices/auth.mutation";
import { z } from "zod";
import { UserRegisterResponse } from "@/types/user";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const page = () => {
  const defaultValues = {
    name: "",
    email: "",
    password: "",
  };

  const router = useRouter();

  const { mutate: signUpMutation, isPending, isError } = useRegisterMutation();

  const handleSubmit = async (
    values: z.infer<typeof signUpSchema>
  ): Promise<{ success: boolean; error?: string }> => {
    console.log("Values", values);
    return new Promise((resolve, reject) => {
      signUpMutation(
        {
          name: values.name,
          email: values.email,
          password: values.password,
          role: "CUSTOMER",
        },
        {
          onSuccess: async (data: UserRegisterResponse) => {
            console.log("Success", data);
            const signInResponse = await signIn("credentials", {
              email: values.email,
              password: values.password,
              redirect: false,
            });
            console.log("SignInResponse", signInResponse);
            if (signInResponse?.error) {
              console.log("Error From Next Auth:", signInResponse.error);
            }
            router.push("/");
            return { success: true };
          },
          onError: (error) => {
            console.log("Error", error);
          },
        }
      );
    });
  };

  // if (isPending) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="flex h-screen items-center justify-center">
      <AuthFrom
        schema={signUpSchema}
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
        type="SIGN_UP"
      />
    </div>
  );
};

export default page;
