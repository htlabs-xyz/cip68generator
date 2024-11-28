import { Icons } from "@/components/common/icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Tabs, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { TabsList } from "@radix-ui/react-tabs";
import Link from "next/link";
import { cn } from "@/utils";
import { dashboardRoutes } from "@/constants/routers";
import MediaGird from "./_components/media-gird";
import MediaList from "./_components/media-list";
import { ExternalLink } from "lucide-react";
import Pagination from "./_components/pagination";
import { Filter } from "./_components/filter";
import FileAction from "./_components/file-action";
export default function StogarePage() {
  return (
    <div className="py-8 px-10 m-auto flex flex-col max-md:px-0">
      <div className="rounded-xl p-6 bg-section shadow-md flex-wrap gap-3 space-y-5">
        <h1 className="text-2xl font-medium leading-7">Storage</h1>
        <div className="mt-5 flex flex-col h-full">
          <Tabs
            defaultValue="list"
            className="px-4 min-h-[70vh] flex-grow overflow-y-auto"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg p-2">
              <TabsList>
                <TabsTrigger
                  value="list"
                  className="data-[state=active]:bg-gray-600"
                >
                  <Icons.squareMenu className="h-5 w-5" />
                </TabsTrigger>
                <TabsTrigger
                  value="grid"
                  className="data-[state=active]:bg-gray-600"
                >
                  <Icons.layoutGrid className="h-5 w-5" />
                </TabsTrigger>
              </TabsList>
              <div className="flex items-center space-x-2">
                <FileAction />
                <Link
                  href={
                    dashboardRoutes.utilities.children.storage.children.upload
                      .redirect
                  }
                  className={cn(buttonVariants({ variant: "ghost" }))}
                >
                  <Button> Upload New</Button>
                </Link>
              </div>
            </div>
            <Filter />
            <TabsContent value="list">
              <MediaList />
            </TabsContent>
            <TabsContent value="grid">
              <MediaGird />
            </TabsContent>
          </Tabs>
          <div className="mt-auto flex flex-col items-center justify-between space-y-2 sm:flex-row sm:space-y-0">
            <Button
              variant="link"
              className="text-sm font-semibold sm:text-base"
            >
              <span>Document</span>
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
}
