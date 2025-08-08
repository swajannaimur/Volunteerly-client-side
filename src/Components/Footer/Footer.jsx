import React from 'react';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { IoLogoGithub } from 'react-icons/io';
import { Link } from 'react-router';

const Footer = () => {
    return (
        <div className="bg-primary text-white">
            <footer className="max-w-screen-xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
                
                {/* Left */}
                <div className="flex items-center justify-center md:justify-start gap-2">
                    <img
                        src="https://img.icons8.com/?size=100&id=16001&format=png&color=FFFFFF"
                        alt="logo"
                        className="w-10"
                    />
                    <span className="font-semibold text-lg">Volunteerly</span>
                </div>

                {/* Center */}
                <p className="text-sm font-medium">
                    © {new Date().getFullYear()} - All rights reserved
                </p>

                {/* Right (Social Links) */}
                <div className="flex gap-4 justify-center md:justify-end">
                    <Link to="https://www.facebook.com/" target="_blank" aria-label="Facebook">
                        <FaFacebookF size={20} />
                    </Link>
                    <Link to="https://www.instagram.com/" target="_blank" aria-label="Instagram">
                        <FaInstagram size={20} />
                    </Link>
                    <Link to="https://www.github.com/" target="_blank" aria-label="GitHub">
                        <IoLogoGithub size={20} />
                    </Link>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
