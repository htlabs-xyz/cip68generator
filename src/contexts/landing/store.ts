import { StatisticType } from "@/types";
import { create } from "zustand";

export type LandingStore = {
  statistic: StatisticType;
};

const landingStore = create<LandingStore>(() => ({
  statistic: {
    totalBurn: 0,
    totalMint: 0,
    totalUpdate: 0,
    totalTransaction: 0,
  },
}));

export default landingStore;
