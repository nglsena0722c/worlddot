import { LCDClient } from "@xpla/xpla.js";
import { useQuery } from "react-query";

const useUserDots = (contractAddress : string, userAddress : string) => {
    const lcd = new LCDClient({
        chainID: 'cube_47-5',
        URL: 'https://cube-lcd.xpla.dev'
      });

    const queryData = useQuery(["user_lock_data"], async () => {
        const data = await lcd.wasm.contractQuery<{
            x: number,
            y: number,
            lock: {
                denom : string,
                amount : string
            } |  null,
            dot_owner: string,
            color: string,
            unlocked : boolean
        }[]>(contractAddress, {
            user_dots : {
                user : userAddress
            }
        });
        return data;
    }, {
        staleTime: Infinity,
        cacheTime: Infinity,
    });

    return queryData;
}

export default useUserDots;