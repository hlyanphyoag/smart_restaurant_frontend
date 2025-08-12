import OrderCard from "@/app/(home)/component/OrderCard";
import React from "react";
import CheckOutCard from "@/app/(home)/component/CheckOutCard";

const page = () => {
  return (
    <div className="max-w-7xl flex flex-col lg:flex-row items-start">
      <OrderCard />
      <div className="hidden xl:flex xl:sticky top-2 right-1">
        <CheckOutCard />
      </div>
    </div>
  );
};

export default page;
