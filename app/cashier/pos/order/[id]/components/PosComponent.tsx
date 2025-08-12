"use client";

import CheckOutCard from "@/app/(home)/component/CheckOutCard";
import PosCard from "@/app/cashier/Components/POS";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React, { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";

const PosComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const searchDebounce = useDebounce(searchQuery, 500);

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
        <PosCard searchQuery={searchDebounce} />
      </div>
      <div className="hidden xl:flex xl:sticky top-2 right-1">
        <CheckOutCard />
      </div>
    </div>
  );
};

export default PosComponent;
