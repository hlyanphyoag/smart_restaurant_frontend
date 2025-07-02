"use client";

import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "./ui/infinite-moving-card";
import { Food } from "@/types/food";


export function InfiniteMovingCardsDemo({items} : {items: Food[]}) {
    console.log(items)
  return (
    <div className="rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden ">
      <InfiniteMovingCards
        items={items!}
        direction="right"
        speed="slow"
      />
    </div>
  );
}

