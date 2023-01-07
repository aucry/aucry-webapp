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
    Typography
} from '@mui/material';

import WhatshotTwoToneIcon from "@mui/icons-material/WhatshotTwoTone";
import {useTranslation} from "react-i18next";
import {useParams} from "react-router-dom";
import {useCallback, useState} from "react";
import {Project} from "../../models/project";
import axios from "../../utils/axios";
import useRefMounted from "../../hooks/useRefMounted";
import Chart from "react-apexcharts";
import {ApexOptions} from "apexcharts";
import AuctionDetailCard from "../../components/AuctionDetailCard/AuctionDetailCard";
import {useContractAuctionDetails} from "../../hooks/useContractAuctionDetails";
import BidHistory from "../../components/BidHistory/BidHistory";
import {useContractValue} from "../../hooks/useContractValue";
import {utils} from "ethers";
import {useBNBUSDPrice} from "../../hooks/useBNBUSDPrice";
import FiatValue from "../../components/FiatValue/FiatValue";
import { Channel, MessageList, MessageInput } from 'stream-chat-react';
import {ChannelData, DefaultGenerics, StreamChat} from 'stream-chat';
import { Chat } from 'stream-chat-react';
import {useCall, useEthers, useToken} from "@usedapp/core";
import {Chainidentity__factory} from "../../types";
import {chainIdentityAddress, defaultRpc} from "../../config";

import '@stream-io/stream-chat-css/dist/css/index.css';
import {Check} from "@mui/icons-material";
import useCmcTokens from 'src/hooks/useCmcTokens';

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
const chatClient = new StreamChat('56p72cqtzxm7');

function AuctionListView() {
    const { t }: { t: any } = useTranslation();
    const theme = useTheme();

    const chartOptions: ApexOptions = {
        chart: {
            background: 'transparent',
            sparkline: {
                enabled: false
            }
        },
        stroke: {
            curve: 'stepline',
            width: [3, 3]
        },
        theme: {
            mode: theme.palette.mode
        },
        markers: {
            size: 0
        },
        colors: [theme.colors.primary.main, theme.colors.error.main],
        dataLabels: {
            enabled: false
        },
        annotations: {
            points: []
        },
        tooltip: {
            enabled: true,
            x: {
                format: 'HH:mm:ss'
            }
        },
        grid: {
            strokeDashArray: 5,
            borderColor: theme.palette.divider,
            padding: {
                right: 8,
                left: 8,
                bottom: 5,
                top: 5
            }
        },
        xaxis: {
            type: 'datetime',
            labels: {
                show: true
            },
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: true
            }
        },
        yaxis: {
            show: false
        }
    };


    const isMountedRef = useRefMounted();
    const { auctionCurrency, auctionAddress } = useParams();
    const details = useContractAuctionDetails(auctionAddress);
    const currencyDetails = useToken(auctionCurrency);
    const contractValue = useContractValue(auctionCurrency, auctionAddress);
    const [projects, setProjects] = useState<Project[]>([]);
    const [channel, setChannel] = useState(null);
    const usdPrice = useBNBUSDPrice();
    const { account } = useEthers();
    const cmcData = useCmcTokens();
    const tokenData = cmcData.length > 0 ? cmcData.filter((token) => token.address === auctionCurrency)[0] : false;  //todo make null safe

    const userProfile = useCall(
        account && {
            contract: Chainidentity__factory.connect(chainIdentityAddress, defaultRpc), // instance of called contract
            method: "getUserProfileData",
            args: [account],
        });

    let chartData = [];

    if(details) {
        let bidData = [];
        details.bids.forEach(bid => {
            bidData.push([bid.bidTimestamp.toNumber() * 1000, parseFloat((parseFloat(bid.bidAmount.toString()) / 10**currencyDetails.decimals).toString())]);
            chartOptions.annotations.points.push({
                x: bid.bidTimestamp.toNumber() * 1000,
                y: parseFloat((parseFloat(bid.bidAmount.toString()) / 10**currencyDetails.decimals).toString()),
                marker: {
                    size: 8,
                    radius: 2,
                    cssClass: 'user-marker-' + bid.userProfile.userAddress
                },
                label: {
                    borderColor: '#351158',
                    offsetY: 0,
                    style: {
                        color: '#fff',
                        background: '#351158',
                    },

                    text: bid.userProfile.userName,
                }
            })
        });

        chartData = [{
            name: 'Top Bid',
            data: bidData
        }];
    }

    const getChannel = useCallback(async (userProfile) => {
        let channel = false;

        chatClient.connectUser(
            {
                id: 'john',
                name: 'John Doe',
                image: 'https://getstream.io/random_svg/?name=John',
            },
            chatClient.devToken('john'),
        ).then(() => {
            setChannel(chatClient.channel('livestream', auctionAddress));
        });
    }, [isMountedRef]);

    const getProjects = useCallback(async () => {
        try {
            const response = await axios.get<{ projects: Project[] }>(
                '/api/projects'
            );

            if (isMountedRef.current) {
                setProjects(response.data.projects);
            }
        } catch (err) {
            console.error(err);
        }
    }, [isMountedRef]);

    return (details ?
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
                            {tokenData &&
                            <img style={{ height: '100px', borderRadius:'25px' }} src={tokenData.logoURI} /> }
                        </AvatarPageTitle>
                        <Box>
                            <Typography variant="h3" component="h3" gutterBottom>
                                {details.config.auctionName}
                            </Typography>
                            <Typography variant="subtitle2">
                                {t('Auction Address:')}
                                <Link href={"https://bscscan.com/address/" + auctionAddress}
                                      target={"_blank"}>
                                    {auctionAddress}
                                </Link>
                            </Typography>
                        </Box>
                    </Box>

                    <Box display="flex" alignItems="right" sx={{
                        pr: 2
                    }}>
                        <Box>
                            <Typography variant="h3" component="h3" align={"right"} gutterBottom>
                                Prize: {contractValue && (parseFloat(contractValue.toString()) / 10**currencyDetails.decimals)} {currencyDetails.symbol}
                            </Typography>
                            {details && contractValue &&
                                <FiatValue fiatCurrency={"USD"} currencyAddress={auctionCurrency}
                                           wethAmount={(parseFloat(contractValue.toString()) / 10**currencyDetails.decimals)} styled={true} currencyDetails={currencyDetails} />
                            }
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
                    <Grid item xs={8}>
                        {details.config &&
                            <Chart
                                options={chartOptions}
                                series={chartData}
                                type="line"
                                height={500}
                            />
                        }
                    </Grid>

                <Grid item xs={4}>
                    <AuctionDetailCard auction={details} />
                </Grid>

                    <Grid item xs={12}>

                        <Typography variant="h3">{t('Auction Rules:')}</Typography>
                        <Grid container xs={12} spacing={1} pt={2}>
                            <Grid item xs={3}>
                                <Card sx={{p:3}}>
                                    <Typography variant="body2" sx={{
                                        textAlign: 'left',
                                        color: '#fff'
                                    }}>
                                        <Typography variant="h4" pb={1}>{t('Auction Mode')}</Typography>
                                        <Typography variant="h6">{t('Normal [?]')}</Typography>
                                    </Typography>
                                </Card>
                            </Grid>
                            <Grid item xs={3}>
                                <Card sx={{p:3}}>
                                    <Typography variant="body2" sx={{
                                        textAlign: 'left',
                                        color: '#fff'
                                    }}>
                                        <Typography variant="h4" pb={1}>{t('Bid Step')}</Typography>
                                        <Typography variant="h6">{t('0.002 BNB')}</Typography>
                                    </Typography>
                                </Card>
                            </Grid>
                            <Grid item xs={3}>
                                <Card sx={{p:3}}>
                                    <Typography variant="body2" sx={{
                                        textAlign: 'left',
                                        color: '#fff'
                                    }}>
                                        <Typography variant="h4" pb={1}>{t('Auction Creator')}</Typography>
                                        <Typography variant="h6">{t('Normal [?]')}</Typography>
                                    </Typography>
                                </Card>
                            </Grid>
                            <Grid item xs={3}>
                                <Card sx={{p:3}}>
                                    <Typography variant="body2" sx={{
                                        textAlign: 'left',
                                        color: '#fff'
                                    }}>
                                        <Typography variant="h4" pb={1}>{t('Bid Count')}</Typography>
                                        <Typography variant="h6">{t('27090')}</Typography>
                                    </Typography>
                                </Card>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid item xs={6}>
                            <Box
                                display="flex"
                                alignItems={{ xs: 'stretch', md: 'center' }}
                                flexDirection={{ xs: 'column', md: 'row' }}
                                justifyContent="space-between"
                                sx={{
                                    pb: 2
                                }}
                            >
                            <Typography variant="h3">{t('Bid History')}</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <BidHistory bids={details.bids}/>
                        </Grid>
                        <Grid item xs={6}>
                            <div id="commento"></div>
                        </Grid>
                    </Grid>
                </Grid>
            
            <Footer />
        </>
    : <></>);
}

export default AuctionListView;
