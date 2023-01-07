import {BigNumber} from "ethers";
import {UserProfileStruct} from "../types/contracts/Chainidentity";
import {
  AucryAuctionConfigStructOutput, BidRecordStructOutput,
  UserProfileStructOutput
} from "../types/contracts/aucryauction.sol/AucryAuction";

export interface EndedAuction {
  config: AucryAuctionConfigStructOutput;
  latestTS: BigNumber;
  highBidder: UserProfileStructOutput;
  highBidValue: BigNumber;
  bids: BidRecordStructOutput[];
  endTime: BigNumber;
  auctionAddress: string;
}
