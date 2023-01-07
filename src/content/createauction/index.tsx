import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import {Box, Drawer, Grid, useTheme, IconButton, styled, Button} from '@mui/material';
import HorizontalLinearStepper from "./StepperTest";
import {useCall, useContractFunction, useEthers} from "@usedapp/core";
import {BigNumber, Contract, utils} from "ethers";
import {IBEP20Interface} from "../../types/contracts/includes/IBEP20";
import {AucryHub__factory, Chainidentity__factory, IBEP20__factory} from "../../types";
import {hexZeroPad} from "ethers/lib/utils";
import {AucryAuctionConfigStruct} from "../../types/contracts/aucryhub.sol/AucryHub";
import {chainIdentityAddress, defaultRpc, hubContractAddress} from "../../config";
import Sidebar from "./Sidebar";
import {BigNumberish} from "ethers/lib/ethers";

const DrawerWrapper = styled(Drawer)(
  ({ theme }) => `
    width: 400px;
    flex-shrink: 0;
    z-index: 3;

    & > .MuiPaper-root {
        width: 400px;
        height: calc(100% - ${theme.header.height});
        position: absolute;
        top: ${theme.header.height};
        right: 0;
        z-index: 3;
        background: ${theme.colors.alpha.white[10]};
    }
`
);

const DrawerWrapperMobile = styled(Drawer)(
  ({ theme }) => `
    width: 360px;
    flex-shrink: 0;

  & > .MuiPaper-root {
        width: 360px;
        z-index: 3;
        background: ${theme.colors.alpha.white[30]};
  }
`
);

const MainContentWrapper = styled(Box)(
  () => `
  flex-grow: 1;
`
);

const IconButtonToggle = styled(IconButton)(
  ({ theme }) => `
  width: ${theme.spacing(6)};
  height: ${theme.spacing(6)};
`
);

function CreateAuction() {
  const theme = useTheme();

  const [mobileOpen, setMobileOpen] = useState(false);
  const { account, activate, deactivate } = useEthers()
  const [ isApproved, setApproved ] = useState(false);
  const ethers = useEthers();

  const tokenAddress = "0xbA2aE424d960c26247Dd6c32edC70B295c744C43";

  const [ formData, setFormData ] = useState( {
      currency: "",
      aucryCurrencyAddress: tokenAddress,
      auctionName: "",
      hasCriticalMode: false,
      battleRoyaleMode: false,
      initialValue: '',
      creatorAddress: ethers.account,
      creatorFeePercentage: 0,
      criticalModeBidsResetTimer: true,
      criticalThresholdSeconds: 300,
      earliestEndTimestamp: Math.round((Date.now() / 1000) + 3600),
      extendSeconds: 0,
      minimumStep: "",
      reserve: 0,
      startTimestamp: Math.round(Date.now() / 1000),
      startingBid: ""
  });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const updateFormData = (value) => {
      let newFormData = JSON.parse(JSON.stringify(value));
      setFormData(newFormData);
      console.log(newFormData);
  }

    const { state: approvalState, send: sendApprovalRequest } = useContractFunction(IBEP20__factory.connect(tokenAddress, ethers.library.getSigner()), 'approve');
    const { status: approvalStatus } = approvalState
    const { state: createState, send: sendCreateRequest } = useContractFunction(AucryHub__factory.connect(hubContractAddress, ethers.library.getSigner()), 'newAucry');
    const { status: createStatus } = createState
    const { state: usernameState, send: setUsername } = useContractFunction(Chainidentity__factory.connect(chainIdentityAddress, ethers.library.getSigner()), 'setUserProfileData');
    const { status: usernameStatus } = usernameState

    const approveTransfer = () => {
        IBEP20__factory.connect(formData.currency['address'], ethers.library.getSigner()).approve(hubContractAddress, "250000000000000000000000");
//        void sendApprovalRequest(hubContractAddress, "250000000000000000000000");
    }
    const createAucry = () => {
        const config: AucryAuctionConfigStruct = {
            aucryCurrencyAddress: formData.currency['address'],
            auctionName: formData.auctionName,
            hasCriticalMode: false,
            battleRoyaleMode: false,
            creatorAddress: ethers.account,
            creatorFeePercentage: parseInt(formData.creatorFeePercentage.toString()),
            criticalModeBidsResetTimer: true,
            criticalThresholdSeconds: 300,
            earliestEndTimestamp: Math.round((Date.now() / 1000) + 3600),
            extendSeconds: 0,
            minimumStep: (parseFloat(formData.minimumStep) * (10 ** formData.currency['decimals'])),
            reserve: 0,
            startTimestamp: Math.round(Date.now() / 1000),
            startingBid: (parseFloat(formData.startingBid) * (10 ** formData.currency['decimals']))
        };

        // Turn values into wei
        void sendCreateRequest(config, (parseFloat(formData.initialValue) * 10 ** formData.currency['decimals'])).catch(reason => {
            console.log(reason);
        }).then(() => console.log(createState));
    }

  return (
    <>
      <Helmet>
        <title>Create Product - Commerce Management</title>
      </Helmet>
      <Box mb={3} display="flex">
        <MainContentWrapper>
          <Grid
            sx={{
              pl: 8,
              pt: 8
            }}
            container
            xs={12} md={12}
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            spacing={4}
          >
                <PageHeader />
            <Grid container pt={2}>
              <Grid item  xs={12} md={8}>
                <HorizontalLinearStepper setFormData={updateFormData} formData={formData} />
              </Grid>
              <Grid item  xs={0} md={4}>
                  <Sidebar setFormData={updateFormData} formData={formData} launchFunction={createAucry}/>
              </Grid>
            </Grid>

              <Box>

                  <Button onClick={() => approveTransfer()}>
                      {approvalStatus === "None" ? "Approve Access" : approvalStatus}
                  </Button>

                  <Button onClick={() => createAucry()}>
                      {createStatus === "None" ? "Create Auction" : createStatus}
                  </Button>

              </Box>
          </Grid>
        </MainContentWrapper>
      </Box>
    </>
  );
}

export default CreateAuction;
