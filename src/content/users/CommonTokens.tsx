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


    const { state: usernameState, send: setProfileDetails } = useContractFunction(Chainidentity__factory.connect(chainIdentityAddress, library.getSigner()), 'setUserProfileData');
    const { status: usernameStatus } = usernameState

    const updateSearchTerm = event => {
        setSearchTerm(event.target.value);
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

                      <Grid container spacing={3} pt={2}>
                          <Grid item xs={12} md={12}>
                              <TextField
                                  fullWidth
                                  name="title"
                                  onChange={updateSearchTerm}
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
