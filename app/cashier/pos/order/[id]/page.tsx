import FetchTable from "@/app/(home)/dine-in/components/FetchTable";
import PosComponent from "./components/PosComponent";

const page = async ({ params }: { params: { id: string } }) => {
  const { id: tableId } = await params;

  return (
    <FetchTable tableId={tableId}>
      <PosComponent />
    </FetchTable>
  );
};

export default page;
