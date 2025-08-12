"use client";

import { Loading } from "@/components/Loading";
import { api } from "@/services/api";
import { Table } from "@/types/table";
import { useQuery } from "@tanstack/react-query";
import { ReactNode } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { InfoIcon } from "lucide-react";

const FetchTable = ({
  tableId,
  children,
}: {
  tableId: string;
  children: ReactNode;
}) => {
  const {
    data: tableData,
    isLoading,
    error,
  } = useQuery<Table>({
    queryKey: ["dine-in", "table", tableId],
    queryFn: async () => {
      const res = await api.get<Table>("/api/table/" + tableId);

      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <Card className="max-w-md w-full border-green-500 shadow-lg animate-in fade-in-0 zoom-in-95">
          <CardHeader className="flex flex-col items-center gap-2">
            <InfoIcon className="w-10 h-10 mb-2 text-red-500" />
            <CardTitle className="text-green-700">Error</CardTitle>
            <Badge variant="error" className="mt-2">
              Error loading table data
            </Badge>
          </CardHeader>
          <CardContent className="text-center text-muted-foreground">
            Please try again or contact support if the issue persists.
          </CardContent>
        </Card>
      </div>
    );
  }

  if (tableData?.occupied) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <Card className="max-w-md w-full border-green-500 shadow-lg animate-in fade-in-0 zoom-in-95">
          <CardHeader className="flex flex-col items-center gap-2">
            <div className="size-12 flex items-center justify-center border font-bold text-xl text-white border-green-500 bg-green-600 rounded-full">
              {tableData?.number}
            </div>
            <CardTitle className="text-green-700">Table Occupied</CardTitle>
            <Badge variant="success" className="mt-2">
              This table is currently occupied
            </Badge>
          </CardHeader>
          <CardContent className="text-center text-muted-foreground">
            Please select another table or wait until it becomes available.
          </CardContent>
        </Card>
      </div>
    );
  }

  return children;
};

export default FetchTable;
