import React, { useEffect, useRef, useState } from "react";
import Layout from "@theme/Layout";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  WalletControllerChainOptions,
  getChainOptions,
} from "@xpla/wallet-provider";
import clsx from "clsx";

export default function Home(): JSX.Element {
  const element = useRef<HTMLDivElement>(null);
  const onMoveToElement = () => {
    var headerOffset = 80;
    var elementPosition = element.current.getBoundingClientRect().top;
    var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  const [chainOptions, setChainoptions] =
    useState<WalletControllerChainOptions>();

  useEffect(() => {
    getChainOptions()
      .then((c) => setChainoptions(c))
      .catch((e) => {
        // console.log(e);
      });
  }, []);

  const queryClient = new QueryClient();

  return (
    <Layout
      title={`World Dot`}
      description="This is World Dot with XPLA Blockchain"
    >
      <QueryClientProvider client={queryClient}>
        <div className="w-full flex justify-center">
          <div className="max-w-[1180px] w-full py-4 flex flex-col gap-4">
            <span>World Dot Rule</span>
            <span>
              1. Anyone can paint at dot, but if you want to paint many dots,
              fee will increase.
            </span>
            <span>
              2. But You have only one color. You can't decide color, color is
              decided by your xpla address. We calculate your eth address from
              your xpla address, and then your initial six letter of eth address
              is your color code.
            </span>
            <span>3. Anyone can "paint over" already painted dot.</span>
            <span>
              4. However, if you "lock" your dot when painting, your dot is
              locked until 30 height(Now, Lock height is 30, but it can be
              changed later).
            </span>
            <span>
              5. After 30 height, your lock is unlocked automatically, so anyone
              can paint at dot. And your locked XPLA will be returned.
            </span>
            <span>
              6. And your dot can be unlocked if someone lock with more XPLA.
            </span>
            <span>7. Enjoy it!</span>
          </div>
        </div>
      </QueryClientProvider>
    </Layout>
  );
}
