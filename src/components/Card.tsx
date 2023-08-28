import clsx from "clsx";
import React from "react";
const Card = ({
  className,
  title,
  children,
}: {
  className? : string
  title: string;
  children: React.ReactNode;
}) => {
  const contents = (
    <div className={clsx("px-8 flex flex-row items-center max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700", className)}>
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {children}
        </p>
      </div>
    </div>
  );

  return contents
};

export default Card;
