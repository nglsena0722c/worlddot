import React, { useState } from "react";
import { CircularProgress } from "@mui/material";
import {
  ConnectedWallet,
  useConnectedWallet,
} from "@xpla/wallet-provider";
import useUserDots from "../useQuery/useUserDots";
import useContractConfig, { Config } from "../useQuery/useContractConfig";
import useLatestBlock from "../useQuery/useLatestBlock";

export interface Dot {
  X: number;
  Y: number;
  backgroundColor: string;
  dotOwner?: string;
  lock_amount?: string;
  painted_block?: number;
}

const Claim = () => {
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
      <br />
      <div>Latest Block : {latestBlock}</div>
      <div></div>
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
    <>
      {userDotsData.map((datum) => (
        <SingleDotData
          key={datum.x + datum.y }
          contractConfig={contractConfig}
          contractAddress={contractAddress}
          connectedWallet={connectedWallet}
          latestBlock={latestBlock}
          datum={datum}
        />
      ))}
    </>
  );
};

export default Claim;

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
      unlocked : boolean;
    }
  ;
}) => {
  return (
    <>
      <div className="flex w-full justify-between">
        <div>
          ------- <br />
          dot - X : {datum.x} <br />
          dot - Y : {datum.y} <br />
          color : {datum.color} <br />
          {datum.lock ? <>Lock Amount : {datum.lock?.amount} <br /></> : <>No Lock<br/></> }
          
          ------- <br />
        </div>
      </div>
    </>
  );
};
