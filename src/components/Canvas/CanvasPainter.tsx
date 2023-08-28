import React, { useEffect, useState } from "react";
import "./index.css";
import { Config } from "../useQuery/useContractConfig";
import { CircularProgress } from "@mui/material";
import { TxResult, ConnectedWallet, UserDenied } from "@xpla/wallet-provider";
import xplaToETHAddress from "../Util/xplaToETHAddress";
import useBalance from "../useQuery/useBalance";
import { Coin, MsgExecuteContract } from "@xpla/xpla.js";
import useLatestDots from "../useQuery/useLatestDots";
import { Dot } from ".";
import SingleDot from "./SingleDot";
import useLatestBlock from "../useQuery/useLatestBlock";
import Card from "../Card";
import clsx from "clsx";

const CanvasPainter = ({
  configData,
  connectedWallet,
  contractAddress,
}: {
  configData: Config;
  connectedWallet: ConnectedWallet;
  contractAddress: string;
}) => {
  const dotCount = configData.dotcount;
  const [stringDotData, setStringDotData] = useState<string>("[]");
  const { isLoading: latestBlockLoading, data: latestBlock } = useLatestBlock();

  useEffect(() => {
    const dotDoubleArray: Dot[][] = [];
    for (let i = 1; i <= dotCount; i++) {
      const dotArray: Dot[] = [];
      for (let j = 1; j <= dotCount; j++) {
        dotArray.push({
          X: j,
          Y: i,
          backgroundColor: (j + i) % 2 === 0 ? "white" : "#D9D9D9",
        });
      }
      dotDoubleArray.push(dotArray);
    }
    setStringDotData(JSON.stringify(dotDoubleArray));
  }, []);

  const { data: latestDots } = useLatestDots(contractAddress);

  useEffect(() => {
    if (latestDots && latestDots.length !== 0) {
      const dotDoubleArray: Dot[][] = string2Arr(stringDotData);
      latestDots.map((latestDot) => {
        dotDoubleArray[latestDot[1].y - 1][latestDot[1].x - 1] = {
          X: latestDot[1].x,
          Y: latestDot[1].y,
          backgroundColor: latestDot[1].color,
          dotOwner: latestDot[1].dot_owner,
          lock_amount: latestDot[1].lock ? latestDot[1].lock.amount : "0",
          painted_block: latestDot[0],
        };
      });
      setStringDotData(JSON.stringify(dotDoubleArray));
    }
  }, [latestDots]);

  const userAddress = connectedWallet.xplaAddress;
  const { isLoading: balanceLoading, data: userBalance } =
    useBalance(userAddress);
  const color = "#" + xplaToETHAddress(userAddress).slice(0, 6);

  const [clicked, setClicked] = useState<string>("[]");
  const [txResult, setTxResult] = useState<TxResult | null>(null);
  const [txError, setTxError] = useState<string>(null);

  const { lockAmount, unlockAmount } = getAmountXPLAForLock(
    clicked,
    stringDotData
  );
  return (
    <>
      <div className="grid gap-10 grid-cols-2">
        <Card
          title="Block Info"
          children={
            <>
              {latestBlockLoading ? (
                <CircularProgress />
              ) : (
                <div>XPLA Latest Block : {latestBlock} </div>
              )}
              {latestDots && latestDots.length !== 0 && (
                <div>
                  lastest Changed Block :{" "}
                  {Math.max(...latestDots.map((v) => v[0]))}
                </div>
              )}
            </>
          }
        />
        <Card
          title="User Info"
          children={
            <>
              <div>
                Your Balance :{" "}
                {balanceLoading ? (
                  <CircularProgress />
                ) : (
                  <span>
                    {userBalance.length === 0
                      ? "0XPLA"
                      : (
                          Number(
                            userBalance.substring(0, userBalance.length - 5)
                          ) /
                          10 ** 18
                        ).toFixed(2) + " XPLA (Fixed : 2)"}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                Your Color : {color}{" "}
                <div
                  className="h-[20px] aspect-square"
                  style={{ border: "1px solid black", backgroundColor: color }}
                ></div>
              </div>
            </>
          }
        />
        <Card
          title="World Dot Info"
          className="col-span-2"
          children={
            <div>
              <div>Contract Address : {contractAddress}</div>
              <div>Dot Width : {configData.dotcount}</div>
              <div>Lock Block Height : {configData.lock_block_height}</div>
            </div>
          }
        />
      </div>

      <div
        className="mt-8 w-full aspect-square border-2 border-black-600 border-solid grid"
        style={{
          gridTemplateColumns: `repeat(${dotCount}, minmax(0, 1fr))`,
        }}
      >
        {string2Arr(stringDotData).map((dotArray) => {
          return dotArray.map((dot) => {
            return (
              <SingleDot
                key={dot.X + dot.Y}
                dot={dot}
                color={color}
                clicked={clicked}
                setClicked={setClicked}
              />
            );
          });
        })}
      </div>

      <div
        className={clsx(
          "mt-8 px-8 flex flex-row items-center max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        )}
      >
        <div className="p-5 w-full">
          <h5 className="w-full flex justify-between items-center  mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            <span>You clicked :</span>
            <button
              className=" cursor-pointer py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              onClick={() => setClicked("[]")}
            >
              Reset Your Click
            </button>
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            <p>If you want to lock, you need to pay XPLA.</p>
          </p>
          {JSON.parse(clicked).map((dot, index) => {
            const json_dot = JSON.parse(dot);
            return (
              <div key={index} className="my-4">
                <div
                  className="w-full mb-4"
                  style={{ border: "1px solid gray" }}
                />
                X: {json_dot.X}
                <br />Y : {json_dot.Y}
                <br />
                Lock (You need to input only number!) :{" "}
                <input
                  onChange={(event) => {
                    let lockAmt = Number(event.target.value) || 0;
                    const clickedArray: string[] = JSON.parse(clicked);
                    const found = clickedArray.find((e) =>
                      e.startsWith(`{"X" : ${json_dot.X},"Y" : ${json_dot.Y}`)
                    );
                    const idx = clickedArray.indexOf(found);
                    clickedArray[
                      idx
                    ] = `{"X" : ${json_dot.X},"Y" : ${json_dot.Y}, "backgroundColor" : "${color}", "lock" : ${lockAmt}}`;
                    setClicked(JSON.stringify(clickedArray));
                  }}
                  value={json_dot.lock}
                />
                <br />
              </div>
            );
          })}
        </div>
      </div>

      <button
        className="mt-8 w-full cursor-pointer py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        onClick={async () => {
          const clickedArray: string[] = JSON.parse(clicked);
          const dots = [];
          for (let string_dot of clickedArray) {
            const dot = JSON.parse(string_dot);
            const lock =
              dot.lock === 0
                ? null
                : {
                    denom: "axpla",
                    amount: dot.lock.toString(),
                  };
            dots.push({
              x: dot.X,
              y: dot.Y,
              color: color,
              dot_owner: userAddress,
              lock,
              unlocked: lock === null ? true : false,
            });
          }

          const executionMsg = {
            msgs: [
              new MsgExecuteContract(
                userAddress,
                contractAddress,
                {
                  paint: {
                    user: userAddress,
                    dots,
                  },
                },
                lockAmount + unlockAmount === 0
                  ? undefined
                  : [new Coin("axpla", (lockAmount + unlockAmount).toString())]
              ),
            ],
          };
          try {
            console.log(1);
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
        <div>
          You will Pay : {lockAmount + unlockAmount}{" "}
          <span className="text-[#ff0000]">aXPLA</span> (You will unLock with{" "}
          {unlockAmount} <span className="text-[#ff0000]">aXPLA</span> and Lock
          new Block with {lockAmount}{" "}
          <span className="text-[#ff0000]">aXPLA</span>)
        </div>
        If you want to paint your dot, click this button.
      </button>
      {txResult && (
        <>
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
            </div>
          </div>
        </>
      )}
      {txError && (
        <>
          <div className="mt-4 block rounded-lg border bg-white p-6 shadow dark:border-neutral-700 dark:bg-neutral-800 ">
            <div className="flex items-center justify-between gap-4">
              Result
              <span>{txError}</span>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CanvasPainter;

const string2Arr = (stringDotData: string) => {
  const dotDoubleArray = JSON.parse(stringDotData);
  return dotDoubleArray;
};

const getAmountXPLAForLock = (clicked: string, stringDotData: string) => {
  const dotData = JSON.parse(stringDotData);
  const clickedArray: string[] = JSON.parse(clicked);
  let lockAmount = 0;
  let unlockAmount = 0;
  for (let string_dot of clickedArray) {
    const dot = JSON.parse(string_dot);
    unlockAmount += dotData[dot.Y - 1][dot.X - 1].lock_amount
      ? Number(dotData[dot.Y - 1][dot.X - 1].lock_amount)
      : 0;
    lockAmount += dot.lock;
  }
  return {
    lockAmount,
    unlockAmount,
  };
};
