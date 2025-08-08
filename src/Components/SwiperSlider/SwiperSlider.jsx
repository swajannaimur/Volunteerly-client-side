import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const SwiperSlider = ({ postsPromise }) => {
    return (
        <div className="w-full hidden md:block">
            <style>
                {`
                    .swiper-button-next,
                    .swiper-button-prev {
                         color: #F97316 !important;
                         font-weight: 900 !important;
                         font-size: 28px !important;
                         text-shadow: 0 0 5px rgba(0,0,0,0.5);
                    }
                `}
            </style>
            <Swiper
                modules={[Navigation, Autoplay]}
                navigation
                autoplay={{ delay: 2500 }}
                spaceBetween={30}
                className="w-full max-w-xs sm:max-w-sm lg:max-w-md"
            >
                {postsPromise.map((post) => (
                    <SwiperSlide key={post._id}>
                        <div className="text-center">
                            <img
                                src={post.thumbnail}
                                alt={post.name || post.postTitle}
                                className="w-full h-52 sm:h-64 object-cover rounded-xl"
                            />
                            <h2 className="mt-2 text-lg sm:text-xl font-bold text-white drop-shadow">
                                {post.name || post.postTitle}
                            </h2>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default SwiperSlider;
