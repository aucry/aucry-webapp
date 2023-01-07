import Binance from 'binance-api-node';
import {useEffect, useState} from "react";

export const useBNBUSDPrice = () => {

    const [usdPrice, setUsdPrice] = useState(0);

    async function callBinance() {
        const client = Binance();
        let value = await client.prices({symbol:"BNBUSDT"});
        setUsdPrice(parseFloat(value.BNBUSDT));
    }

    useEffect(() => {
        callBinance();
    }, []);

    if (usdPrice > 0) {
        return usdPrice;
    } else {
        return false;
    }


}