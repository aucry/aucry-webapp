import {useCall} from "@usedapp/core";
import {BigNumber, Contract, getDefaultProvider} from "ethers";
import {AucryAuction__factory, AucryHub__factory} from "../types";
import {BidRecordStruct, BidRecordStructOutput} from "../types/contracts/aucryauction.sol/AucryAuction";

export const useContractAuctionDetails = (
    address: string
) => {
    const { value, error } =
    useCall(
         address && {
            contract: AucryAuction__factory.connect(address, getDefaultProvider('http://127.0.0.1:8545/')), // instance of called contract
            method: "getAuctionState",
            args: []
        }
    ) ?? {};
    if(error) {
        console.error(error.message)
        return undefined
    }

     return value;
}