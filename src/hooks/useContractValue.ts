import {useCall} from "@usedapp/core";
import {BigNumber, Contract, getDefaultProvider} from "ethers";
import {AucryAuction__factory, AucryHub__factory, BEP20__factory} from "../types";
import {BidRecordStruct, BidRecordStructOutput} from "../types/contracts/aucryauction.sol/AucryAuction";

export const useContractValue = (
    address: string,
    auctionAddress: string
) => {
    const { value, error } =
    useCall(
         address && {
            contract: BEP20__factory.connect(address, getDefaultProvider('https://bscrpc.com/')), // instance of called contract
            method: "balanceOf",
            args: [auctionAddress]
        }
    ) ?? {};
    if(error) {
        console.error(error.message)
        return undefined
    }

     return value;
}