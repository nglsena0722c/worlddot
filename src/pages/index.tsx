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
      top : offsetPosition,
      behavior : "smooth"
    })
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
        <div>
          World Dot is Cool
        </div>
       </QueryClientProvider>
    </Layout>
  );
}
