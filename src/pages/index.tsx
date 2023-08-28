import React, { useEffect, useRef, useState } from "react";
import Layout from "@theme/Layout";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  WalletControllerChainOptions,
  getChainOptions,
} from "@xpla/wallet-provider";
import clsx from "clsx";
import Link from "@docusaurus/Link";

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
              4. However, if you "lock" your dot, anyone can't paint to your dot easily until 30 height(Now, Lock height is 30, but it can be
              changed later). You can "lock" by paying XPLA to the contract when painting.
            </span>
            <span>
              5. After 30 height, your lock is unlocked automatically, and anyone
              can paint at dot with No XPLA again. And your locked XPLA will be returned. You can "claim" your lock XPLA in <Link to="/docs/Claim">Claim page</Link> .
            </span>
            <span>
              6. Someone can unlock your locked dot with paying Same XPLA that you payed. Then, you can claim early and get twice XPLA (your lock XPLA + someone's unlock XPLA)!
            </span>
            <Link to="/docs/WorldDot">7. Enjoy it!</Link>
            <span>--------</span>
            <span>
              1. 누구나 아무 점에 Dot를 찍을 수 있습니다.
            </span>
            <span>
              2. 그러나 여러분이 사용할 수 있는 색은 하나밖에 없습니다. 색은 여러분이 결정하는 것이 아닙니다. World Dot은 여러분의 XPLA Address로 ETH Address를 만들어내고, ETH Address의 첫 6글자를 색 코드로 사용합니다.
            </span>
            <span>3. 누구나 이미 찍힌 Dot 위에 "덧칠"할 수 있습니다.</span>
            <span>
              4. 여러분은 Dot 위에 "Lock"을 걸면, 이후 30 블록 가량 다른 사람이 쉽게 "덧칠"할 수 없게 할 수 있습니다. (지금은 30 블록이지만, 추후에 변경될 수도 있습니다.) 
              여러분은 Dot을 찍을 때, 컨트랙트에 XPLA를 지불하여 "Lock"을 걸 수 있습니다.
            </span>
            <span>
              5. 30블록이 지나면, "Lock"이 자동으로 해제되고 다시 다른 사람들이 쉽게 "덧칠"할 수 있습니다. 여러분은 "Lock"에 사용한 XPLA를 <Link to="/docs/Claim">Claim page</Link>에서 돌려받을 수 있습니다.
            </span>
            <span>
              6. 여러분이 "Lock"을 걸었던 Dot을 누군가가 "UnLock"할 수도 있습니다. 여러분이 "Lock"을 걸 때 지불한 XPLA만큼 동일한 금액으로 "UnLock"이 가능합니다. 이 경우 여러분은 30블록을 기다리지 않고, 바로 두 배의 XPLA를 받을 수 있습니다. (여러분이 Lock을 건 XPLA 양 + 다른 사람이 UnLock했을 때 지불한 XPLA 양)
            </span>
            <Link to="/docs/WorldDot">7. World Dot를 즐겨보세요.</Link>
          </div>
        </div>
      </QueryClientProvider>
    </Layout>
  );
}
