import {
    alpha, Avatar,
    Box,
    Button,
    Card, Divider, LinearProgress, linearProgressClasses,
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
import {useCall, useContractFunction, useEthers, useToken} from "@usedapp/core";
import {AucryHub__factory} from "../../types/factories/contracts/aucryhub.sol/AucryHub__factory";
import {defaultRpc, hubContractAddress} from "../../config";
import {BigNumber, utils} from "ethers";
import CountdownClock from "../../atoms/CountdownClock";
import {Block, Check} from "@mui/icons-material";
import {useParams} from "react-router-dom";

const DotLegend = styled('span')(
    ({ theme }) => `
    border-radius: 22px;
    width: ${theme.spacing(1.38)};
    height: ${theme.spacing(1.4)};
    display: inline-block;
    border: ${theme.colors.alpha.white[100]} solid 2px;
`
);

const AuctionDetailCard = ({ auction }) => {
    const {t}: { t: any } = useTranslation();
    const theme = useTheme();
    const ethers = useEthers();
    const { auctionCurrency, auctionAddress } = useParams();
    const currencyDetails = useToken(auctionCurrency);
    const { state: placebidState, send: placeBid } = useContractFunction(AucryHub__factory.connect(hubContractAddress, ethers.library.getSigner()), 'placeBid');
    const { status: placeBidStatus } = placebidState;

    const nextBidAmount = auction.config.minimumStep.add(auction.highBidValue);

    const callPlaceBid = () => {
        void placeBid(auction.auctionAddress, nextBidAmount).catch(reason => {
            console.log(reason);
        });
    }

    return (<Card
        sx={{
            position: 'relative',
            p: 3,
            paddingTop: 0,
            height: '500px'
        }}
    >
        <Box mb={2} display="flex" alignItems="center">
            <Box
                sx={{
                    width: '100%'
                }}
            >
                <Box
                    display="flex"
                    alignItems="center"
                    flex={1}
                    sx={{
                        width: '100%'
                    }}
                >
                    <Countdown
                        date={(parseInt(auction.endTime)) * 1000}
                        intervalDelay={0}
                        precision={0}
                        zeroPadTime={2}
                        renderer={props => <CountdownClock auction={auction} props={props} />}
                    />
                </Box>

                <Box>

                    <Card
                        elevation={0}
                        sx={{
                            mt: 3,
                            mb: 1,
                            p: 3,
                            pt: 1.3,
                            pb: 1.5,
                            background: `${alpha(theme.colors.alpha.black[100], 0.05)}`
                        }}
                    >
                    </Card>
                </Box>
            </Box>
        </Box>
        <Card
            elevation={0}
            sx={{
                mt: 1,
                mb: 3,
                background: `${alpha(theme.colors.alpha.black[100], 0.05)}`
            }}
        >
            <List dense>
                <ListItem>
                    <ListItemText
                        primaryTypographyProps={{
                            variant: 'h5'
                        }}
                        primary={t('Top Bid') + ':'}
                    />

                    <Box
                        mt={0}
                        display="flex"
                        justifyContent="flex-end"
                        alignItems="flex-start"
                    >
                        <Typography
                            sx={{
                                fontSize: `${theme.typography.pxToRem(12)}`,
                                lineHeight: 1
                            }}
                            variant="body1"
                        >
                            {auction.highBidder.userAddress === ethers.account ?
                                <>
                                    <DotLegend
                                        style={{
                                            background: `${theme.colors.success.main}`
                                        }}
                                    />
                                    <Text color="success">{t('You')}</Text>
                                </>
                                :
                                <>
                                    <DotLegend
                                        style={{
                                            background: `${theme.colors.error.main}`
                                        }}
                                    />
                                    <Text color="error">{t('Not You')}</Text>
                                </>
                            }
                        </Typography>
                    </Box>
                </ListItem>
                <ListItem>
                    <Box display="flex" alignItems="center">
                        <Avatar
                            sx={{
                                width: 50,
                                height: 50,
                                boxShadow: `0 .113rem .5rem ${theme.colors.alpha.black[10]}, 0 .126rem .225rem ${theme.colors.alpha.black[30]}`
                            }}
                            src="/static/images/avatars/1.jpg"
                        />
                        <Box ml={1.5}>
                            <Typography variant="h6">
                                {auction.highBidder.userName !== "" ? auction.highBidder.userName : t("No bids yet")}
                            </Typography>
                            <Typography variant="subtitle2">
                                Bid: {(parseFloat(auction.highBidValue.toString()) / 10**currencyDetails.decimals)} {currencyDetails.symbol}
                            </Typography>
                        </Box>
                    </Box>
                </ListItem>
            </List>
        </Card>
            <Box>
                <Button
                    fullWidth
                    variant="text"
                    color="success"
                    onClick={() => callPlaceBid()}
                    sx={{
                        backgroundColor: `${theme.colors.success.lighter}`,
                        textTransform: 'uppercase',
                        py: 1.5,
                        '&:hover': {
                            backgroundColor: `${theme.colors.success.main}`,
                            color: `${theme.palette.getContrastText(theme.colors.error.dark)}`
                        }
                    }}
                >
                    Place Bid
                </Button>
            </Box>
    </Card>);
}

export default AuctionDetailCard;