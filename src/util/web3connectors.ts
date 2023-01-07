import {ChainId, Config} from "@usedapp/core";
import {multiCallContractAddress} from "../config";

const web3connectors: Config = {
    readOnlyChainId: ChainId.BSC,
    readOnlyUrls: {
        [ChainId.Hardhat]: 'http://127.0.0.1:8545/',
        [ChainId.BSC]: 'https://bscrpc.com/',
    },
    multicallAddresses: {
        31337: multiCallContractAddress,
        56: multiCallContractAddress
    },
}

export default web3connectors;