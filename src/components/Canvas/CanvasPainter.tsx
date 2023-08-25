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
      const dotDoubleArray = string2Arr(stringDotData);
      latestDots.map((latestDot) => {
        dotDoubleArray[latestDot[1].y - 1][latestDot[1].x - 1] = {
          X: latestDot[1].x,
          Y: latestDot[1].y,
          backgroundColor: latestDot[1].color,
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

  return (
    <>
      <div>Contract Address : {contractAddress}</div>
      <div>
        Your Balance :{" "}
        {balanceLoading ? (
          <CircularProgress />
        ) : (
          <span>{userBalance.length === 0 ? "0XPLA" : userBalance}</span>
        )}
      </div>
      <div>Your Color : {color}</div>
      <div>Dot Width : {configData.dotcount}</div>
      <div>Lock Block Height : {configData.lock_block_height}</div>
      <div>If you lock, you need to pay XPLA.</div>
      <button
        onClick={async () => {
          const clickedArray: string[] = JSON.parse(clicked);
          const dots = [];
          let lockAmount = 0;
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
            });
            lockAmount += dot.lock;
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
                lockAmount === 0
                  ? undefined
                  : [new Coin("axpla", lockAmount.toString())]
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
        paint
      </button>
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
      <div
        className="w-full aspect-square border-2 border-black-600 border-solid grid"
        style={{
          gridTemplateColumns: `repeat(${dotCount}, minmax(0, 1fr))`,
        }}
      >
        {string2Arr(stringDotData).map((dotArray, idx) => {
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
      <button onClick={() => setClicked("[]")}>Reset Your Click</button>
      <div>
        You clicked : <br />{" "}
        {JSON.parse(clicked).map((dot, index) => {
          const json_dot = JSON.parse(dot);
          return (
            <span key={index}>
              <div>----------------</div>
              X: {json_dot.X}
              <br />Y : {json_dot.Y}
              <br />
              Lock :{" "}
              <input
                type={"number"}
                onChange={(e) => {
                  const clickedArray: string[] = JSON.parse(clicked);
                  const found = clickedArray.find((e) =>
                    e.startsWith(`{"X" : ${json_dot.X},"Y" : ${json_dot.Y}`)
                  );
                  const idx = clickedArray.indexOf(found);
                  clickedArray[
                    idx
                  ] = `{"X" : ${json_dot.X},"Y" : ${json_dot.Y}, "backgroundColor" : "${color}", "lock" : ${e.target.value}}`;
                  setClicked(JSON.stringify(clickedArray));
                }}
                value={json_dot.lock}
              />
              <br />
            </span>
          );
        })}
      </div>
    </>
  );
};

export default CanvasPainter;

const string2Arr = (stringDotData: string) => {
  const dotDoubleArray = JSON.parse(stringDotData);
  return dotDoubleArray;
};
