"use client";

import FolderCard from "../_components/folder-card";
import { CreateCollectionButton } from "./_components/create-collection-button";
import { useCollectionContext } from "@/contexts/collection";

export default function CollectionPage() {
  const { listCollection } = useCollectionContext();
  return (
    <div className="py-8 px-10 m-auto flex flex-col max-md:px-0">
      <div className="rounded-xl p-6 bg-section shadow-md flex-wrap gap-3 space-y-5">
        <h1 className="text-2xl font-medium leading-7">Collection Metadata</h1>
        <div className="mt-5 flex flex-col justify-center">
          <div className="flex flex-wrap items-center justify-between rounded-lg">
            <div className="w-full h-[30vh] flex items-center justify-center bg-transparent border-dashed border-gray-700 border-[1px] rounded-lg">
              <CreateCollectionButton />
            </div>
          </div>
          <div className="h-full w-full space-y-4 rounded-lg p-4">
            <div className="overflow-x-auto">
              <div className="md:grid-col-2 grid grid-cols-1 gap-4 lg:grid-cols-3 xl:grid-cols-4">
                {listCollection.map((collection, index) => (
                  <FolderCard collection={collection} key={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
