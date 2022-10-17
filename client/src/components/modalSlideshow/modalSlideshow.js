import './modalSlideshow.scss';
import React, { useState } from "react";

import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from "swiper";

import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import 'swiper/css';

function ModalSlideshow({ slideImages }) {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    return (
        <>
            <Swiper
                style={{
                    "--swiper-navigation-color": "#fff",
                    "--swiper-pagination-color": "#fff",
                }}
                spaceBetween={10}
                loop={true}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2"
            >
                {slideImages && slideImages.map( (slideImages, index) =>
                <SwiperSlide key={index}><img src={slideImages.image} alt=""/></SwiperSlide>)}
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
                
            >
                {slideImages && slideImages.map( (slideImages, index) =>
                <SwiperSlide key={index}><img src={slideImages.image} alt="" className="submodal"/></SwiperSlide>)}
            </Swiper>
        </>

    );
}

export default ModalSlideshow;
