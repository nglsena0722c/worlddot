import React, { useState } from "react";
import { CircularProgress } from "@mui/material";
import {
  ConnectedWallet,
  UserDenied,
  useConnectedWallet,
} from "@xpla/wallet-provider";
import useUserLockData from "../useQuery/useUserLockData";
import useContractConfig, { Config } from "../useQuery/useContractConfig";
import useLatestBlock from "../useQuery/useLatestBlock";
import { MsgExecuteContract, TxResult } from "@xpla/xpla.js";

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
      {!loadingContractConfig && (
        <div>After {contractConfig.lock_block_height}, you can claim.</div>
      )}
      <div></div>
      <UserClaimData
        contractConfig={contractConfig}
        contractAddress={contractAddress}
        connectedWallet={connectedWallet}
        latestBlock={latestBlock}
      />
    </>
  );
};

const UserClaimData = ({
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
  const { isLoading, data: userLockData } = useUserLockData(
    contractAddress,
    connectedWallet.xplaAddress
  );

  return isLoading ? (
    <CircularProgress />
  ) : (
    <>
      {userLockData.map((datum) => (
        <SingleLockData
          key={datum[1].x + datum[1].y + datum[1].lock.amount}
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

const SingleLockData = ({
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
  datum: [
    number,
    {
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
  ];
}) => {
  const [txResult, setTxResult] = useState<TxResult | null>(null);
  const [txError, setTxError] = useState<string>(null);
  return (
    <>
      <div className="flex w-full justify-between">
        <div>
          ------- <br />
          {!datum[1].unlocked && Number(latestBlock) <
            contractConfig.lock_block_height + Number(datum[0]) &&  (
            <div className="text-[#ff0000]">
              {" "}
              You can't claim this dot. You need to wait some block.
            </div>
          )}
          Lock Block Height :
          {datum[0] === 1 ? "Your dot is unlocked." : datum[0]}
          <br />
          dot - X : {datum[1].x} <br />
          dot - Y : {datum[1].y} <br />
          color : {datum[1].color} <br />
          Lock Amount : {datum[1].lock.amount} <br />
          ------- <br />
        </div>
        <button
          onClick={async () => {
            const executionMsg = {
              msgs: [
                new MsgExecuteContract(
                  connectedWallet.xplaAddress,
                  contractAddress,
                  {
                    claim_lock_amount: {
                      user: connectedWallet.xplaAddress,
                      block_height: Number(datum[0]),
                    },
                  },
                  undefined
                ),
              ],
            };
            try {
              const tx = await connectedWallet.post(executionMsg);
              setTxResult(tx);
            } catch (error) {
              if (error instanceof UserDenied) {
                setTxError("User Denied");
              } else {
                setTxError(
                  `Unknown Error: ${
                    error instanceof Error ? error.message : String(error)
                  }`
                );
              }
            }
          }}
        >
          claim
        </button>
      </div>
      <div className="block rounded-lg border bg-white p-6 shadow dark:border-neutral-700 dark:bg-neutral-800 ">
        <div className="flex items-center justify-between gap-4">
          Result
          {txResult && (
            <a
              href={`https://explorer.xpla.io/testnet/tx/${txResult.result.txhash}`}
              target="_blank"
              rel="noreferrer"
            >
              {txResult.result.txhash}
            </a>
          )}
          <span>{txError}</span>
        </div>
      </div>
    </>
  );
};
