import { Coin, LCDClient } from "@xpla/xpla.js";
import { useQuery } from "react-query";

const useLatestDots = (contractAddress: string) => {
    const lcd = new LCDClient({
        chainID: 'cube_47-5',
        URL: 'https://cube-lcd.xpla.dev'
    });

    const queryData = useQuery(["lastest_dot"], async () => {
        const data = await lcd.wasm.contractQuery < 
            [number, {
                x: number,
                y: number,
                lock: {
                    denom : string,
                    amount : string
                } |  null,
                dot_owner: string,
                color: string,
            }][] > (contractAddress, {
                latest_dots: {

                }
            });
        return data;
    }, {
        refetchInterval: 6000,
        staleTime: 6000,
        cacheTime: 6000,
    });

    return queryData;
}

export default useLatestDots;