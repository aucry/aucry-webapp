import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Box, Grid, Typography, Button, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';

const RootWrapper = styled(Box)(
  () => `
    flex: 1;
`
);

function PageHeader() {
  const { t }: { t: any } = useTranslation();
  const location = useLocation();

  return (
    <RootWrapper>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="h3" component="h3" gutterBottom>
                {t('Create an Auction')}
              </Typography>
              <Typography variant="subtitle2">
                {t('During this wizard, you will be required to choose various options on how your auction will run, and will be required to transfer your chosen auction amount when creating the auction.' +
                    ' If an auction does not attract bids or fails to meet the reserve price, you will be able to reclaim the value of auction from the My Aucry page.')}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </RootWrapper>
  );
}

export default PageHeader;
