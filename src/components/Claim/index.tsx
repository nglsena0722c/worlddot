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
    <div
      className={clsx(
        "mt-8 px-8 flex flex-row items-center max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      )}
    >
      <div className="p-5 w-full">
        <h5 className="w-full flex justify-between items-center  mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          <span>Your Lock Info :</span>
        </h5>

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
      </div>
    </div>
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
      unlocked: boolean;
    }
  ];
}) => {
  const [txResult, setTxResult] = useState<TxResult | null>(null);
  const [txError, setTxError] = useState<string>(null);
  return (
    <>
      <div className="flex w-full justify-between">
        <div className="w-full relative ">
          <div className="w-full my-4" style={{ border: "1px solid gray" }} />
          {!datum[1].unlocked &&
            Number(latestBlock) <
              contractConfig.lock_block_height + Number(datum[0]) && (
              <div className="text-[#ff0000]">
                {`You can't claim this dot. You need to wait ${
                  contractConfig.lock_block_height - (Number(latestBlock) - datum[0])
                } block.`}
              </div>
            )}
          Lock Block Height :
          {datum[0] === 1 ? "Your dot is unlocked." : datum[0]}
          <br />
          dot - X : {datum[1].x} <br />
          dot - Y : {datum[1].y} <br />
          color : {datum[1].color} <br />
          Lock Amount : {datum[1].lock.amount} <br />
          <button
            className="absolute right-0 top-8 cursor-pointer py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
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
      </div>
      {txResult && (
        <div className="mt-4 block rounded-lg border bg-white p-6 shadow dark:border-neutral-700 dark:bg-neutral-800 ">
          <div className="flex items-center justify-between gap-4">
            Result
            <a
              href={`https://explorer.xpla.io/testnet/tx/${txResult.result.txhash}`}
              target="_blank"
              rel="noreferrer"
            >
              {txResult.result.txhash}
            </a>
            <span>{txError}</span>
          </div>
        </div>
      )}
    </>
  );
};
