import { getAllCollection } from "@/services/database/collection";
import FolderCard from "./_components/folder-card";
import { CreateCollectionButton } from "./_components/create-collection-button";
export default async function CollectionPage() {
  const { result, data: listCollection, message } = await getAllCollection();
  if (!result) {
    return <div>Failed to load collection : {message}</div>;
  }
  return (
    <div className="py-8 px-10 m-auto flex flex-col max-md:px-0">
      <div className="rounded-xl p-6 bg-section shadow-md flex-wrap gap-3 space-y-5">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold leading-7">
            Collection Metadata
          </h1>
          <CreateCollectionButton />
        </div>
        <div className="h-[60vh] w-full space-y-4 rounded-lg p-4">
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
  );
}
