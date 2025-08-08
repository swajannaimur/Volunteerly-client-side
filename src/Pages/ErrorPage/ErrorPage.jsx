import React from 'react';
import { Link } from 'react-router';

const ErrorPage = () => {
    return (
        <div className='bg-base-200 min-h-screen flex items-center justify-center px-4'>
            <div className='text-center space-y-6'>
                <h2 className='text-red-500 font-extrabold text-6xl'>404</h2>
                <h2 className='font-bold text-3xl text-gray-700'>Oops! you are lost</h2>
                <p className='text-lg text-gray-500'>The page you are looking for does not exist.</p>
                <Link to='/'>
                    <button className='btn btn-primary text-white font-semibold px-6 py-2 rounded-lg shadow-md '>
                        Back to Home
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;
