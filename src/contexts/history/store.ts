import { create } from "zustand";

export type HistoryStore = {
  metadata: string;
};

const historyStore = create<HistoryStore>(() => ({
  metadata: "",
}));

export default historyStore;
