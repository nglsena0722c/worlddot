import React, { useState } from "react";
import "./index.css";
import clsx from "clsx";

interface Dot {
  X: number;
  Y: number;
  backgroundColor: "white" | "gray";
}

const Canvas = () => {
  const dotCount = 50;
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

  return (
    <div
      className="w-full aspect-square border-2 border-black-600 border-solid grid"
      style={{
        gridTemplateColumns: `repeat(${dotCount}, minmax(0, 1fr))`,
      }}
    >
      {dotDoubleArray.map((dotArray, idx) => {
        return dotArray.map((dot) => {
          return <SingleDot key={dot.X + dot.Y} dot={dot} />;
        });
      })}
    </div>
  );
};

export default Canvas;

const SingleDot = ({ dot }: { dot: Dot }) => {
  return (
    <div className="relative" onClick={() => makeTransaction(dot)}>
      <div
        className={clsx(
          "hover:bg-[#B2B2B2] aspect-square",
          dot.backgroundColor === "white" ? "bg-white" : "bg-[#D9D9D9]",
          "dot-popup-container z-0 border-0"
        )}
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
        backgroundColor : {dot.backgroundColor}
        <br />
        Owner : <br />
        Lock XPLA : <br />
      </div>
    </div>
  );
};

const makeTransaction = (dot: Dot) => {
  console.log("click!");
};
