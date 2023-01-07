import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import Footer from 'src/components/Footer';

import {Box, Card, Grid, Typography} from '@mui/material';
import {useTranslation} from "react-i18next";
import {useCall} from "@usedapp/core";
import {Chainidentity__factory} from "../../types";
import {chainIdentityAddress, defaultRpc} from "../../config";
import {useParams} from "react-router-dom";

function ManageApprovals() {
  const { t } = useTranslation();
  const { userAddress } = useParams();

  const userProfile = useCall(
      userAddress && {
            contract: Chainidentity__factory.connect(chainIdentityAddress, defaultRpc), // instance of called contract
            method: "getUserProfileData",
            args: [userAddress],
        });

  return (
    <>
      <Helmet>
        <title>Profile for address</title>
      </Helmet>
        {userProfile !== undefined ?
      <Grid container xs={12} sx={{p:4}}>
          <Grid xs={12} item>
                  <PageHeader userProfile={userProfile.value.userProfile} />
          </Grid>
          <Grid p={2} xs={12} lg={3} item>
              <Typography variant="h3" component="h3" textAlign={"left"} sx={{fontSize:"1.2rem", pb:2}}>
                  {t('Overview')}
              </Typography>
              <Card sx={{p:2}}>
                  test
              </Card>
          </Grid>
          <Grid p={2}  xs={12} lg={9} item>
              <Typography variant="h3" component="h3" textAlign={"left"} sx={{fontSize:"1.2rem", pb:2}}>
                  {t('Created Auctions')}
              </Typography>
              <Card sx={{mb:4}}>
                  <Typography
                      sx={{
                          py: 4
                      }}
                      variant="h5"
                      fontWeight="normal"
                      color="text.secondary"
                      align="center"
                  >
                      {t(
                          "This user has not created any auctions yet"
                      )}
                  </Typography>
              </Card>


              <Typography variant="h3" component="h3" textAlign={"left"} sx={{fontSize:"1.2rem", pb:2}}>
                  {t('Won Auctions')}
              </Typography>
              <Card sx={{mb:4}}>
                  <Typography
                      sx={{
                          py: 4
                      }}
                      variant="h5"
                      fontWeight="normal"
                      color="text.secondary"
                      align="center"
                  >
                      {t(
                          "This user has not won any auctions yet"
                      )}
                  </Typography>
              </Card>



              <Typography variant="h3" component="h3" textAlign={"left"} sx={{fontSize:"1.2rem", pb:2}}>
                  {t('Bid History')}
              </Typography>
              <Card sx={{mb:4}}>
                  <Typography
                      sx={{
                          py: 4
                      }}
                      variant="h5"
                      fontWeight="normal"
                      color="text.secondary"
                      align="center"
                  >
                      {t(
                          "This user has not placed any bids yet"
                      )}
                  </Typography>
              </Card>
          </Grid>
      </Grid> : <>Loading</>}


      <Footer />
    </>
  );
}

export default ManageApprovals;
