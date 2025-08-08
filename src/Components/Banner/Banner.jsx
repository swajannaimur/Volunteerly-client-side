import React from 'react';
import { Typewriter } from 'react-simple-typewriter';
import SwiperSlider from '../SwiperSlider/SwiperSlider';

const Banner = ({ postsPromise }) => {
    return (
        <div className="relative w-full rounded-2xl overflow-hidden">
            <div
                className="hero min-h-[80vh] bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url(https://imageio.forbes.com/specials-images/imageserve/65ad49201b8a4682439df59f/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds)",
                }}
            >
                <div className="hero-overlay bg-opacity-50"></div>

                <div className="hero-content flex flex-col-reverse lg:flex-row justify-between items-center w-full max-w-7xl mx-auto px-4 lg:px-10 gap-8">
                    
                    {/* Text Section */}
                    <div className="text-center lg:text-left text-white space-y-5 max-w-2xl">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                            Be the Change,
                            <span className="text-secondary">
                                <Typewriter
                                    words={[' Volunteer Today.']}
                                    loop={true}
                                    cursor
                                    cursorStyle="|"
                                    typeSpeed={60}
                                    deleteSpeed={40}
                                    delaySpeed={1500}
                                />
                            </span>
                        </h1>

                        <p className="text-base sm:text-lg lg:text-xl font-medium leading-relaxed">
                            Join a community of changemakers and make a real difference. Whether it’s helping the elderly, teaching kids, or supporting local causes — your time and effort matter.
                        </p>

                        <button className="btn btn-primary">Get Started</button>
                    </div>

                    {/* Swiper Section */}
                    <div className="w-full sm:max-w-sm md:max-w-md lg:w-[40%]">
                        <SwiperSlider postsPromise={postsPromise} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
