import { LCDClient } from "@xpla/xpla.js";
import { useQuery } from "react-query";

const useBalance = (userAddress : string) => {
    const lcd = new LCDClient({
        chainID: 'cube_47-5',
        URL: 'https://cube-lcd.xpla.dev'
      });

    const queryData = useQuery(["get_user_balance", userAddress], async () => {
        const data = await lcd.bank.balance(userAddress).then(([coins]) => {
            return coins.toString()
        })
        return data;
    }, {
        staleTime: Infinity,
        cacheTime: Infinity,
    });

    return queryData;
}

export default useBalance;