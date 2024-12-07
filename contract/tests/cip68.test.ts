/* eslint-disable @typescript-eslint/no-unused-vars */
import { blockfrostProvider } from "@/lib/cardano";
import { describe, test, expect, beforeEach, jest } from "@jest/globals";
import { BlockfrostProvider, BrowserWallet, deserializeAddress, KoiosProvider, MeshTxBuilder, MeshWallet } from "@meshsdk/core";
import { Cip68Contract } from "../script";

describe("Mint, Burn, Update, Remove Assets (NFT/TOKEN) CIP68", function () {
  let txHashTemp: string;
  let meshTxBuilder: MeshTxBuilder;
  let wallet: MeshWallet;
  beforeEach(async function () {
    wallet = new MeshWallet({
      networkId: 0,
      fetcher: blockfrostProvider,
      submitter: blockfrostProvider,
      key: {
        type: "mnemonic",
        words: process.env.APP_MNEMONIC?.split(" ") || [],
      },
    });

    meshTxBuilder = new MeshTxBuilder({
      fetcher: blockfrostProvider,
      evaluator: blockfrostProvider,
      submitter: blockfrostProvider,
    });
  });
  jest.setTimeout(60000);

  test("Mint", async function () {
    return;
    const cip68Contract: Cip68Contract = new Cip68Contract({
      fetcher: blockfrostProvider,
      wallet: wallet,
      meshTxBuilder: meshTxBuilder,
    });
    const unsignedTx: string = await cip68Contract.mint([
      {
        assetName: "CIP68 Generators v1",
        metadata: {
          name: "CIP68 Generators",
          image: "ipfs://QmRzicpReutwCkM6aotuKjErFCUD213DpwPq6ByuzMJaua",
          mediaType: "image/jpg",
          description: "Open source dynamic assets (Token/NFT) generator (CIP68)",
          _pk: deserializeAddress(wallet.getChangeAddress()).pubKeyHash,
        },
        quantity: "1",
        receiver: null!,
      },
      {
        assetName: "CIP68 Generators v2",
        metadata: {
          name: "CIP68 Generators",
          image: "ipfs://QmRzicpReutwCkM6aotuKjErFCUD213DpwPq6ByuzMJaua",
          mediaType: "image/jpg",
          description: "Open source dynamic assets (Token/NFT) generator (CIP68)",
          _pk: deserializeAddress(wallet.getChangeAddress()).pubKeyHash,
        },
        quantity: "2",
        receiver: null!,
      },
    ]);
    const signedTx = wallet.signTx(unsignedTx, true);
    const txHash = await wallet.submitTx(signedTx);
    console.log(txHash);
    txHashTemp = txHash;
    blockfrostProvider.onTxConfirmed(txHash, () => {
      expect(txHash.length).toBe(64);
    });
  });

  test("Update", async function () {
    return;
    const cip68Contract: Cip68Contract = new Cip68Contract({
      fetcher: blockfrostProvider,
      wallet: wallet,
      meshTxBuilder: meshTxBuilder,
    });
    const unsignedTx: string = await cip68Contract.update([
      {
        assetName: "CIP68 Generators 4444",
        metadata: {
          name: "CIP68 Generators",
          image: "ipfs://QmRzicpReutwCkM6aotuKjErFCUD213DpwPq6ByuzMJaua",
          mediaType: "image/jpg",
          description: "Open source dynamic assets (Token/NFT) generator (CIP68)",
          owner: wallet.getChangeAddress(),
          _pk: deserializeAddress(wallet.getChangeAddress()).pubKeyHash,
        },
      },
    ]);
    const signedTx = wallet.signTx(unsignedTx, true);
    const txHash = await wallet.submitTx(signedTx);
    console.log(txHash);
    txHashTemp = txHash;
    expect(txHash.length).toBe(64);
  });

  test("Burn", async function () {
    // return;
    const cip68Contract: Cip68Contract = new Cip68Contract({
      fetcher: blockfrostProvider,
      wallet: wallet,
      meshTxBuilder: meshTxBuilder,
    });
    const unsignedTx: string = await cip68Contract.burn([
      {
        assetName: "CIP68 Generators v1",
        quantity: "-1",
      },
      // {
      //   assetName: "CIP68 Generators v2",
      //   quantity: "-2",
      // },
    ]);
    const signedTx = wallet.signTx(unsignedTx, true);
    const txHash = await wallet.submitTx(signedTx);
    console.log(txHash);
    txHashTemp = txHash;
    jest.setTimeout(20000);
    expect(txHash.length).toBe(64);
  });

  test("Mint Reference Script", async function () {
    // const cip68Contract: Cip68Contract = new Cip68Contract({
    //   fetcher: blockfrostProvider,
    //   wallet: wallet,
    //   meshTxBuilder: meshTxBuilder,
    // });
    // const unsignedTx: string = await cip68Contract.createReferenceScriptMint();
    // const signedTx =  wallet.signTx(unsignedTx, true);
    // const txHash = await wallet.submitTx(signedTx);
    // console.log(txHash);
    // expect(txHash.length).toBe(64);
  });

  test("Store Reference Script", async function () {
    // const cip68Contract: Cip68Contract = new Cip68Contract({
    //   fetcher: blockfrostProvider,
    //   wallet: wallet,
    //   meshTxBuilder: meshTxBuilder,
    // });
    // const unsignedTx: string = await cip68Contract.createReferenceScriptStore();
    // const signedTx = wallet.signTx(unsignedTx, true);
    // const txHash = await wallet.submitTx(signedTx);
    // console.log(txHash);
    // expect(txHash.length).toBe(64);
  });
});
