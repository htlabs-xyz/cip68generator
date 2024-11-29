"use client";
import { Button } from "@/components/ui/button";
import { useMintOneContext } from "@/contexts/mint-one";
import Property from "../property";
import { isEmpty, isNil } from "lodash";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import FileDisplay from "@/components/common/file-display";
import { Card, CardContent } from "@/components/ui/card";
import { shortenString } from "@/utils";
import { useEffect, useState } from "react";
import { getContractPolicyId } from "@/services/contract/get-policy-id";
import CoppyButton from "@/components/common/coppy-button";
import { SaveMetadata } from "../save-metadata";

export default function PreviewStep() {
  const {
    stepper,
    metadataToMint,
    basicInfoToMint,
    startMinting,
    collectionToSave,
    setCollectionToSave,
  } = useMintOneContext();
  // const [collectioToSave, setCollectioToSave] = useState<string>(null!);

  const [nftPolicyId, setNftPolicyId] = useState<string>("");
  const assetNameSort = basicInfoToMint?.assetName || "No name";
  const imgSrc = metadataToMint?.image || "";
  const mediaType =
    imgSrc == "" ? "text/plain" : metadataToMint?.mediaType || "image/png";
  // const description = metadataToMint?.description || "";

  useEffect(() => {
    getContractPolicyId().then(setNftPolicyId);
  }, []);

  return (
    <div className="h-full py-8 px-10 m-auto flex flex-col">
      <div className="rounded-md border border-dashed p-4">
        <div className="w-full flex flex-wrap gap-5">
          <div className="flex flex-row gap-6 w-full">
            {/* NFT Image */}
            <div className="w-full h-full md:w-1/2">
              <AspectRatio ratio={4 / 4}>
                <FileDisplay
                  src={imgSrc}
                  alt={"image"}
                  objectFit="contain"
                  type={mediaType}
                  className="h-auto w-full rounded-lg border object-contain"
                />
              </AspectRatio>
            </div>

            {/* NFT Details */}
            <Card className="w-full h-full md:w-1/2 bg-card ">
              <CardContent className="p-6 space-y-6">
                {/* Title and Verification */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold">{assetNameSort}</h1>
                    <span className="text-blue-400">✓</span>
                  </div>
                </div>

                {/* Policy and Asset IDs */}
                <div className="space-y-2 ">
                  <div className="flex items-center justify-between p-2 bg-gray-800 rounded-lg">
                    <span className="text-sm text-gray-400">
                      Policy ID: {shortenString(nftPolicyId, 10)}
                    </span>
                    <CoppyButton content={nftPolicyId} />
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-800 rounded-lg">
                    <span className="text-sm text-gray-400">
                      Asset ID: (will show affter mint)
                    </span>
                  </div>
                </div>
                <SaveMetadata
                  collectioToSave={collectionToSave}
                  setCollectionToSave={setCollectionToSave}
                />
                {/* Description */}
                {/* <p className="text-gray-400">{123}</p> */}
              </CardContent>
            </Card>
          </div>

          {/* Tabs Section */}
          <div className="w-full mt-5">
            <Card className="p-5 border-none rounded-lg flex flex-col gap-8">
              <div className="flex flex-col gap-8">
                <div className="grid grid-cols-2 gap-y-5 gap-x-2">
                  {metadataToMint &&
                    Object.entries(metadataToMint).map(
                      ([name, value], index) => (
                        <TooltipProvider key={index}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Property
                                image=""
                                name={name}
                                value={
                                  isNil(value) || isEmpty(value)
                                    ? "null"
                                    : `${value}`
                                }
                              />
                            </TooltipTrigger>
                            <TooltipContent>
                              {isNil(value) || isEmpty(value)
                                ? "null"
                                : `${value}`}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ),
                    )}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <div className="fixed right-0 bottom-0 z-10 max-h-16 w-full bg-section">
        <div className="mx-4 flex h-16 items-center sm:mx-8">
          <div className="flex flex-1 items-center justify-end space-x-2">
            <Button
              variant="secondary"
              onClick={stepper.prev}
              disabled={stepper.isFirst}
            >
              Back
            </Button>
            <Button onClick={startMinting}>Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
