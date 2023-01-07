import {useCall} from "@usedapp/core";
import {Contract, getDefaultProvider} from "ethers";
import {AucryHub__factory} from "../types";
import {hubContractAddress} from "../config";
import {StaticJsonRpcProvider} from "@ethersproject/providers";

export const useContractEndedAuctionList = (
    address: string
) => {
    const { value, error } =
    useCall(
        address && {
            contract: AucryHub__factory.connect(hubContractAddress, new StaticJsonRpcProvider('http://127.0.0.1:8545/')), // instance of called contract
            method: "activeAucrysForCurrency",
            args: [address],
        }
    ) ?? {};
    if(error) {
        console.error(error.message)
        return undefined
    }
    return value;
}