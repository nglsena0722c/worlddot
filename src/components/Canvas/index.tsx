import React, { Dispatch, useEffect, useState } from "react";
import "./index.css";
import clsx from "clsx";
import useContractConfig, { Config } from "../useQuery/useContractConfig";
import { CircularProgress } from "@mui/material";
import { useConnectedWallet } from "@xpla/wallet-provider";
import xplaToETHAddress from "../Util/xplaToETHAddress";

interface Dot {
  X: number;
  Y: number;
  backgroundColor: string;
}

const Canvas = () => {
  const contractAddress =
    "xpla1fg8899wfvh8n5xc9repj85f6eve68c9vxas5ye8yvurf8tddksnshwpvpg";
  const { isLoading, data } = useContractConfig(contractAddress);
  const connectedWallet = useConnectedWallet();

  return isLoading ? (
    <CircularProgress />
  ) : !connectedWallet ? (
    <div>Connect Your Wallet</div>
  ) : (
    <CanvasPainter
      configData={data}
      userAddress={connectedWallet.xplaAddress}
    />
  );
};

export default Canvas;

const CanvasPainter = ({
  configData,
  userAddress,
}: {
  configData: Config;
  userAddress: string;
}) => {
  const dotCount = configData.dotcount;
  const dotDoubleArray: Dot[][] = [];
  for (let i = 1; i <= dotCount; i++) {
    const dotArray: Dot[] = [];
    for (let j = 1; j <= dotCount; j++) {
      dotArray.push({
        X: j,
        Y: i,
        backgroundColor: (j + i) % 2 === 0 ? "white" : "gray",
      });
    }
    dotDoubleArray.push(dotArray);
  }

  const color = "#" + xplaToETHAddress(userAddress).slice(0, 6);
  const [clicked, setClicked] = useState<string>("[]");

  return (
    <>
      <div>Your Color : {color}</div>
      <div>Dot Width : {configData.dotcount}</div>
      <div>Lock Block Height : {configData.lock_block_height}</div>
      <div
        className="w-full aspect-square border-2 border-black-600 border-solid grid"
        style={{
          gridTemplateColumns: `repeat(${dotCount}, minmax(0, 1fr))`,
        }}
      >
        {dotDoubleArray.map((dotArray, idx) => {
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

const SingleDot = ({
  dot,
  color,
  clicked,
  setClicked,
}: {
  dot: Dot;
  color: string;
  clicked: string;
  setClicked: Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div
      className="relative"
      onClick={() => {
        const clickedArray: string[] = JSON.parse(clicked);
        const found = clickedArray.find((e) =>
          e.startsWith(`{"X" : ${dot.X},"Y" : ${dot.Y}`)
        );
        if (found === undefined) {
          clickedArray.push(
            `{"X" : ${dot.X},"Y" : ${dot.Y}, "backgroundColor" : "${color}", "lock" : 0}`
          );
          const set = new Set(clickedArray);
          setClicked(JSON.stringify(Array.from(set)));
        } else {
          const idx = clickedArray.indexOf(found);
          if (idx > -1) clickedArray.splice(idx, 1);
          setClicked(JSON.stringify(clickedArray));
        }
      }}
    >
      <div
        className={clsx(
          "hover:bg-[#B2B2B2] aspect-square",
          dot.backgroundColor === "white" ? "bg-white" : "bg-[#D9D9D9]",
          "dot-popup-container z-0 border-0"
        )}
        style={
          isClicked(dot.X, dot.Y, clicked)
            ? {
                backgroundColor: color,
              }
            : {}
        }
      />
      <div
        className={clsx(
          "absolute left-[100%] top-0 w-[300px] h-[150px] bg-black",
          "dot-popup z-10 border-0 text-white flex items-center justify-center "
        )}
      >
        X : {dot.X}
        <br />Y : {dot.Y}
        <br />
        backgroundColor :{" "}
        {isClicked(dot.X, dot.Y, clicked) ? color : dot.backgroundColor}
        <br />
        Owner : <br />
        Lock XPLA : <br />
      </div>
    </div>
  );
};

const isClicked = (X: number, Y: number, clicked: string) => {
  const clickedArr = JSON.parse(clicked)
    .map((dot) => JSON.parse(dot))
    .filter((dot) => dot.X === X && dot.Y === Y);
  return clickedArr.length !== 0;
};
