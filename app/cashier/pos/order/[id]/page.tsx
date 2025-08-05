"use client";
import CheckOutCard from "@/app/(home)/component/CheckOutCard";
import PosCard from "@/app/cashier/Components/POS";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";

const page = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  return (
    <div className="flex gap-8 justify-center items-start  px-4 sm:px-8 lg:px-16 mb-10">
      <div>
        <div className="flex items-center gap-2 p-4">
          <Search className="text-gray-400" />
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <PosCard searchQuery={searchQuery} />
      </div>
      <CheckOutCard />
    </div>
  );
};

export default page;
