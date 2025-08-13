export interface DashboardSummary {
  totalCustomers: number;
  totalFoodItems: number;
  totalOrders: number;
}

export type MostOrdered7Days = { day: string; date: string; count: number }[];

export interface PaymentMethodAnalytics {
  cash: number;
  digital: number;
  total: number;
  percentage: {
    cash: number;
    digital: number;
  };
}

export interface TodaySummary {
  date: string;
  summary: {
    totalOrders: number;
    completedOrders: number;
    cancelledOrders: number;
    completionRate: number;
    paymentMethods: {
      cash: number;
      digital: number;
      cashPercentage: number;
      digitalPercentage: number;
    };
    income: {
      total: number;
      average: number;
      highest: number;
      lowest: number;
    };
    popularItems: {
      id: string;
      name: string;
      price: number;
      quantity: number;
    }[];
  };
  updatedAt: string | Date;
}
