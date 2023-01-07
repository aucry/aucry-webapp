import {useContext, useEffect, useRef, useState} from 'react';

import {
  Box,
  alpha,
  Stack,
  lighten,
  Divider,
  IconButton,
  Tooltip,
  styled,
  useTheme, Button, Avatar, Typography, Grid, Card, Popover, ButtonGroup
} from '@mui/material';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import { SidebarContext } from 'src/contexts/SidebarContext';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';

import { useTranslation } from 'react-i18next';
import {useCall, useEthers, useLookupAddress} from "@usedapp/core";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from 'web3modal';
import {AucryHub__factory, Chainidentity__factory} from "../../types";
import {chainIdentityAddress, defaultRpc, hubContractAddress} from "../../config";

import KeyboardArrowDownTwoToneIcon from '@mui/icons-material/KeyboardArrowDownTwoTone';
import {AddTask} from "@mui/icons-material";
const HeaderWrapper = styled(Box)(
  ({ theme }) => `
        height: ${theme.header.height};
        color: ${theme.header.textColor};
        padding: ${theme.spacing(0, 2)};
        right: 0;
        z-index: 6;
        background-color: ${alpha(theme.header.background, 0.95)};
        backdrop-filter: blur(3px);
        position: fixed;
        justify-content: space-between;
        width: 100%;
        @media (min-width: ${theme.breakpoints.values.lg}px) {
            left: ${theme.sidebar.width};
            width: auto;
        }
`
);

function Header() {
  const { t }: { t: any } = useTranslation();
  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);
  const [ blockText, setBlockText ] = useState("");

  const { account, activate, deactivate } = useEthers()
  const [showModal, setShowModal] = useState(false)
  const [activateError, setActivateError] = useState('')

  const ref2 = useRef<any>(null);
  const [isOpen2, setOpen2] = useState<boolean>(false);
  const handleOpen2 = (): void => {
    setOpen2(true);
  };

  const handleClose2 = (): void => {
    setOpen2(false);
  };

  const userProfile = useCall(
      account && {
        contract: Chainidentity__factory.connect(chainIdentityAddress, defaultRpc), // instance of called contract
        method: "getUserProfileData",
        args: [account],
      });

  const activateProvider = async () => {
    const providerOptions = {
      injected: {
        display: {
          name: 'Metamask',
          description: 'Connect with the provider in your Browser',
        },
        package: null,
      },
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          bridge: 'https://bridge.walletconnect.org',
          infuraId: 'd8df2cb7844e4a54ab0a782f608749dd',
        },
      },
    }

    const web3Modal = new Web3Modal({
      providerOptions,
    })
    try {
      const provider = await web3Modal.connect()
      await activate(provider)
      setActivateError('')
    } catch (error: any) {
      setActivateError(error.message)
    }
  }

  const theme = useTheme();


  return (
    <HeaderWrapper
      display="flex"
      alignItems="center"
      sx={{
        boxShadow:
          theme.palette.mode === 'dark'
            ? '0 1px 0 ' +
              alpha(lighten(theme.colors.primary.main, 0.7), 0.15) +
              ', 0px 2px 8px -3px rgba(0, 0, 0, 0.2), 0px 5px 22px -4px rgba(0, 0, 0, .1)'
            : '0px 2px 8px -3px ' +
              alpha(theme.colors.alpha.black[100], 0.2) +
              ', 0px 5px 22px -4px ' +
              alpha(theme.colors.alpha.black[100], 0.1)
      }}
    >
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        alignItems="center"
        spacing={0}
      >

        <Box alignSelf={"left"} textAlign="center" p={3}>
          Active Auctions: 8257
        </Box>
      </Stack>

      <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          alignItems="center"
          spacing={0}
      >

        <Box alignSelf={"center"} textAlign="center" p={3}>
          <ButtonGroup variant="contained" aria-label="split button">
          <Button
              ref={ref2}
              onClick={handleOpen2}
              endIcon={<KeyboardArrowDownTwoToneIcon />}
              color="secondary"
              sx={{
                px: 2,
                color: '#FFF', fontWeight: 'bold !important', border: '2px solid #3B0C3D', backgroundColor: '#210322',

                '.MuiSvgIcon-root': {
                  color: `${theme.colors.secondary.dark}`,
                  transition: `${theme.transitions.create(['color'])}`
                },

                '&:hover': {
                  backgroundColor: `#27053f`,
                  color: `${theme.palette.getContrastText(
                      '#27053f'
                  )}`,

                  '.MuiSvgIcon-root': {
                    color: `${theme.palette.getContrastText(
                        theme.colors.secondary.main
                    )}`
                  }
                }
              }}
          >
            <img src={"https://s2.coinmarketcap.com/static/img/coins/64x64/7192.png"} height={"20"}/> &nbsp;&nbsp;
            {t('0.3587555 BNB')}
          </Button>
            <Button
                size="small"
                aria-controls={isOpen2 ? 'split-button-menu' : undefined}
                aria-expanded={isOpen2 ? 'true' : undefined}
                aria-label="select merge strategy"
                aria-haspopup="menu"
            >
              <AddTask />
            </Button>
          </ButtonGroup>
          <Popover
              anchorEl={ref2.current}
              onClose={handleClose2}
              disableScrollLock={true}
              disablePortal={false}
              open={isOpen2}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center'
              }}
              transformOrigin={{
                vertical: 'bottom',
                horizontal: 'center'
              }}
              sx={{
                marginTop: "40px"
              }}
          >
            <Box
                sx={{
                  maxWidth: 400
                }}
                p={3}
            >
              <Typography
                  variant="h4"
                  gutterBottom
                  textAlign="center"
                  sx={{
                    color: theme.colors.alpha.trueWhite[100],
                    fontSize: theme.typography.pxToRem(18)
                  }}
              >
                {t('Dashboards')}
              </Typography>
              <Typography
                  variant="subtitle2"
                  textAlign="center"
                  sx={{
                    color: theme.colors.alpha.trueWhite[70]
                  }}
              >
                {t("This is just a menu example we've created")}
              </Typography>
              <Grid container mt={1} spacing={2}>
                <Grid item xs={12} sm={6}>
                  test
                </Grid>
              </Grid>
            </Box>
          </Popover>
        </Box>
      </Stack>
      <Box display="flex" alignItems="center">
        <Box textAlign="center" p={3}>
          <Button color={"secondary"} sx={{color: '#FFF', fontWeight: 'bold !important', border: '2px solid #3B0C3D', backgroundColor: '#210322'}} variant="contained" onClick={activateProvider}>
            {!account &&
                <>{t('Connect Wallet')}</>
            }
            {account && !userProfile &&
                <>Loading...</>
            }
            {account && userProfile &&
                <>
                  <Avatar
                      sx={{
                        width: 25,
                        height: 25,
                        mr: 1,
                        border: '1px solid #3B0C3D',
                      }}
                      src={userProfile.value.userProfile.avatarPart1 ? "https://images.unsplash.com/photo-" + userProfile.value.userProfile.avatarPart1 + "-" + userProfile.value.userProfile.avatarPart2 + "?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&q=80" : "/static/images/avatars/1.jpg"}
                  />
                  {userProfile.value.userProfile.userName}</>
            }
          </Button>
        </Box>
        <Box
          component="span"
          sx={{
            ml: 2,
            display: { lg: 'none', xs: 'inline-block' }
          }}
        >
          <Tooltip arrow title="Toggle Menu">
            <IconButton color="primary" onClick={toggleSidebar}>
              {!sidebarToggle ? (
                <MenuTwoToneIcon fontSize="small" />
              ) : (
                <CloseTwoToneIcon fontSize="small" />
              )}
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </HeaderWrapper>
  );
}

export default Header;
