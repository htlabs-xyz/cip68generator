import { create } from "zustand";
import { AssetDetails, FilterType } from "@/types";
import { filterDefault } from "@/constants";

export type ProfileStore = {
  listNft: AssetDetails[];
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
};

const useProfileStore = create<ProfileStore>((set) => ({
  listNft: [],
  filter: filterDefault,
  setFilter: (filter) => set({ filter }),
}));

export default useProfileStore;
