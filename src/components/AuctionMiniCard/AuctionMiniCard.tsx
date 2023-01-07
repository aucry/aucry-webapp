import {
    alpha, Avatar,
    Box,
    Button,
    Card, Divider, Grid, LinearProgress, linearProgressClasses,
    Link,
    List,
    ListItem,
    ListItemText, Stack,
    styled,
    Typography,
    useTheme
} from "@mui/material";
import Countdown from "react-countdown";
import Text from 'src/components/Text';
import {useTranslation} from "react-i18next";
import {useCall, useCalls, useContractFunction, useEthers, useToken} from "@usedapp/core";
import {AucryHub__factory} from "../../types/factories/contracts/aucryhub.sol/AucryHub__factory";
import {defaultRpc, hubContractAddress} from "../../config";
import {BigNumber, utils} from "ethers";
import CountdownClock from "../../atoms/CountdownClock";
import {Block, Check} from "@mui/icons-material";
import {AucryAuction, AucryAuction__factory, AucryHub} from "../../types";
import MiniCountdownClock from "../../atoms/MiniCountdownClock";
import {Link as RouterLink} from "react-router-dom";
import {useBNBUSDPrice} from "../../hooks/useBNBUSDPrice";
import {useContractValue} from "../../hooks/useContractValue";
import FiatValue from "../FiatValue/FiatValue";

const DotLegend = styled('span')(
    ({ theme }) => `
    border-radius: 22px;
    width: ${theme.spacing(1.38)};
    height: ${theme.spacing(1.4)};
    display: inline-block;
    border: ${theme.colors.alpha.white[100]} solid 2px;
`
);

const AuctionMiniCard = ({ auction, auctionCurrency }) => {
    const {t}: { t: any } = useTranslation();
    const theme = useTheme();
    const ethers = useEthers();
    const usdPrice = useBNBUSDPrice();
    const currencyDetails = useToken(auctionCurrency);

    const auctionState = useCall(
        auction && {
            contract: AucryAuction__factory.connect(auction, defaultRpc) as AucryAuction,
            method: 'getAuctionState',
            args: []
        });

    const contractValue = useContractValue(auctionCurrency, auction);
    const nextBidAmount = auctionState && auctionState.value.config.minimumStep.add(auctionState.value.highBidValue);
    const highBidderAvatar = auctionState && auctionState.value.highBidder.avatarPart1 ? "url(" + "https://images.unsplash.com/photo-" + auctionState.value.highBidder.avatarPart1 + "-" + auctionState.value.highBidder.avatarPart2 + "?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&q=80" + ")" : "url(/static/images/avatars/1.jpg)";

    return (auctionState ? <>
        <Box mb={2} display="flex" alignItems="center">
            <Box
                sx={{
                    width: '100%'
                }}
            >
                <Box sx={{
                    height: "250px",
                    position:"absolute",
                    background: `${highBidderAvatar}`,
                    opacity: "0.25",
                    backgroundSize: "cover",
                    width: "101%",
                    left: "-2px",
                    top: "50px",
                    filter: "blur(20px)",
                    transform: "translate3d(0, 0, 0)",
                    overflow: "hidden"
                }}>
                </Box>
                <Box
                    display="flex"
                    alignItems="center"
                    flex={1}
                    sx={{
                        width: '105%',
                        marginLeft: '-9px',
                        paddingLeft: '12px',
                        paddingBottom: '5px',
                        marginBottom: '10px',
                        background: 'rgba(0,0,0,0.2)',
                        borderBottom: '1px solid #222',
                        marginRight: '-12px'
                    }}
                >
                    <Typography variant="body2" sx={{
                        textAlign: 'left',
                        color: '#fff',
                        padding: "6px",
                        paddingBottom: "2px",
                        paddingLeft:"0px"
                    }}>{auctionState.value.config.auctionName}</Typography>
                </Box>


                <Typography variant="h4" sx={{
                    textAlign: 'center',
                    color: '#fff',
                    p: 0
                }}>
                    {contractValue &&
                        <>
                            Prize: <FiatValue fiatCurrency={"USD"} currencyAddress={auctionCurrency}
                                   wethAmount={(parseFloat(contractValue.toString()) / 10**currencyDetails.decimals)} styled={false} currencyDetails={currencyDetails}/>
                        </>
                    }
                </Typography>

                {contractValue &&
                    <Typography variant="subtitle2" sx={{fontSize: `${theme.typography.pxToRem(11)}`}}>
                        {contractValue && (parseFloat(contractValue.toString()) / 10**currencyDetails.decimals)} {currencyDetails.symbol} </Typography>
                }
                <Box
                    display="flex"
                    alignItems="center"
                    flex={1}
                    sx={{
                        width: '100%'
                    }}
                >
                    <Card
                                            elevation={0}
                                            sx={{
                                            mt: 1,
                                            mb: 1.5,
                                            width: "100%",
                                            background: `${alpha(theme.colors.alpha.black[100], 0.05)}`
                                        }}
                                            >
                        <Typography variant="h6" sx={{textAlign: "left", paddingLeft: "10px", paddingTop: "6px", paddingBottom:"4px", fontWeight: "bold", fontSize: `${theme.typography.pxToRem(11)}`}}>
                            Top Bid:
                        </Typography>
                                    <List dense sx={{paddingTop:0, paddingBottom:"5px"}}>
                            <ListItem sx={{ paddingLeft: "2px"}}>
                                <Box display="flex" alignItems="center">
                                    <Avatar
                                        sx={{
                                            width: 35,
                                            height: 35,
                                            marginTop: "-3px",
                                            boxShadow: `0 .113rem .5rem ${theme.colors.alpha.black[10]}, 0 .126rem .225rem ${theme.colors.alpha.black[30]}`
                                        }}
                                        src={auctionState.value.highBidder.avatarPart1 ? "https://images.unsplash.com/photo-" + auctionState.value.highBidder.avatarPart1 + "-" + auctionState.value.highBidder.avatarPart2 + "?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&q=80" : "/static/images/avatars/1.jpg"}
                                    />
                                    <Box ml={1.5}>
                                        <Typography variant="h6" sx={{fontSize: `${theme.typography.pxToRem(11)}`}}>
                                           {auctionState.value.highBidder.userName !== "" ?
                                               <RouterLink to={{pathname: "/users/" + auctionState.value.highBidder.userAddress}}>
                                                   {auctionState.value.highBidder.userName}
                                               </RouterLink> : t("No bids yet")}
                                        </Typography>
                                        <Typography variant="subtitle2" sx={{fontSize: `${theme.typography.pxToRem(11)}`}}>
                                            Bid: {(parseFloat(auctionState.value.highBidValue.toString()) / 10**currencyDetails.decimals)} {currencyDetails.symbol}
                                        </Typography>
                                    </Box>
                                </Box>
                            </ListItem>
                    </List>
                    </Card>
                </Box>

                <Box>
                    <Grid container sx={{ paddingLeft: "10px", paddingRight: "10px"}}>
                        <Grid xs={8} item>
                            <Box sx={{ paddingTop: "5px" }}>
                            <Typography variant="h5" sx={{
                                textAlign: 'left',
                                color: '#fff',
                                fontSize: `${theme.typography.pxToRem(13)}`,
                                p: 0
                            }}>
                                {contractValue &&
                                    <>
                                        Next Bid: <FiatValue fiatCurrency={"USD"} currencyAddress={auctionCurrency}
                                                          wethAmount={(parseFloat(nextBidAmount.toString()) / 10**currencyDetails.decimals)} styled={false} currencyDetails={currencyDetails}/>
                                    </>
                                }
                            </Typography>

                            {contractValue &&
                                <Typography variant="subtitle2" sx={{textAlign: "left", fontSize: `${theme.typography.pxToRem(11)}`}}>
                                    {contractValue && (parseFloat(nextBidAmount.toString()) / 10**currencyDetails.decimals)} {currencyDetails.symbol} </Typography>
                            }
                            </Box>
                        </Grid>
                        <Grid xs={4} item alignItems={"right"}>
                            <Button
                                component={RouterLink} to={{
                                pathname: "/auctions/" + auctionState.value.config.aucryCurrencyAddress + "/" + auctionState.value.auctionAddress
                            }}
                                fullWidth
                                variant="text"
                                color="success"
                                sx={{
                                    backgroundColor: `${theme.colors.success.lighter}`,
                                    textTransform: 'uppercase',
                                    py: 1.5,
                                    p: "8px",
                                    '&:hover': {
                                        backgroundColor: `${theme.colors.success.main}`,
                                        color: `${theme.palette.getContrastText(theme.colors.success.dark)}`
                                    }
                                }}
                            >
                                {t('View >')}
                            </Button>
                        </Grid>
                    </Grid>
                </Box>

                <Box
                    display="flex"
                    alignItems="center"
                    flex={1}
                    sx={{
                        width: '100%'
                    }}
                >
                    <Countdown
                        date={(auctionState.value.endTime.toNumber()) * 1000}
                        intervalDelay={0}
                        precision={3}
                        zeroPadTime={2}
                        className={"miniCountdownClock"}
                        renderer={props => <MiniCountdownClock auction={auctionState.value} props={props} />}
                    />
                </Box>

            </Box></Box></> : <Card>Loading...</Card>);
}

export default AuctionMiniCard;