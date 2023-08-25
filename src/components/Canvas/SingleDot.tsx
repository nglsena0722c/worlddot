import React, { Dispatch } from "react";
import "./index.css";
import clsx from "clsx";
import { Dot } from ".";
import { truncate } from '@xpla.kitchen/utils';


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
  const isPainted = !(dot.backgroundColor === "white" ||
  dot.backgroundColor === "#D9D9D9");
  const save_isClicked = isClicked(dot.X, dot.Y, clicked);

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
          "aspect-square",
          "dot-popup-container z-0 border-0",
          (isPainted || save_isClicked) ? "hover-opacity" : "hover-gray"
        )}
        style={
          save_isClicked
            ? {
                backgroundColor: color,
              }
            : {
                backgroundColor: dot.backgroundColor,
              }
        }
      />
      <div
        className={clsx(
          "absolute left-[100%] top-0 w-[250px] h-[150px] bg-black p-4",
          "dot-popup z-10 border-0 text-white flex items-start justify-center flex-col"
        )}
      >
        X : {dot.X}, Y : {dot.Y}
        {
          isPainted &&
          <>
        <br/>backgroundColor : {save_isClicked ? color : dot.backgroundColor}
          </>
        }
        <br />
        {
            dot.dotOwner && <div>Owner : {truncate(dot.dotOwner)} <br /></div>
        }
        {
            dot.lock_amount && <div>Lock XPLA : {dot.lock_amount} <br /></div>
        }
        {
          dot.painted_block && <div>Painted Block : {dot.painted_block} <br /></div>
        }
      </div>
    </div>
  );
};

export default SingleDot;

const isClicked = (X: number, Y: number, clicked: string) => {
  const clickedArr = JSON.parse(clicked)
    .map((dot) => JSON.parse(dot))
    .filter((dot) => dot.X === X && dot.Y === Y);
  return clickedArr.length !== 0;
};

