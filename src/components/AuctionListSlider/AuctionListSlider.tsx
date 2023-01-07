import {Box, Card, CardContent, Grid, Typography, Skeleton} from "@mui/material";
import {Swiper, SwiperSlide} from "swiper/react"
import React from "react";
import {useCall, useCalls} from "@usedapp/core";
import {AucryAuction, AucryAuction__factory, AucryHub__factory} from "../../types";
import {defaultRpc, hubContractAddress} from "../../config";
import AuctionDetailCard from "../AuctionDetailCard/AuctionDetailCard";
import AuctionCard from "../AuctionCard/AuctionCard";
import AuctionMiniCard from "../AuctionMiniCard/AuctionMiniCard";

const AuctionListSlider = ({slice}) => {
    const addressBook = useCall(
        slice.primary.currency_address && {
            contract: AucryHub__factory.connect(hubContractAddress, defaultRpc), // instance of called contract
            method: "activeAucrysForCurrency",
            args: [slice.primary.currency_address],
        });

    return (<Box>
            <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                    pb: 6,
                    pt: 3
                }}
            >
                <Typography variant="h4">{slice.primary.currency_name[0].text} ({slice.primary.currency_shortcode})</Typography>
            </Box>
            <Grid container spacing={3} sx={{
                pr: 4,
                pl: 3
            }}>
                <Swiper
                    slidesPerView={"auto"}
                    spaceBetween={5}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={false}
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
                    {!addressBook &&
                        <>
                            <Grid item xs={4} md={4}>
                                <Skeleton>
                                </Skeleton>
                            </Grid>
                            <Grid item xs={4} md={4}>
                                <Skeleton>
                                </Skeleton>
                            </Grid>
                            <Grid item xs={4} md={4}>
                                <Skeleton>
                                </Skeleton>
                            </Grid>
                            <Grid item xs={4} md={4}>
                                <Skeleton sx={{width:'100%'}}>
                                </Skeleton>
                            </Grid>
                        </>
                    }
                    {addressBook && addressBook.value !== undefined ? addressBook.value.addressBook.map((address, pointer) => (
                            <SwiperSlide style={{display: "block", width: "318px", minWidth:"250px", height:"250px"}}>
                                <AuctionMiniCard auction={address} auctionCurrency={slice.primary.currency_address} />
                            </SwiperSlide>
                    )) : []}

                </Swiper>
            </Grid>
        </Box>);
}

export default AuctionListSlider;