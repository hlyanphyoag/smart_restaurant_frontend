"use client"
import React from 'react'
import { AuthFrom } from '../components/AuthForm';
import { singInSchema } from '@/lib/validations';
import { signIn } from 'next-auth/react';
import { z } from 'zod';

const page = () => {

const handleSubmit = async (data: z.infer<typeof singInSchema>) => {
  const email = data.email;
  const password = data.password;

  const res = await signIn("credentials", {
    redirect: false, 
    email,
    password,
    callbackUrl: "/redirect", 
  });
  console.log('ResFromSignIn:', res)

  if (res?.error) {
    console.error("Login failed", res.error);
  } else {
    window.location.href = res?.url || "/";  
  }
  return { success: true };
};

  const defaultValues = {
    email : "",
    password : ""
  }

  return (
    <div className="flex h-screen items-center justify-center">
          <AuthFrom
            schema={singInSchema}
            defaultValues={defaultValues}
            onSubmit={handleSubmit}
            type="SIGN_IN"
          />
        </div>
  )
}

export default page
