import {
    Box,
    Card,
    Typography,
    Container,
    Divider,
    Button,
    FormControl,
    OutlinedInput,
    InputAdornment,
    styled, Grid, CardContent, Tooltip, CardActionArea, Avatar, alpha, Icon
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import TypeAnimation from 'react-type-animation';
import { useTranslation } from 'react-i18next';
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import ScrollAnimation from "react-animate-on-scroll"
import {
    ExpandMore,
    Looks3Rounded,
    Looks4Rounded,
    LooksOneOutlined,
    LooksOneRounded,
    LooksTwoRounded
} from "@mui/icons-material";
import {useFirstPrismicDocument, usePrismicDocumentByID, SliceZone} from "@prismicio/react";
import FeatureBox from "../../../components/FeatureBox/FeatureBox";

const MainContent = styled(Box)(
  () => `
    height: 100%;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
);

function Homepage() {
  const { t }: { t: any } = useTranslation();
  const [document] = usePrismicDocumentByID('Yr4K9BAAACUAnDVK');
  console.log(document);
  return (document != undefined &&
    <>
      <Helmet>
        <title>Aucry - Time, to make money</title>
      </Helmet>
      <MainContent>
        <Container maxWidth="md">
          <Box textAlign="center">
            <Typography sx={{
                  pt: 25, fontSize: "5rem", mb: 0, marginBlockEnd: 0,
                  '.heroTextTyper::after': { content: '"|"', animation: "cursor 1.1s 7 step-start", opacity: 0,
                   '@keyframes cursor' : { '0%': { opacity: 0 }, '50%': { opacity: 100 } }
                  }}}>
                <TypeAnimation cursor={false} className={"heroTextTyper"} sx={{ fontSize: "5rem", lineHeight:'1rem',  mb: 0, marginBlockEnd: 0 }}
                    wrapper={"span"} sequence={['',2500,'Time,', 1000, document.data.typewriter_headline[0].text]} />
            </Typography>
            <Typography variant="h4" color="text.secondary" fontWeight="normal" sx={{ height:"3rem", mb: 10 }}>
                <TypeAnimation cursor={false} sx={{fontSize: "5rem", mb: 0}} sequence={[' ',7500,document.data.typewriter_subtext[0].text]} />
            </Typography>
          </Box>
            <Grid container spacing={3}>
                <SliceZone slices={document.data.body} components={{ featurebox: FeatureBox }} />
            </Grid>
            <div style={{ textAlign: "center", marginBottom: "18rem"}}>
                <ExpandMore sx={{height:"3em", width:"auto", mt:4}}/>
            </div>
            <ScrollAnimation animateIn='fadeIn' sx={{mt:18}}>
                <h1>
                    animateIn
                </h1>
            </ScrollAnimation>
        </Container>
      </MainContent>
    </>
  );
}

export default Homepage;
