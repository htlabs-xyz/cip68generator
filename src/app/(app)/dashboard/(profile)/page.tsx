"use client";

import { Button } from "@/components/ui/button";
import AssetCard from "./_components/asset-card";
import { useProfileContext } from "@/contexts/profile";
import { ExternalLink, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { FilterType } from "@/types";
import { filterDefault } from "@/constants";
import PaginationPage from "./_components/pagination-page";
import { useWalletContext } from "@/components/providers/wallet";

export default function ProfilePage() {
  const { wallet } = useWalletContext();
  const { listNft, filter, setFilter } = useProfileContext();
  const [temp, setTemp] = useState<FilterType>(filter);
  const handleSearch = () => {
    if (temp) {
      setFilter(temp);
    }
  };
  const resetFilter = () => {
    setTemp(filterDefault);
    setFilter(filterDefault);
  };
  return (
    <div className="py-8 px-10 m-auto flex flex-col">
      <div className="rounded-xl p-6 bg-section shadow-md flex flex-col gap-3">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search By AssetName"
              className="pl-8"
              value={temp.query}
              onChange={(e) => setTemp({ ...temp, query: e.target.value })}
            />
          </div>
          {JSON.stringify(filter) == JSON.stringify(filterDefault) ? (
            <Button
              variant="secondary"
              onClick={handleSearch}
              className="rounded-md bg-blue-500 w-20 px-4 py-2 font-semibold transition duration-300 ease-in-out"
            >
              Search
            </Button>
          ) : (
            <Button
              onClick={resetFilter}
              className="rounded-md bg-blue-500 w-20 px-4 py-2 font-semibold transition duration-300 ease-in-out"
            >
              Reset
            </Button>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {listNft.map((data, index) => (
            <AssetCard data={data} key={index} />
          ))}
        </div>
        <div className="mt-auto flex flex-col items-center justify-between space-y-2 sm:flex-row sm:space-y-0">
          {/* <Button variant="link" className="text-sm font-semibold sm:text-base">
            <span>Exploer</span>
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button> */}
          <div />
          <PaginationPage />
        </div>
      </div>
    </div>
  );
}
