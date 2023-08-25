import React, { Dispatch } from "react";
import "./index.css";
import clsx from "clsx";
import { Dot } from ".";

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
          {
            "hover-gray": !isPainted, // 유저의 color 는 소문자 color 색코드라서 유저 코드랑 겹칠일이 없다.
          },
          {
            "hover-opacity": isPainted
          }
        )}
        style={
          isClicked(dot.X, dot.Y, clicked)
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
        <br/>backgroundColor : {isClicked(dot.X, dot.Y, clicked) ? color : dot.backgroundColor}
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

const truncate = (text: string | undefined, [h, t]: [number, number] = [6, 6], twoLines = false) => {
    if (!text) return text;
    if (h + t >= text.length) return text;
    const head = h > 0 ? text.slice(0, h) : '';
    const tail = t > 0 ? text.slice(-t) : '';
    return head + (twoLines ? '\n' : '') + '...' + tail;
}
  
