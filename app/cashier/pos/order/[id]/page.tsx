"use client";

import FetchTable from "@/app/(home)/dine-in/components/FetchTable";
import PosComponent from "./components/PosComponent";
import { useParams } from "next/navigation";

const Page = async () => {
  const { id: tableId } = useParams();

  return (
    <FetchTable tableId={tableId as string}>
      <PosComponent />
    </FetchTable>
  );
};

export default Page;
