import './buildcardmodal.css';
import React, { useState } from "react";

import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from "swiper";

import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import 'swiper/css';

function BuildCardModal() {
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
                <SwiperSlide><img src="https://guide-images.cdn.ifixit.com/igi/DCWwPpQXohrvtrVl.large" alt=""/></SwiperSlide>
                <SwiperSlide><img src="https://guide-images.cdn.ifixit.com/igi/DCWwPpQXohrvtrVl.large" alt=""/></SwiperSlide>
                <SwiperSlide><img src="https://guide-images.cdn.ifixit.com/igi/DCWwPpQXohrvtrVl.large" alt=""/></SwiperSlide>
                <SwiperSlide><img src="https://guide-images.cdn.ifixit.com/igi/DCWwPpQXohrvtrVl.large" alt=""/></SwiperSlide>
                <SwiperSlide><img src="https://i.ytimg.com/vi/mgTgDsOA-ZM/maxresdefault.jpg" alt=""/></SwiperSlide>
                <SwiperSlide><img src="https://www.cnet.com/a/img/resize/d7d51f7d0aef23d71409b21adf6f84230d595d2f/hub/2019/12/02/3d379857-8a13-4b21-9f4c-312d9983d8fe/ogi1-mazda-miata-30th-anniversary-001.jpg?auto=webp&fit=crop&height=630&width=1200" alt="" className="center"/></SwiperSlide>
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
                <SwiperSlide><img src="https://guide-images.cdn.ifixit.com/igi/DCWwPpQXohrvtrVl.large" alt="" className="submodal"/></SwiperSlide>
                <SwiperSlide><img src="https://guide-images.cdn.ifixit.com/igi/DCWwPpQXohrvtrVl.large" alt="" className="submodal"/></SwiperSlide>
                <SwiperSlide><img src="https://guide-images.cdn.ifixit.com/igi/DCWwPpQXohrvtrVl.large" alt="" className="submodal"/></SwiperSlide>
                <SwiperSlide><img src="https://guide-images.cdn.ifixit.com/igi/DCWwPpQXohrvtrVl.large" alt="" className="submodal"/></SwiperSlide>
                <SwiperSlide><img src="https://i.ytimg.com/vi/mgTgDsOA-ZM/maxresdefault.jpg" alt="" className="submodal"/></SwiperSlide>
                <SwiperSlide><img src="https://www.cnet.com/a/img/resize/d7d51f7d0aef23d71409b21adf6f84230d595d2f/hub/2019/12/02/3d379857-8a13-4b21-9f4c-312d9983d8fe/ogi1-mazda-miata-30th-anniversary-001.jpg?auto=webp&fit=crop&height=630&width=1200" alt="" className="submodal"/></SwiperSlide>
            </Swiper>
        </>

    );
}

export default BuildCardModal;
