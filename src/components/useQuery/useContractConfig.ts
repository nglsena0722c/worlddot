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
        // console.log(`┌ GET ${lcd}/cosmos/tx/v1beta1/txs`)
        const data = await lcd.wasm.contractQuery<Config>(contractAddress, {
            config : {}
        });
        // console.log(`└ GET ${lcd}/cosmos/tx/v1beta1/txs`, data)
        return data;
    }, {
        staleTime: Infinity,
        cacheTime: Infinity,
    });

    return queryData;
}

export default useContractConfig;