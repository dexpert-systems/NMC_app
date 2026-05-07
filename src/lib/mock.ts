import type { Bill, Property } from "@/types";

const sampleProperty: Property = {
  id: "NMC-DH-4729-A1",
  ownerName: "Rajesh Kumar",
  address: "Plot 47, Dharampeth Ward",
  ward: "Dharampeth",
  category: "Residential",
};

const sampleBill: Bill = {
  property: sampleProperty,
  period: "Q3 · 2025–26",
  total: 4820,
  dueInDays: 8,
  rebateText: "Pay before May 31 — save ₹240",
  paidPercentInWard: 73,
  breakdown: [
    { label: "General tax", amount: 2200 },
    { label: "Water benefit", amount: 980 },
    { label: "Sewerage", amount: 740 },
    { label: "Education cess", amount: 460 },
    { label: "Tree cess", amount: 240 },
    { label: "Fire cess", amount: 200 },
  ],
};

// Simulates a network call
export function fetchBill(_input: { method: string; value: string }): Promise<Bill> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(sampleBill), 900);
  });
}
