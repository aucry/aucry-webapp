import {
  Box,
  IconButton,
  Badge,
  Tooltip,
  TooltipProps,
  alpha,
  tooltipClasses,
  styled,
  useTheme
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {MenuBook, Telegram} from "@mui/icons-material";

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.colors.alpha.trueWhite[100],
    color: theme.palette.getContrastText(theme.colors.alpha.trueWhite[100]),
    boxShadow: theme.shadows[24],
    fontWeight: 'bold',
    fontSize: theme.typography.pxToRem(12)
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.colors.alpha.trueWhite[100]
  }
}));

function SidebarFooter() {
  const { t }: { t: any } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: 60
      }}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <LightTooltip placement="top" arrow title={t('Github')}>
        <IconButton
          sx={{
            background: `${theme.colors.alpha.trueWhite[10]}`,
            color: `${theme.colors.alpha.trueWhite[70]}`,
            transition: `${theme.transitions.create(['all'])}`,
            margin: '0px 3px',
            '&:hover': {
              background: `${alpha(theme.colors.alpha.trueWhite[100], 0.2)}`,
              color: `${theme.colors.alpha.trueWhite[100]}`
            }
          }}
          to="/extended-sidebar/applications/calendar"
          component={RouterLink}
        >
          <GitHubIcon fontSize="small" />
        </IconButton>
      </LightTooltip>
      <LightTooltip placement="top" arrow title={t('Docs')}>
        <IconButton
            sx={{
              background: `${theme.colors.alpha.trueWhite[10]}`,
              color: `${theme.colors.alpha.trueWhite[70]}`,
              transition: `${theme.transitions.create(['all'])}`,
                margin: '0px 3px',
              '&:hover': {
                background: `${alpha(theme.colors.alpha.trueWhite[100], 0.2)}`,
                color: `${theme.colors.alpha.trueWhite[100]}`
              }
            }}
            to="/extended-sidebar/applications/calendar"
            component={RouterLink}
        >
          <MenuBook fontSize="small" />
        </IconButton>
      </LightTooltip>
      <LightTooltip placement="top" arrow title={t('Telegram')}>
            <IconButton
                sx={{
                    background: `${theme.colors.alpha.trueWhite[10]}`,
                    color: `${theme.colors.alpha.trueWhite[70]}`,
                    transition: `${theme.transitions.create(['all'])}`,
                    margin: '0px 3px',
                    '&:hover': {
                        background: `${alpha(theme.colors.alpha.trueWhite[100], 0.2)}`,
                        color: `${theme.colors.alpha.trueWhite[100]}`
                    }
                }}
                to="/extended-sidebar/applications/calendar"
                component={RouterLink}
            >
                <Telegram fontSize="small" />
            </IconButton>
       </LightTooltip>
       <LightTooltip placement="top" arrow title={t('Telegram')}>
            <IconButton
                sx={{
                    background: `${theme.colors.alpha.trueWhite[10]}`,
                    color: `${theme.colors.alpha.trueWhite[70]}`,
                    transition: `${theme.transitions.create(['all'])}`,
                    margin: '0px 3px',
                    '&:hover': {
                        background: `${alpha(theme.colors.alpha.trueWhite[100], 0.2)}`,
                        color: `${theme.colors.alpha.trueWhite[100]}`
                    }
                }}
                to="/extended-sidebar/applications/calendar"
                component={RouterLink}
            >
                <TwitterIcon fontSize="small" />
            </IconButton>
        </LightTooltip>

    </Box>
  );
}

export default SidebarFooter;
