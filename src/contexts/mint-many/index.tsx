"use client";

import { createContext, useContext } from "react";
import { toast } from "@/hooks/use-toast";
import { isEmpty, isNil } from "lodash";
import { submitTx } from "@/services/blockchain/submitTx";
import { defineStepper } from "@stepperize/react";
import useMintManyStore, { MintManyStore } from "./store";
import { useBlockchainContext } from "@/components/providers/blockchain";
import { convertObject } from "@/utils";
import { createMintTransaction } from "@/services/contract/mint";
import { parseError } from "@/utils/error/parse-error";

const { useStepper: useMintManyStepper, steps: mintManySteps } = defineStepper(
  { id: "upload", title: "Upload" },
  { id: "preview", title: "Preview" },
  { id: "transaction", title: "Transaction" },
  { id: "result", title: "Result" },
);

type MintManyContextType = MintManyStore & {
  mintManyStepper: ReturnType<typeof useMintManyStepper>;
  mintManySteps: typeof mintManySteps;
  uploadCsv: (input: { csvContent: string[][]; csvName: string }) => void;
  startMinting: () => void;
};

export default function MintManyProvider({ children }: { collectionId: string | null; children: React.ReactNode }) {
  const { signTx, address } = useBlockchainContext();
  const mintManyStepper = useMintManyStepper();
  const { updateTaskState, setTxHash, resetTasks, setLoading, setAssetInputToMint, assetInputToMint } = useMintManyStore();

  const uploadCsv = async ({
    csvContent,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    csvName,
  }: {
    csvContent: string[][];
    csvName: string;
  }) => {
    setLoading(true);

    try {
      if (isNil(csvContent) || isEmpty(csvContent)) {
        throw new Error("CSV content is empty");
      }
      setAssetInputToMint(convertObject(csvContent));
    } catch (e) {
      toast({
        title: "Error",
        description: parseError(e),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      mintManyStepper.goTo("preview");
    }
  };

  const startMinting = async () => {
    resetTasks();
    mintManyStepper.goTo("transaction");
    try {
      updateTaskState("inprogress", "validate", "Validating Data");

      if (isNil(address)) {
        throw new Error("Wallet not connected");
      }

      if (isNil(assetInputToMint) && isEmpty(assetInputToMint)) {
        throw new Error("Data is required");
      }

      await new Promise((resolve) => setTimeout(resolve, 500));

      updateTaskState("inprogress", "create_transaction", "Creating Transaction");

      const {
        data: tx,
        result,
        message,
      } = await createMintTransaction({
        address: address,
        mintInput: assetInputToMint,
      });
      if (!result || isNil(tx)) {
        throw new Error(message);
      }

      // wait for confirmation
      updateTaskState("inprogress", "sign_transaction", "Waiting for  sign Tx");
      const signedTx = await signTx(tx);
      updateTaskState("inprogress", "submit_transaction", "Submitting Transaction");
      // submit transaction
      const { data: txHash, result: txResult, message: txMessage } = await submitTx(signedTx);
      if (!txResult || isNil(txHash)) {
        throw new Error(txMessage);
      }
      setTxHash(txHash);
      updateTaskState("success");
      // show result
      mintManyStepper.goTo("result");
      // create transaction
    } catch (e) {
      updateTaskState("error", "", parseError(e));
      toast({
        title: "Error",
        description: parseError(e),
        variant: "destructive",
      });
    }
  };

  return (
    <MintManyContext.Provider
      value={{
        ...useMintManyStore(),
        mintManyStepper,
        mintManySteps,
        uploadCsv,
        startMinting,
      }}
    >
      {children}
    </MintManyContext.Provider>
  );
}

const MintManyContext = createContext<MintManyContextType>(null!);
export const useMintManyContext = function () {
  const context = useContext(MintManyContext);
  if (!context) {
    throw new Error("useMintManyContext must be used within a MintManyProvider");
  }
  return context;
};
