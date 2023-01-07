import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer';
import PageTitleWrapper from 'src/components/PageTitleWrapper';

import {
    alpha,
    Avatar,
    Box, Button,
    Card,
    Grid,
    IconButton,
    lighten, LinearProgress, linearProgressClasses,
    Link,
    List,
    ListItem, ListItemText,
    styled, useTheme,
    Typography, Skeleton
} from '@mui/material';

import WhatshotTwoToneIcon from "@mui/icons-material/WhatshotTwoTone";
import {useTranslation} from "react-i18next";
import Countdown from "react-countdown";
import AuctionCard from "../../components/AuctionCard/AuctionCard";
import EndedAuctions from "../../components/EndedAuctions/EndedAuctions";
import {useCallback, useEffect, useState} from "react";
import {Project} from "../../models/project";
import axios from "../../utils/axios";
import useRefMounted from "../../hooks/useRefMounted";
import {CallResult, useCall, useCalls, useContractFunction, useEthers} from "@usedapp/core";
import {AucryAuction, AucryAuction__factory, AucryHub, AucryHub__factory} from "../../types";
import {useContractAuctionList} from "../../hooks/useContractAuctionList";
import {useParams} from "react-router-dom";
import {defaultRpc, hubContractAddress} from "../../config";
import {AucryAuctionConfigStruct} from "../../types/contracts/aucryhub.sol/AucryHub";

const AvatarPageTitle = styled(Avatar)(
    ({ theme }) => `
      width: ${theme.spacing(8)};
      height: ${theme.spacing(8)};
      color: ${theme.colors.primary.main};
      margin-right: ${theme.spacing(2)};
      background: ${
        theme.palette.mode === 'dark'
            ? theme.colors.alpha.trueWhite[10]
            : theme.colors.alpha.white[50]
    };
      box-shadow: ${
        theme.palette.mode === 'dark'
            ? '0 1px 0 ' +
            alpha(lighten(theme.colors.primary.main, 0.8), 0.2) +
            ', 0px 2px 4px -3px rgba(0, 0, 0, 0.3), 0px 5px 16px -4px rgba(0, 0, 0, .5)'
            : '0px 2px 4px -3px ' +
            alpha(theme.colors.alpha.black[100], 0.4) +
            ', 0px 5px 16px -4px ' +
            alpha(theme.colors.alpha.black[100], 0.2)
    };
`
);

function AuctionListView() {
    const { t }: { t: any } = useTranslation();
    const theme = useTheme();
    const isMountedRef = useRefMounted();
    const { auctionCurrency, auctionAddress } = useParams();
    const addressBook = useCall(
        auctionCurrency && {
            contract: AucryHub__factory.connect(hubContractAddress, defaultRpc), // instance of called contract
            method: "activeAucrysForCurrency",
            args: [auctionCurrency],
        });

    const endedAddressBook = useCall(
        auctionCurrency && {
            contract: AucryHub__factory.connect(hubContractAddress, defaultRpc) as AucryHub, // instance of called contract
            method: "endedAucrysForCurrency",
            args: [auctionCurrency],
        });

    const results = useCalls(
        addressBook ? addressBook.value.addressBook.map((token: any) => ({
                contract: AucryAuction__factory.connect(token, defaultRpc) as AucryAuction,
                method: 'getAuctionState',
                args: [],
            }))
            : []
    )

    const endedResults = useCalls(
        endedAddressBook ? endedAddressBook.value.addressBook.map((token: any) => ({
                contract: AucryAuction__factory.connect(token, defaultRpc) as AucryAuction,
                method: 'getAuctionState',
                args: [],
            }))
            : []
    )


    const [projects, setProjects] = useState<Project[]>([]);

    return (
        <>
            <Helmet>
                <title>Wrapped BNB Auctions</title>
            </Helmet>
            <PageTitleWrapper>
                <Box
                    display="flex"
                    alignItems={{ xs: 'stretch', md: 'center' }}
                    flexDirection={{ xs: 'column', md: 'row' }}
                    justifyContent="space-between"
                >
                    <Box display="flex" alignItems="center">
                        <AvatarPageTitle variant="rounded">
                            <WhatshotTwoToneIcon fontSize="large" />
                        </AvatarPageTitle>
                        <Box>
                            <Typography variant="h3" component="h3" gutterBottom>
                                {t('Wrapped BNB Auctions')}
                            </Typography>
                            <Typography variant="subtitle2">
                                {t('')}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </PageTitleWrapper>

            <Grid
                sx={{
                    px: 4,
                }}
                container
                direction="row"
                justifyContent="center"
                alignItems="stretch"
                spacing={4}
            >
                    <Grid item xs={12}>
                    <Box
                        display="flex"
                        alignItems={{ xs: 'stretch', md: 'center' }}
                        flexDirection={{ xs: 'column', md: 'row' }}
                        justifyContent="space-between"
                    >
                    <Typography variant="h2" sx={{pb:3}}>{t('Active Auctions')}</Typography>
                    </Box>
                    <Grid container spacing={4}>
                        {!addressBook &&
                            <>
                            <Grid item xs={4} md={4}>
                                <Skeleton>
                                </Skeleton>
                            </Grid>
                            <Grid item xs={4} md={4}>
                                <Skeleton>
                                </Skeleton>
                            </Grid>
                            <Grid item xs={4} md={4}>
                                <Skeleton>
                                </Skeleton>
                            </Grid>
                            <Grid item xs={4} md={4}>
                                <Skeleton sx={{width:'100%'}}>
                                </Skeleton>
                            </Grid>
                            </>
                        }
                            {results && results.length > 0 && results[0] !== undefined ? results.map((item, pointer) => (
                                <Grid item xs={4} md={4}>
                                    <AuctionCard auctionAddress={addressBook.value[0][pointer]} auctionConfig={item.value[0]} latestTS={item.value[1]}
                                                 highBidder={item.value[2]} highBidValue={item.value[3]} bids={item.value[4]}
                                                 endtime={item.value[5]} />
                                </Grid>
                            )) : []}
                    </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid item xs={12}>
                            <Box
                                display="flex"
                                alignItems={{ xs: 'stretch', md: 'center' }}
                                flexDirection={{ xs: 'column', md: 'row' }}
                                justifyContent="space-between"
                                sx={{
                                    pb: 2
                                }}
                            >
                            <Typography variant="h2">{t('Ended Auctions')}</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            { endedResults && endedResults.length > 0 && results[0] !== undefined ?
                            <EndedAuctions endedAuctions={endedResults.map(item => item.value)}/>
                                : ""
                            }
                        </Grid>
                    </Grid>
                </Grid>
            <Footer />
        </>
    );
}

export default AuctionListView;
