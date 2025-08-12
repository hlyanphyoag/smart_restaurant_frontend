export interface Table {
  id: string;
  number: number;
  stripeUrl: string | null;
  seats: number;
  occupied: boolean;
  note: string;
  createdAt: string;
  updatedAt: string;
}

export interface PatchTable {
  tableId: string;
  occupied: boolean;
}
