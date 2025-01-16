import { create } from "zustand";
import { AssetDetails, FilterType } from "@/types";
import { filterDefault } from "@/constants";

export type ProfileStore = {
  listNft: AssetDetails[];
  filter: FilterType;
  totalItem: number;
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  setFilter: (filter: FilterType) => void;
};

const useProfileStore = create<ProfileStore>((set) => ({
  listNft: [],
  filter: filterDefault,
  totalItem: 0,
  currentPage: 1,
  totalPages: 0,
  setCurrentPage: (page) => set({ currentPage: page }),
  setFilter: (filter) => set({ filter }),
}));

export default useProfileStore;
