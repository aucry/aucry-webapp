import {
  Typography,
  Box,
  Stack,
  Divider,
  styled,
  Avatar,
  alpha,
  lighten,
  useTheme, Card, CardMedia, Button, IconButton
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import UploadTwoToneIcon from "@mui/icons-material/UploadTwoTone";

const CardCover = styled(Card)(
    ({ theme }) => `
    position: relative;

    .MuiCardMedia-root {
      height: ${theme.spacing(26)};
    }
`
);

const AvatarWrapper = styled(Card)(
    ({ theme }) => `

    position: relative;
    overflow: visible;
    display: inline-block;
    margin-top: -${theme.spacing(12)};
    margin-left: ${theme.spacing(2)};
    .MuiAvatar-root {
      width: ${theme.spacing(16)};
      height: ${theme.spacing(16)};
    }
`
);

const UserName = styled(Box)(
    ({ theme }) => `
    position: relative;
    overflow: visible;
    display: inline-block;
    margin-top: -${theme.spacing(9)};
    margin-left: ${theme.spacing(2)};
    top: -14px;
    .MuiAvatar-root {
      width: ${theme.spacing(16)};
      height: ${theme.spacing(16)};
    }
`
);

function PageHeader({userProfile}) {
  const { t }: { t: any } = useTranslation();
  const theme = useTheme();
  console.log(userProfile);
  return (
    <Box
      alignItems={{ xs: 'left' }}
      textAlign={"left"}
      justifyContent="space-between"
    >
      <Box alignItems="left">

        <Box alignItems={"left"}>
          <CardCover>
            <CardMedia image={"/static/images/placeholders/covers/1.jpg"} />
          </CardCover>
          <AvatarWrapper>
            <Avatar variant="rounded" alt={"test"} src={userProfile.avatarPart1 ? "https://images.unsplash.com/photo-" + userProfile.avatarPart1 + "-" + userProfile.avatarPart2 + "?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&q=80" : "/static/images/avatars/1.jpg"} />
          </AvatarWrapper>
          <UserName>
            <Typography variant="h2" component="h2" textAlign={"left"} sx={{pb:"7px"}}>
              {userProfile.userName.replace(/(<([^>]+)>)/ig)}
            </Typography>
            <Typography variant="h6" component="h6" textAlign={"left"} gutterBottom>
              0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0
            </Typography>
          </UserName>

        </Box>
        <Box alignItems={"right"}>

        </Box>
      </Box>
    </Box>
  );
}

export default PageHeader;
