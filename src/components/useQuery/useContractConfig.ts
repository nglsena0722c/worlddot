import { LCDClient } from "@xpla/xpla.js";
import { useQuery } from "react-query";

export interface Config {
    owner: string,
    description: string,
    dotcount : number,
    lock_block_height: number,
}

const useContractConfig = (contractAddress : string) => {
    const lcd = new LCDClient({
        chainID: 'cube_47-5',
        URL: 'https://cube-lcd.xpla.dev'
      });

    const queryData = useQuery("get_contract_config", async () => {
        const data = await lcd.wasm.contractQuery<Config>(contractAddress, {
            config : {}
        });
        return data;
    }, {
        staleTime: Infinity,
        cacheTime: Infinity,
    });

    return queryData;
}

export default useContractConfig;