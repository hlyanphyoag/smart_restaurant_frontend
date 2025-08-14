"use client";

import OrderCard from "@/app/(home)/component/OrderCard";
import React from "react";
import CheckOutCard from "../../component/CheckOutCard";
import FetchTable from "../components/FetchTable";
import { useParams } from "next/navigation";

const Page = () => {
  const { id: tableId } = useParams();

  return (
    <FetchTable tableId={tableId as string}>
      <div className="max-w-7xl flex flex-col lg:flex-row items-start gap-2">
        <OrderCard />
        <div className="hidden xl:flex xl:sticky top-2 right-1">
          <CheckOutCard />
        </div>
      </div>
    </FetchTable>
  );
};

export default Page;
