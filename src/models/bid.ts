import {BigNumber} from "ethers";
import {UserProfileStruct} from "../types/contracts/Chainidentity";

export interface Bid {
  userProfile: UserProfileStruct;
  bidAmount: BigNumber;
  bidTimestamp: BigNumber;
}
