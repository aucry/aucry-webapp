import {useEffect, useState} from "react";

const cache = [];
const url = 'https://raw.githubusercontent.com/pancakeswap/pancake-toolkit/master/packages/token-lists/lists/cmc.json';

export interface CMCTokenData {
    name?: string;
    symbol: string;
    address?: string;
    decimals?: number;
    logoURI?: string;
}

const useCmcTokens = (): CMCTokenData[] => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (cache[url]) {
                const data = cache[url];
                setData(data);
            } else {
                const response = await fetch(url);
                const data = await response.json();
                cache[url] = data.tokens; // set response in cache;
                setData(data);
            }
        };

        fetchData();
    });

    return data;
};

export default useCmcTokens;