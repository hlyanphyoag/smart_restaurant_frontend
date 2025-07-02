import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Box, ForkKnife, ShoppingBag } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";

const ChooseService = () => {
  const router = useRouter();
  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/sign-in");
  };
  return (
    <div className="flex flex-col gap-6 bg-neutral-50  justify-center items-center  text-center rounded-2xl">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Choose your service</h1>
        <p className="text-gray-500">
          select how you would like to enjoy your meal
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
      <Card className="flex items-center justify-center">
          <CardHeader className="flex items-center justify-center border bg-green-300 text-white border-gray-200 w-20 h-20  rounded-full">
              <div className="flex items-center justify-center">
                   <ForkKnife />
              </div>
          </CardHeader>
          <CardContent className='w-70 flex flex-col justify-center items-center gap-1'>
          <h2 className="text-xl font-bold">Dine In</h2>
          <small className="text-gray-500">Choose your table and enjoy</small>
          <Link href="/dine-in" className="mt-2">
            <Button
              variant="customize"
              className="rounded-2xl cursor-pointer border border-gray-200"
            >
              Dine in
            </Button>
          </Link>
          </CardContent>
        </Card>
        <Card className="flex items-center justify-center">
          <CardHeader className="flex items-center justify-center border bg-green-300 text-white border-gray-200 w-20 h-20  rounded-full">
              <div className="flex items-center justify-center">
                   <ShoppingBag />
              </div>
          </CardHeader>
          <CardContent className='w-70 flex flex-col justify-center items-center gap-1'>
          <h2 className="text-xl font-bold">Take Away</h2>
          <small className="text-gray-500">Order ahead and collect when ready</small>
          <Link href="/take-away" className="mt-2">
            <Button
              variant="customize"
              className="rounded-2xl cursor-pointer border border-gray-200"
            >
              Take Away
            </Button>
          </Link>
          </CardContent>
        </Card>
        
      </div>
    </div>
  );
};

export default ChooseService;
