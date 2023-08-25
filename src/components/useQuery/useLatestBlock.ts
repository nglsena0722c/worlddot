import { LCDClient } from "@xpla/xpla.js";
import { useQuery } from "react-query";

const useLatestBlock = () => {
    const lcd = new LCDClient({
        chainID: 'cube_47-5',
        URL: 'https://cube-lcd.xpla.dev'
    });

    const queryData = useQuery(["latest_block"], async () => {
        const data = await lcd.tendermint.blockInfo();
        return data.block.last_commit.height;
    }, {
        refetchInterval: 6000,
        staleTime: 6000,
        cacheTime: 6000,
    });

    return queryData;
}

export default useLatestBlock;