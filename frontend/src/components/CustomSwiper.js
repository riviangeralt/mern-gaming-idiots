import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import { withRouter } from "react-router-dom";
import CustomCard from "./CustomCard";

SwiperCore.use([Navigation])

const CustomSwiper = (props) => {
    const { data, pages, space, height, isSmall, type } = props
    return (
        <>
            <Swiper
                spaceBetween={space}
                slidesPerView={pages}
                navigation={true}
                style={{ marginBottom: '2rem' }}
            >
                {data.map((element, index) =>
                    <SwiperSlide key={index} >
                        <CustomCard isSmall={isSmall} height={height} element={element} type={type} />
                    </SwiperSlide>
                )}
            </Swiper>
        </>
    );
};

export default withRouter(CustomSwiper);
