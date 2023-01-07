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
import { Link as RouterLink } from "react-router-dom";
import Countdown from "react-countdown";
import Text from 'src/components/Text';
import {useTranslation} from "react-i18next";
import {useCall} from "@usedapp/core";
import {AucryAuction__factory, AucryHub__factory} from "../../types";
import {hubContractAddress} from "../../config";
import {AucryAuctionConfigStruct} from "../../types/contracts/aucryhub.sol/AucryHub"
import {Block} from "@mui/icons-material";

const LinearProgressSuccess = styled(LinearProgress)(
    ({ theme }) => `
        height: 8px;
        border-radius: ${theme.general.borderRadiusLg};

        &.${linearProgressClasses.colorPrimary} {
            background-color: ${alpha(theme.colors.success.main, 0.1)};
        }
        
        & .${linearProgressClasses.bar} {
            border-radius: ${theme.general.borderRadiusLg};
            background-color: #2f6c12;
        }
    `
);

function convertLocalDateToUTCIgnoringTimezone(date: Date) {
    return Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds(),
    );
}

const DotLegend = styled('span')(
    ({ theme }) => `
    border-radius: 22px;
    width: ${theme.spacing(1.38)};
    height: ${theme.spacing(1.4)};
    display: inline-block;
    border: ${theme.colors.alpha.white[100]} solid 2px;
`
);

const AuctionCard = ({auctionAddress, auctionConfig, latestTS, highBidder, highBidValue, bids, endtime}) => {
    auctionConfig = auctionConfig as AucryAuctionConfigStruct;
    const {t}: { t: any } = useTranslation();
    const theme = useTheme();
    return (<Card
        sx={{
            position: 'relative',
            p: 3
        }}
    >
        <Box mb={2} display="flex" alignItems="center">
            <Box
                sx={{
                    width: '100%'
                }}
            >
                <Link
                    component={RouterLink} to={{
                        pathname: "./" + auctionAddress
                    }}
                    color="text.primary"
                    underline="none"
                    sx={{
                        transition: `${theme.transitions.create(['color'])}`,
                        fontSize: `${theme.typography.pxToRem(17)}`,
                        '&:hover': {
                            color: `${theme.colors.primary.main}`
                        }
                    }}
                    variant="h4"
                >
                    {auctionConfig.auctionName}
                </Link>
                <Typography gutterBottom variant="subtitle2">
                    0 WBNB / $0
                </Typography>
                <Box
                    display="flex"
                    alignItems="center"
                    flex={1}
                    sx={{
                        width: '100%'
                    }}
                >
                    <Countdown
                        date={(new Date(parseInt(endtime['_hex'])).toUTCString())}
                        intervalDelay={0}
                        precision={3}
                        zeroPadTime={2}
                        renderer={props =>
                            <><LinearProgressSuccess
                                sx={{
                                    minWidth: 65,
                                    height: '50px',
                                    width: '117%',
                                    marginLeft: '-25px',
                                    marginRight: '-30px',
                                    borderRadius: '0px',
                                }}
                                variant="determinate"
                                value={(
                                    100 * (Math.max(0, (parseInt(endtime['_hex'])) - ((Date.now()))) / (parseInt(endtime['_hex']) - parseInt(auctionConfig.startTimestamp['_hex'])))
                                )}
                            />
                                <Box sx={{
                                    minWidth: '100%',
                                    position: 'absolute',
                                    color: '#000 !important',
                                    marginLeft: '-25px'
                                }}>
                                    <Typography variant="body2" sx={{
                                        textAlign: 'center',
                                        color: '#fff'
                                    }}>
                                        Ending
                                        in {props.days} days {props.hours}:{props.minutes}:{props.seconds}
                                    </Typography>
                                </Box>
                            </>}
                    />
                </Box>

                <Box>
                    <Typography variant="body2" sx={{
                        textAlign: 'left',
                        color: '#fff',
                        pt: 1
                    }}>
                        <small><b>Auction Settings:</b><br />
                        <Block /> No Critical Mode </small>
                    </Typography>
                </Box>
            </Box>
        </Box>
        <Card
            elevation={0}
            sx={{
                mt: 2,
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
                        <DotLegend
                            style={{
                                background: `${theme.colors.error.main}`
                            }}
                        />
                        <Typography
                            sx={{
                                fontSize: `${theme.typography.pxToRem(12)}`,
                                lineHeight: 1
                            }}
                            variant="body1"
                        >
                            <Text color="error">{t('Not You')}</Text>
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
                                {highBidder['_hex']}
                            </Typography>
                            <Typography variant="subtitle2">
                                Bid: {highBidValue['_hex']} WBNB
                            </Typography>
                        </Box>
                    </Box>
                </ListItem>
            </List>
        </Card>
        <Stack
            direction="row"
            justifyContent="space-evenly"
            alignItems="stretch"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={0}
        >
            <Box>
        <Button
            component={RouterLink} to={{
            pathname: "./" + auctionAddress
            }}
            fullWidth
            variant="text"
            color="success"
            sx={{
                backgroundColor: `${theme.colors.success.lighter}`,
                textTransform: 'uppercase',
                py: 1.5,
                '&:hover': {
                    backgroundColor: `${theme.colors.success.main}`,
                    color: `${theme.palette.getContrastText(theme.colors.success.dark)}`
                }
            }}
        >
            {t('View Details >')}
        </Button>
            </Box>

            <Box>
                <Button
                    fullWidth
                    variant="text"
                    color="error"
                    href={"./" + auctionConfig.auctionName}
                    sx={{
                        backgroundColor: `${theme.colors.error.lighter}`,
                        textTransform: 'uppercase',
                        py: 1.5,
                        '&:hover': {
                            backgroundColor: `${theme.colors.error.main}`,
                            color: `${theme.palette.getContrastText(theme.colors.error.dark)}`
                        }
                    }}
                >
                    {t('Quick Bid >')}
                </Button>
            </Box>
        </Stack>
    </Card>);
}

export default AuctionCard;