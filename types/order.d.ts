interface orderItem {
  foodItemId: string;
  quantity: number;
  note: string;
}

export type PaymentMethod = "DIGITAL" | "CASH";
export interface postOrder {
  payment_method: PaymentMethod;
  customerId: string;
  totalCost: number;
  tableId: string | null;
  address: string;
  orderItems: orderItem[];
}

export interface postOrderResponse {
  id: string;
  paymentMethod: PaymentMethod;
  stripeUrl: string | null;
  customerId: string;
  status: string;
  confirmedById: string;
  cookedById: string;
  completedAt: string;
  createdAt: string;
  updatedAt: string;
  tableId: string;
  customer: {
    id: string;
    profilePic: string;
    name: string;
  };
  cookedBy: string;
  confirmedBy: string;
  table: {
    id: string;
    number: number;
    seats: number;
    occupied: boolean;
    note: string;
    createdAt: string;
    updatedAt: string;
  };
  bill: {
    id: string;
  };
  _count: {
    items: number;
  };
}
