"use client";

import { createContext, useContext } from "react";
import { toast } from "@/hooks/use-toast";
import { isNil } from "lodash";
import { submitTx } from "@/services/blockchain/submitTx";
import { defineStepper } from "@stepperize/react";
import useMintManyStore, { MintManyStore } from "./store";
import { useBlockchainContext } from "@/components/providers/blockchain";

const { useStepper: useMintManyStepper, steps: mintManySteps } = defineStepper(
  { id: "template", title: "Template" },
  { id: "basic", title: "Basic" },
  { id: "metadata", title: "Metadata" },
  { id: "preview", title: "Preview" },
  { id: "transaction", title: "Transaction" },
  { id: "result", title: "Result" },
);

type MintManyContextType = MintManyStore & {
  mintManyStepper: ReturnType<typeof useMintManyStepper>;
  mintManySteps: typeof mintManySteps;
  startMinting: () => void;
};

export default function MintManyProvider({
  children,
}: {
  collectionId: string | null;
  children: React.ReactNode;
}) {
  const { signTx, address } = useBlockchainContext();
  const mintManyStepper = useMintManyStepper();
  const { updateTaskState, setTxHash, resetTasks } = useMintManyStore();

  const startMinting = async () => {
    resetTasks();
    mintManyStepper.goTo("transaction");
    try {
      updateTaskState("inprogress", "validate", "Validating Data");

      if (isNil(address)) {
        throw new Error("Wallet not connected");
      }

      // if (isNil(metadataToMint) && isEmpty(metadataToMint)) {
      //   throw new Error("Metadata is required");
      // }

      await new Promise((resolve) => setTimeout(resolve, 500));

      updateTaskState(
        "inprogress",
        "create_transaction",
        "Creating Transaction",
      );
      const { data: tx, result, message } = null!;
      if (!result || isNil(tx)) {
        throw new Error(message);
      }
      // await new Promise((resolve) => setTimeout(resolve, 2000));

      // wait for confirmation
      updateTaskState("inprogress", "sign_transaction", "Waiting for  sign Tx");
      const signedTx = await signTx(tx);
      updateTaskState(
        "inprogress",
        "submit_transaction",
        "Submitting Transaction",
      );
      // submit transaction
      const {
        data: txHash,
        result: txResult,
        message: txMessage,
      } = await submitTx(signedTx);
      if (!txResult || isNil(txHash)) {
        throw new Error(txMessage);
      }
      setTxHash(txHash);
      updateTaskState("success");
      // show result
      mintManyStepper.goTo("result");
      // create transaction
    } catch (e) {
      updateTaskState(
        "error",
        "",
        e instanceof Error ? e.message : "unknown error",
      );
      toast({
        title: "Error",
        description: e instanceof Error ? e.message : "unknown error",
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
    throw new Error(
      "useMintManyContext must be used within a MintManyProvider",
    );
  }
  return context;
};
