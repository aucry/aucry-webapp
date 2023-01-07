import {
    Box, Button,
    Card,
    CardHeader, FormControl,
    FormControlLabel,
    Grid,
    InputAdornment,
    InputLabel, Select,
    Switch,
    TextField
} from "@mui/material";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {useTranslation} from "react-i18next";
import {useState} from "react";
import {AucryAuctionConfigStruct} from "../../../types/contracts/aucryhub.sol/AucryHub";
import {useContractFunction, useEthers} from "@usedapp/core";
import {AucryHub__factory} from "../../../types";
import {hubContractAddress} from "../../../config";


export default function CreateStep4({updateFormField, formData}){
    const { t }: { t: any } = useTranslation();
    const [ criticalModeActive, setCriticalModeActive ] = useState(false);
    const { account, library } = useEthers();
    const { state: createState, send: sendCreateRequest } = useContractFunction(AucryHub__factory.connect(hubContractAddress, library.getSigner()), 'newAucry');
    const { status: createStatus } = createState


    const criticalSwitchHandler = (event) => {
        setCriticalModeActive(event.target.checked);
    };


    const createAucry = () => {
        const config: AucryAuctionConfigStruct = {
            aucryCurrencyAddress: formData['step1.currency'],
            auctionName: formData['step1.name'],
            hasCriticalMode: false,
            battleRoyaleMode: false,
            creatorAddress: account,
            creatorFeePercentage: 0,
            criticalModeBidsResetTimer: true,
            criticalThresholdSeconds: 300,
            earliestEndTimestamp: Date.now()+3600000,
            extendSeconds: 0,
            minimumStep: "27000000",
            reserve: 0,
            startTimestamp: Date.now(),
            startingBid: "27000000"
        }
        void sendCreateRequest(config, "27000000").catch(reason => {
            console.log(reason);
        });
    }

    return (
        <Card>
            <CardHeader title={t('Confirm Details & Create')} sx={{
                pl: 2,
                pr: 2,
                background: 'rgb(0,1,27,50%)'
            }}></CardHeader>
            <Grid container spacing={3} sx={{ pt: 1, pl: 3, pr: 3, pb: 3 }}>
                <Grid item xs={12}>
                    <Box>
                        <Grid container>
                            <Grid item xs={12} md={12} pt={1.5}>
                                Confirm details below


                                <Button onClick={() => createAucry()} variant={"outlined"}>
                                    {createStatus === "None" ? "Create Auction" : createStatus}
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Card>
    );
}