import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import Footer from 'src/components/Footer';
import PageTitleWrapper from 'src/components/PageTitleWrapper';

import { Grid } from '@mui/material';
import CommonTokens from './CommonTokens';
import OtherTokens from "./OtherTokens";

function ManageApprovals() {
  return (
    <>
      <Helmet>
        <title>Manage Approvals</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>

      <Grid
        sx={{
          px: 4
        }}
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={4}
      >
        <Grid item xs={12}>
          <CommonTokens />
        </Grid>
        <Grid item xs={12}>
          <OtherTokens />
        </Grid>
      </Grid>

      <Footer />
    </>
  );
}

export default ManageApprovals;
