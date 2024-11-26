"use client";
import { Button } from "@/components/ui/button";
import FilePicker from "@/components/common/file-picker";
import { useUploadContext } from "@/contexts/storage";
import MediaGirdtoUpload from "../../_components/media-gird-to-upload";
export default function UploadFilePage() {
  const { listFileToUpload, setListFileToUpload, uploadFiles } =
    useUploadContext();

  return (
    <div className="py-8 px-10 m-auto flex flex-col max-md:px-0">
      <div className="rounded-xl p-6 bg-section shadow-md flex-wrap gap-3 space-y-5">
        <h1 className="text-2xl font-medium leading-7">Stogare</h1>

        <div className="mt-5">
          <div>
            <FilePicker
              title=" Provide the images youd like to use. Make sure each image name is
          unique, starting from 0 and going up."
              setFiles={setListFileToUpload}
            />
            {listFileToUpload.length > 0 && (
              <div>
                <MediaGirdtoUpload />
                <Button className="mt-5" onClick={uploadFiles}>
                  Upload
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
