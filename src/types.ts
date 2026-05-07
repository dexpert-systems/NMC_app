export type Property = {
  id: string;
  ownerName: string;
  address: string;
  ward: string;
  category: "Residential" | "Commercial" | "Industrial";
};

export type BillBreakdownItem = {
  label: string;
  amount: number;
};

export type Bill = {
  property: Property;
  period: string;
  total: number;
  dueInDays: number;
  rebateText?: string;
  paidPercentInWard: number;
  breakdown: BillBreakdownItem[];
};

