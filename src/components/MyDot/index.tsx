import React, { useState } from "react";
import { CircularProgress } from "@mui/material";
import { ConnectedWallet, useConnectedWallet } from "@xpla/wallet-provider";
import useUserDots from "../useQuery/useUserDots";
import useContractConfig, { Config } from "../useQuery/useContractConfig";
import useLatestBlock from "../useQuery/useLatestBlock";
import Card from "../Card";
import clsx from "clsx";

export interface Dot {
  X: number;
  Y: number;
  backgroundColor: string;
  dotOwner?: string;
  lock_amount?: string;
  painted_block?: number;
}

const MyDot = () => {
  const contractAddress =
    "xpla15g7usr6h3htmnrhege3s2z6sg4d8k066pvp05lp24qy3w5p2svmqtra0vq";
  const connectedWallet = useConnectedWallet();
  const { isLoading: latestBlockLoading, data: latestBlock } = useLatestBlock();
  const { isLoading: loadingContractConfig, data: contractConfig } =
    useContractConfig(contractAddress);

  return !connectedWallet || latestBlockLoading ? (
    <CircularProgress />
  ) : (
    <>
      <Card
        title="Block Info"
        children={
          <>
            <div>Latest Block : {latestBlock}</div>
            {!loadingContractConfig && (
              <div>Lock Block Height : {contractConfig.lock_block_height}</div>
            )}
          </>
        }
      />
      <br />
      <UserDotsData
        contractConfig={contractConfig}
        contractAddress={contractAddress}
        connectedWallet={connectedWallet}
        latestBlock={latestBlock}
      />
    </>
  );
};

const UserDotsData = ({
  contractAddress,
  connectedWallet,
  contractConfig,
  latestBlock,
}: {
  contractAddress: string;
  connectedWallet: ConnectedWallet;
  contractConfig: Config;
  latestBlock: string;
}) => {
  const { isLoading, data: userDotsData } = useUserDots(
    contractAddress,
    connectedWallet.xplaAddress
  );

  return isLoading ? (
    <CircularProgress />
  ) : (
    <div
      className={clsx(
        "mt-8 px-8 flex flex-row items-center max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      )}
    >
      <div className="p-5 w-full">
        <h5 className="w-full flex justify-between items-center  mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          <span>Your Lock Info :</span>
        </h5>
        {userDotsData.map((datum) => (
          <SingleDotData
            key={datum.x + datum.y}
            contractConfig={contractConfig}
            contractAddress={contractAddress}
            connectedWallet={connectedWallet}
            latestBlock={latestBlock}
            datum={datum}
          />
        ))}
      </div>
    </div>
  );
};

export default MyDot;

const SingleDotData = ({
  contractAddress,
  connectedWallet,
  contractConfig,
  latestBlock,
  datum,
}: {
  contractAddress: string;
  connectedWallet: ConnectedWallet;
  contractConfig: Config;
  latestBlock: string;
  datum: {
    x: number;
    y: number;
    lock: {
      denom: string;
      amount: string;
    };
    dot_owner: string;
    color: string;
    unlocked: boolean;
  };
}) => {
  return (
    <>
      <div className="flex w-full justify-between">
        <div className="w-full">
        <div className="w-full my-4" style={{ border: "1px solid gray" }} />
          dot - X : {datum.x} <br />
          dot - Y : {datum.y} <br />
          color : {datum.color} <br />
          {datum.lock ? (
            <>
              Lock Amount : {datum.lock?.amount} <br />
            </>
          ) : (
            <>
              No Lock
              <br />
            </>
          )}
        </div>
      </div>
    </>
  );
};
