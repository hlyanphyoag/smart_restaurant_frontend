"use client";
import React from "react";
import { AuthFrom } from "../components/AuthForm";
import { signUpSchema } from "@/lib/validations";
import { useRegisterMutation } from "@/services/AuthServices/auth.mutation";
import { z } from "zod";
import { UserRegisterResponse } from "@/types/user";
import { ApiErrorResponse } from "@/types/apiError";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { signIn } from "next-auth/react";

const page = () => {
  const defaultValues = {
    name: "",
    email: "",
    password: "",
    role: "CUSTOMER",
  };

  const router =  useRouter()

  const { mutate: signUpMutation, isPending , isError  } = useRegisterMutation();

  const handleSubmit = (values: z.infer<typeof signUpSchema>) => {
    console.log("Values", values);
    signUpMutation(
      {
        name: values.name,
        email: values.email,
        password: values.password,
        role: values.role,
      },
      {
        onSuccess: async(data: UserRegisterResponse) => {
          console.log("Success", data);
          const signInResponse = await signIn("credentials", {
            email: values.email,
            password: values.password,
            redirect: false,
          });
          console.log("SignInResponse", signInResponse);
          if(signInResponse?.error){
           console.log('Error From Next Auth:', signInResponse.error) 
          }
          router.push("/")
        },
        onError: (error) => {
          console.log("Error", error);
        },
      }
    );
  };

  if (isPending) {
    return <div>Loading...</div>; 
  }

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
