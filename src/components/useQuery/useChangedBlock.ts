import { LCDClient } from "@xpla/xpla.js";
import { useQuery } from "react-query";

// export interface AllDots {
//     block_
// }

interface Dots {
    x: number,
    y: number,
    color: String,
    dot_owner: String,
    lock: {
        denom : string,
        amount : string
    }| undefined,
}

const useChangedBlock = (contractAddress : string) => {
    const lcd = new LCDClient({
        chainID: 'cube_47-5',
        URL: 'https://cube-lcd.xpla.dev'
      });

    const queryData = useQuery(["latestBlock"], async () => {
        const data = await lcd.wasm.contractQuery<number[]>(contractAddress, {
            changed_block : {}
        });
        return data;
    }, {
        refetchInterval : 6000
        // staleTime: 6000,
        // cacheTime: 6000,
    });

    return queryData;
}

export default useChangedBlock;