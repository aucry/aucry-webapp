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
import ScrollAnimation from "react-animate-on-scroll";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "swiper/swiper-bundle.min.css";
import "swiper/"
import "./index.css";
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
import {Carousel} from "react-responsive-carousel";
import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination} from "swiper";
import {useContractAuctionDetails} from "../../../hooks/useContractAuctionDetails";
import CountdownClock from "../../../atoms/CountdownClock";
import AuctionHomeSlide from "../../../components/AuctionHomeSlide/AuctionHomeSlide";
import BlankSlice from "../../../components/BlankSlice/BlankSlice";
import React from 'react';
import AuctionListSlider from "../../../components/AuctionListSlider/AuctionListSlider";

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

function Auctions() {
  const { t }: { t: any } = useTranslation();
  const [document] = usePrismicDocumentByID('YuQsnhAAACAAcBUL');
  const slides = [];
  console.log(document);

    const details = useContractAuctionDetails("0x75537828f2ce51be7289709686A69CbFDbB714F1");

    const CardAddAction = styled(Card)(
        ({ theme }) => `
        border: ${theme.colors.primary.main} dashed 1px;
        height: 100%;
        color: ${theme.colors.primary.main};
        transition: ${theme.transitions.create(['all'])};
        
        .MuiCardActionArea-root {
          height: 100%;
          justify-content: center;
          align-items: center;
          display: flex;
        }
        
        .MuiTouchRipple-root {
          opacity: .2;
        }
        
        &:hover {
          border-color: ${theme.colors.alpha.black[70]};
        }
`
    );
    const AvatarAddWrapper = styled(Avatar)(
        ({ theme }) => `
        background: ${theme.colors.alpha.black[10]};
        color: ${theme.colors.primary.main};
        width: ${theme.spacing(8)};
        height: ${theme.spacing(8)};
`
    );

  return (document != undefined &&
    <>
      <Helmet>
        <title>Auctions | Aucry - Time, to make money</title>
      </Helmet>
      <MainContent>
          <Container maxWidth="lg">
              <Carousel
                  infiniteLoop
                  centerMode
                  autoPlay={true}
                  interval={5000}
                  showIndicators={false}
                  showStatus={false}
                  showThumbs={false}
                  emulateTouch={true}
              >
                  {document.data.body.filter(slice => slice.primary.slide).map((slice, index) => (
                     <AuctionHomeSlide slice={slice} />
                  ))}

              </Carousel>

              {document.data.body.filter(slice => slice.primary.currency_name).map((slice, index) => (
                  <AuctionListSlider slice={slice} />
              ))}

            <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                    pb: 6,
                    pt: 3
                }}
            >
                <Typography variant="h4">{t('Featured Auctions')}</Typography>
            </Box>
            <Grid container spacing={3} sx={{
                pr: 4,
                pl: 3
            }}>

                <Swiper
                    slidesPerView={1}
                    spaceBetween={5}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    breakpoints={{
                        "@0.00": {
                            slidesPerView: 1,
                            spaceBetween: 10,
                        },
                        "@0.75": {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        "@1.00": {
                            slidesPerView: 3,
                            spaceBetween: 40,
                        },
                        "@1.50": {
                            slidesPerView: 4,
                            spaceBetween: 50,
                        },
                    }}
                    className="mySwiper"
                >
                    <SwiperSlide>Slide 2</SwiperSlide>
                    <SwiperSlide>Slide 3</SwiperSlide>
                    <SwiperSlide>Slide 4</SwiperSlide>
                    <SwiperSlide>Slide 5</SwiperSlide>
                    <SwiperSlide>Slide 6</SwiperSlide>
                    <SwiperSlide>Slide 7</SwiperSlide>
                    <SwiperSlide>Slide 8</SwiperSlide>
                    <SwiperSlide>Slide 9</SwiperSlide>
                </Swiper>
            </Grid>


              <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{
                      pb: 6,
                      pt: 3
                  }}
              >
                  <Typography variant="h4">{t('WBNB Auctions')}</Typography>
              </Box>
              <Grid container spacing={3} sx={{
                  pr: 4,
                  pl: 3
              }}>

                  <Swiper
                      slidesPerView={1}
                      spaceBetween={5}
                      pagination={{
                          clickable: true,
                      }}
                      navigation={true}
                      breakpoints={{
                          "@0.00": {
                              slidesPerView: 1,
                              spaceBetween: 10,
                          },
                          "@0.75": {
                              slidesPerView: 2,
                              spaceBetween: 20,
                          },
                          "@1.00": {
                              slidesPerView: 3,
                              spaceBetween: 40,
                          },
                          "@1.50": {
                              slidesPerView: 4,
                              spaceBetween: 50,
                          },
                      }}
                      className="mySwiper"
                  >
                      <SwiperSlide>Slide 1</SwiperSlide>
                      <SwiperSlide>Slide 2</SwiperSlide>
                      <SwiperSlide>Slide 3</SwiperSlide>
                      <SwiperSlide>Slide 4</SwiperSlide>
                      <SwiperSlide>Slide 5</SwiperSlide>
                      <SwiperSlide>Slide 6</SwiperSlide>
                      <SwiperSlide>Slide 7</SwiperSlide>
                      <SwiperSlide>Slide 8</SwiperSlide>
                      <SwiperSlide>Slide 9</SwiperSlide>
                  </Swiper>
              </Grid>

              <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{
                      pb: 3,
                      pt: 3
                  }}
              >
                  <Typography variant="h4">{t('Ending Soon')}</Typography>
              </Box>
              <Grid container spacing={3} sx={{
                  pr: 4
              }}>
                  <Grid xs={12} sm={6} md={3} item>
                      <Card
                          sx={{
                              px: 1
                          }}
                      >
                          <CardContent>
                              <Typography variant="h5" noWrap>
                                  Bitcoin
                              </Typography>
                              <Typography variant="subtitle1" noWrap>
                                  BTC
                              </Typography>
                              <Box
                                  sx={{
                                      pt: 3
                                  }}
                              >
                                  <Typography variant="h3" gutterBottom noWrap>
                                      $3,586.22
                                  </Typography>
                                  <Typography variant="subtitle2" noWrap>
                                      1.25843 BTC
                                  </Typography>
                              </Box>
                          </CardContent>
                      </Card>
                  </Grid>
                  <Grid xs={12} sm={6} md={3} item>
                      <Card
                          sx={{
                              px: 1
                          }}
                      >
                          <CardContent>
                              <Typography variant="h5" noWrap>
                                  Ripple
                              </Typography>
                              <Typography variant="subtitle1" noWrap>
                                  XRP
                              </Typography>
                              <Box
                                  sx={{
                                      pt: 3
                                  }}
                              >
                                  <Typography variant="h3" gutterBottom noWrap>
                                      $586.83
                                  </Typography>
                                  <Typography variant="subtitle2" noWrap>
                                      5,783 XRP
                                  </Typography>
                              </Box>
                          </CardContent>
                      </Card>
                  </Grid>
                  <Grid xs={12} sm={6} md={3} item>
                      <Card
                          sx={{
                              px: 1
                          }}
                      >
                          <CardContent>
                              <Typography variant="h5" noWrap>
                                  Cardano
                              </Typography>
                              <Typography variant="subtitle1" noWrap>
                                  ADA
                              </Typography>
                              <Box
                                  sx={{
                                      pt: 3
                                  }}
                              >
                                  <Typography variant="h3" gutterBottom noWrap>
                                      $54,985.00
                                  </Typography>
                                  <Typography variant="subtitle2" noWrap>
                                      34,985 ADA
                                  </Typography>
                              </Box>
                          </CardContent>
                      </Card>
                  </Grid>
                  <Grid xs={12} sm={6} md={3} item>
                      <Tooltip arrow title={t('Search for auctions of another token')}>
                          <CardAddAction>
                              <CardActionArea
                                  sx={{
                                      px: 1
                                  }}
                              >
                                  <CardContent>
                                      <AvatarAddWrapper>
                                          <SearchTwoToneIcon fontSize="large" />
                                      </AvatarAddWrapper>
                                  </CardContent>
                              </CardActionArea>
                          </CardAddAction>
                      </Tooltip>
                  </Grid>
              </Grid>

        </Container>
      </MainContent>
    </>
  );
}

export default Auctions;
