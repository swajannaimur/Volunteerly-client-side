import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/NavBar/Navbar';
import Footer from '../Components/Footer/Footer';
import { ToastContainer } from 'react-toastify';

const RootLayOut = () => {
    return (
        <div>
            <Navbar />
            <div className="relative z-10 max-w-[92%] mx-auto">
                <Outlet />
            </div>
            <Footer />
            <ToastContainer />
        </div>
    );
};

export default RootLayOut;
