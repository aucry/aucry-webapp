import {Fragment, useRef, useState} from 'react';

import {
    Box,
    Grid,
    List,
    ListItemAvatar,
    Button,
    alpha,
    ListItemButton,
    Badge,
    Card,
    Tooltip,
    Divider,
    Avatar,
    Rating,
    Typography,
    IconButton,
    ListItemText,
    styled,
    useTheme, InputLabel, TextField
} from '@mui/material';

import { useTranslation } from 'react-i18next';
import HelpTwoToneIcon from '@mui/icons-material/HelpTwoTone';
import Label from 'src/components/Label';
import StorageTwoToneIcon from '@mui/icons-material/StorageTwoTone';
import GaugeChart from 'react-gauge-chart';
import DataSaverOnTwoToneIcon from '@mui/icons-material/DataSaverOnTwoTone';
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import {useCall, useContractFunction, useEthers} from "@usedapp/core";
import {AucryHub__factory, Chainidentity__factory} from "../../types";
import {chainIdentityAddress, defaultRpc, hubContractAddress} from "../../config";
import AvatarPicker from "../../components/AvatarPicker/AvatarPicker";

const BoxComposed = styled(Box)(
  () => `
    position: relative;
  `
);

const CardActions = styled(Box)(
  ({ theme }) => `
    position: absolute;
    right: ${theme.spacing(2)};
    top: ${theme.spacing(2)};
    z-index: 12;
  `
);

const BoxComposedContent = styled(Box)(
  () => `
    position: relative;
    z-index: 7;
  `
);

const BoxComposedImage = styled(Box)(
  () => `
    position: absolute;
    left: 0;
    top: 0;
    z-index: 5;
    filter: grayscale(80%);
    background-size: cover;
    height: 100%;
    width: 100%;
    border-radius: inherit;
  `
);

const BoxComposedBg = styled(Box)(
  () => `
    position: absolute;
    left: 0;
    top: 0;
    z-index: 6;
    height: 100%;
    width: 100%;
    border-radius: inherit;
  `
);

const IconButtonWrapper = styled(IconButton)(
  ({ theme }) => `
      background: transparent;
      transition: ${theme.transitions.create(['all'])};
      color: ${theme.colors.alpha.trueWhite[70]};
      border-radius: 50px;
  
      &:hover {
        background: transparent;
        color: ${theme.colors.alpha.trueWhite[100]};
      }
  `
);

const ListItemButtonWrapper = styled(ListItemButton)(
  ({ theme }) => `
    transition: ${theme.transitions.create('all')};
    background: ${theme.colors.alpha.white[100]};
    position: relative;
    z-index: 8;
    border-radius: 0;

    &:hover {
        background: ${alpha(theme.colors.primary.main, 0.03)};
        z-index: 9;
        box-shadow: 
            0 0.56875rem 2.3rem ${alpha(theme.colors.alpha.black[100], 0.03)},
            0 0.9975rem 1.4rem ${alpha(theme.colors.alpha.black[100], 0.04)},
            0 0.35rem .5rem ${alpha(theme.colors.alpha.black[100], 0.05)},
            0 0.225rem 0.4rem ${alpha(theme.colors.alpha.black[100], 0.07)};
    }
  `
);

function CommonTokens() {
    const { t }: { t: any } = useTranslation();
    const theme = useTheme();
    const { account, library } = useEthers();
    const [searchTerm, setSearchTerm] = useState("avatar");
    const [username, setUsername] = useState("");
    const [image1Epoch, setImage1Epoch] = useState("");
    const [image1Id, setImage1Id] = useState("");
    const [image2Epoch, setImage2Epoch] = useState("");
    const [image2Id, setImage2Id] = useState("");
    const [image3Epoch, setImage3Epoch] = useState("");
    const [image3Id, setImage3Id] = useState("");
    const [selectedAvatarEpoch, setSelectedAvatarEpoch] = useState("");
    const [selectedAvatarId, setSelectedAvatarId] = useState("");
    let timer = null;


    const { state: usernameState, send: setProfileDetails } = useContractFunction(Chainidentity__factory.connect(chainIdentityAddress, library.getSigner()), 'setUserProfileData');
    const { status: usernameStatus } = usernameState


    const callSetProfileDetails = () => {
        console.log(selectedAvatarEpoch);
        console.log(selectedAvatarId);

        void setProfileDetails(username, selectedAvatarEpoch !== "" ? selectedAvatarEpoch : userProfile.value.userProfile.avatarPart1,
            selectedAvatarId !== "" ? selectedAvatarId : userProfile.value.userProfile.avatarPart2).catch(reason => {
            console.log(reason);
        });
    }

    const updateSearchTerm = async (searchTerm) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fetch("https://source.unsplash.com/random/200x200/?" + searchTerm + "&cachebust=" + Math.random()).then((response) => {
                if (response.url.split("?").length === 2 && response.url.split("?")[0].split("photo-").length === 2) {
                    setImage1Epoch(response.url.split("?")[0].split("photo-")[1].split("-")[0]);
                    setImage1Id(response.url.split("?")[0].split("photo-")[1].split("-")[1]);
                }
            });
            fetch("https://source.unsplash.com/random/200x200/?" + searchTerm + "&cachebust=" + Math.random()).then((response) => {
                if (response.url.split("?").length === 2 && response.url.split("?")[0].split("photo-").length === 2) {
                    setImage2Epoch(response.url.split("?")[0].split("photo-")[1].split("-")[0]);
                    setImage2Id(response.url.split("?")[0].split("photo-")[1].split("-")[1]);
                }
            });
            fetch("https://source.unsplash.com/random/200x200/?" + searchTerm + "&cachebust=" + Math.random()).then((response) => {
                if (response.url.split("?").length === 2 && response.url.split("?")[0].split("photo-").length === 2) {
                    setImage3Epoch(response.url.split("?")[0].split("photo-")[1].split("-")[0]);
                    setImage3Id(response.url.split("?")[0].split("photo-")[1].split("-")[1]);
                }
            });
        }, 500);
    }

    const userProfile = useCall(
    account && {
        contract: Chainidentity__factory.connect(chainIdentityAddress, defaultRpc), // instance of called contract
        method: "getUserProfileData",
        args: [account],
    });

  return (
      <>
          <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                  pb: 3
              }}
          >
              <Typography variant="h2">{t('My Profile')}</Typography>
          </Box>
    <Card>
      <Grid container spacing={0}>
        <Grid
          item
          xs={12}
          lg={3}
          sx={{
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexGrow={1}
          >
            <Box>
                {account && userProfile &&
                    <>
                        <Avatar
                            sx={{
                                width: 200,
                                height: 200,
                                border: '5px solid #333',
                            }}
                            src={userProfile.value.userProfile.avatarPart1 ? "https://images.unsplash.com/photo-" + userProfile.value.userProfile.avatarPart1 + "-" + userProfile.value.userProfile.avatarPart2 + "?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&q=80" : "/static/images/avatars/1.jpg"}
                        />
                        <Typography variant={"h3"} sx={{mt:0.5,textAlign:"center"}}>
                            {userProfile.value.userProfile.userName}
                        </Typography>
                        <Typography variant={"subtitle1"} sx={{textAlign:"center"}}>
                            {t("Auctions Won: ")} {parseInt(userProfile.value.userProfile.auctionsWon['_hex'])}
                        </Typography>
                        <Typography variant={"subtitle1"} sx={{textAlign:"center"}}>
                            {t("Auctions Created: ")} {parseInt(userProfile.value.userProfile.auctionsCreated['_hex'])}
                        </Typography>
                        <Typography variant={"subtitle1"} sx={{textAlign:"center"}}>
                            {t("Bids Placed: ")} {parseInt(userProfile.value.userProfile.bidsPlaced['_hex'])}
                        </Typography>
                    </>
                }
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          lg={9}
          sx={{
            display: 'flex'
          }}
        >
          <BoxComposed
            display="flex"
            alignItems="center"
            sx={{
              width: '100%',
              position: 'relative',
              minHeight: '100%',
              background: `linear-gradient(100.66deg, #121212 6.56%, #000000 93.57%)`
            }}
          >

            <BoxComposedContent
              display="flex"
              flexGrow={1}
              alignItems="center"
              flexDirection="column"
              p={{ xs: 4, xl: 8 }}
            >
              <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontSize: `${theme.typography.pxToRem(18)}`,
                            color: `${theme.colors.alpha.trueWhite[100]}`,
                            pb: 2,
                            alignSelf: 'flex-start'
                        }}
                    >
                        {t("Change Avatar")}
                    </Typography>
                  <Card
                    sx={{
                      background: '#070919',
                      textAlign: 'center',
                      py: 2,
                      px: 2
                    }}
                  >

                    <AvatarPicker image1epoch={image1Epoch} image1id={image1Id}
                                  image2epoch={image2Epoch} image2id={image2Id}
                                  image3epoch={image3Epoch} image3id={image3Id}
                                  selectedAvatarEpoch={selectedAvatarEpoch}
                                  setSelectedAvatarEpoch={setSelectedAvatarEpoch}
                                  selectedAvatarId={selectedAvatarId}
                                  setSelectedAvatarId={setSelectedAvatarId}/>

                      <Grid container spacing={3} pt={2}>
                          <Grid item xs={12} md={12}>
                              <TextField
                                  fullWidth
                                  name="title"
                                  defaultValue={searchTerm}
                                  onChange={(e) => updateSearchTerm(e.target.value)}
                                  variant="outlined"
                                  label={t('Search for an avatar')}
                              />
                          </Grid>
                      </Grid>
                  </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontSize: `${theme.typography.pxToRem(18)}`,
                            color: `${theme.colors.alpha.trueWhite[100]}`,
                            alignSelf: 'flex-start',
                            pb: 2
                        }}
                    >
                        {t("Change Username")}
                    </Typography>
                    <Card
                        sx={{
                            background: '#070919',
                            textAlign: 'center',
                            py: 2,
                            px: 2,
                            mb: 2
                        }}
                    >

                        <TextField
                            fullWidth
                            name="title"
                            variant="outlined"
                            onChange={(e) => setUsername(e.target.value)}
                            label={t('New Username')}
                        />
                        <Typography variant={"h6"} sx={{mt:2}}>
                            Availability: __
                        </Typography>
                    </Card>

                    <Button fullWidth sx={{py:3.25, mt:2}} onClick={callSetProfileDetails} variant="contained">
                        {t('Save Changes')}
                    </Button>
                </Grid>
              </Grid>
            </BoxComposedContent>
          </BoxComposed>
        </Grid>
      </Grid>
    </Card>
      </>
  );
}

export default CommonTokens;
