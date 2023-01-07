import {
  Typography,
  Box,
  Stack,
  Divider,
  styled,
  Avatar,
  alpha,
  lighten,
  useTheme
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import WhatshotTwoToneIcon from '@mui/icons-material/WhatshotTwoTone';

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

function PageHeader() {
  const { t }: { t: any } = useTranslation();
  const theme = useTheme();

  return (
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
            {t('Manage Transfer Approvals')}
          </Typography>
          <Typography variant="subtitle2">
            {t('Before you can bid on an auction, you must first connect your wallet and approve access to some of your tokens in each currency. ' +
                'As auctions are fast paced, we recommend approving for at least a few bids at a time. ' +
                'On this screen, you can review the approvals you have given us and add additional allowance to each, ' +
                'revoke the approval or approve bidding in a new currency.')}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default PageHeader;
