'use client'
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { redirect, useRouter } from "next/navigation"; // Or `next/router` for previous versions of Next.js
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { User } from "@/types/user";
import ChooseService from "@/components/ChooseService";
import { useGetFoodQuery } from "@/services/foodServices/food.query";
import FeaturedFoods from "@/components/FeaturedFoods";

const Page = () => {
  const { data: session, status } = useSession();
  const {data: foodData} = useGetFoodQuery();

  console.log('FoodData:', foodData)
  const router = useRouter();
  console.log('Here:', session?.user);

  const handleLogout = async() => {
    await signOut({redirect: false});
    router.push("/sign-in");
  };

    return (
      <div className="flex flex-col items-center gap-4  h-screen">
        <ChooseService />
        <FeaturedFoods footData={foodData?.results!}/>
      </div>
    );
  }

export default Page;
