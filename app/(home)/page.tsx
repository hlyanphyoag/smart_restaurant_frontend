'use client'
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // Or `next/router` for previous versions of Next.js
import ChooseService from "@/components/ChooseService";
import { useGetFoodQuery } from "@/services/foodServices/food.query";
import FeaturedFoods from "@/components/FeaturedFoods";
import { useGetOrderHistoryQuery } from "@/services/OrderServices/order.query";
import { useEffect, useState } from "react";
import { notiStore } from "@/store/StatusStore";

const Page = () => {
  const { data: session, status } = useSession();
  const {data: foodData} = useGetFoodQuery("", "", "");
   const {
      data: OrderHistoryData,
      isPending,
      isError,
    } = useGetOrderHistoryQuery("", "3");
    const readyOrderData = OrderHistoryData?.pages?.flatMap(
      (page) => page.results
    );
    // const [activeReady, setActiveReady] = useState(false);
    // console.log("Ready Order Data: ", readyOrderData);
  
    const pendingOrder = readyOrderData?.find(
      (order: any) => order.status !== "COMPLETED"
    );
    console.log("Pending Order: ", pendingOrder);
    const {notifications, setNotifications} = notiStore()
  
    useEffect(() => {
      const active = pendingOrder?.status === "READY" ? true : false;
      if (active) {
          setNotifications(pendingOrder)
          console.log("PendingOrder:", pendingOrder)
      }else{
        console.log("Active error")
      }
    }, [pendingOrder]);

    const router = useRouter();
    
    console.log('FoodData:', foodData)
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
