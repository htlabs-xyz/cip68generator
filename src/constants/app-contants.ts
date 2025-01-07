import { FilterType } from "@/types";

export const appConfig = {
  title: "CIP68 Generator",
  description: "",
};
export const uploadConfig = {
  maxFiles: 50,
  maxSize: 50,
};
export const decialPlace = 1_000_000;
export const filterDefault: FilterType = {
  range: {
    from: new Date(2025, 0, 1),
    to: new Date(2025, 11, 30),
  },
  query: "",
};
