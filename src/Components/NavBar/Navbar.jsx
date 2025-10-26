import React, { use, useState } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../../contexts/AuthContexts';
import Swal from 'sweetalert2';

const Navbar = () => {
    const { user, logOut } = use(AuthContext);
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") === "light" ? "light" : "dark"
    );

    const handleSignOut = () => {
        logOut()
            .then(() => {
                Swal.fire({
                    title: "Great!",
                    text: "Successfully logged out",
                    icon: "success"
                });
            }).catch((error) => {
                console.log(error);
            });
    };

    const handleThemeChange = (event) => {
        const newTheme = event.target.checked ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    };

    const links = (
        <>
            <li><NavLink to="/" className="text-primary lg:text-lg font-bold">Home</NavLink></li>
            <li><NavLink to="/allPosts" className="text-primary lg:text-lg font-bold">All Volunteer Need Posts</NavLink></li>
            <li><NavLink to="/myPosts" className="text-primary lg:text-lg font-bold">My Posts</NavLink></li>
            <li><NavLink to="/notifications" className="text-primary lg:text-lg font-bold">Notifications</NavLink></li>
        </>
    );

    return (
        <div className='max-w-[95%] mx-auto px-4'>
            <div className="navbar  lg:flex lg:justify-between lg:items-center">
                {/* Start Section (Mobile & Logo) */}
                <div className="flex justify-between items-center w-full lg:w-auto">
                    {/* Mobile Menu */}
                    <div className="dropdown lg:hidden">
                        <div tabIndex={0} role="button" className="btn btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </div>

                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[100] p-2 shadow bg-base-100 rounded-box w-52">
                            {links}
                            {
                                user ? (
                                    <>
                                        <li className='text-primary font-bold'>
                                            <Link to="/addVolunteer">Add Volunteer Need Posts</Link>
                                        </li>
                                        <li className='text-primary font-bold'>
                                            <Link to="/managePosts">Manage My Posts</Link>
                                        </li>
                                        <li>
                                            <button onClick={handleSignOut} className="btn btn-sm btn-error text-white mt-1">Logout</button>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li><Link to="/login">Login</Link></li>
                                        <li><Link to="/register">Register</Link></li>
                                    </>
                                )
                            }
                        </ul>
                    </div>

                    {/* Logo */}
                    <Link to='/' className='flex items-center gap-2'>
                        <img src='https://img.icons8.com/?size=100&id=16001&format=png&color=2c7be5' className='w-10' />
                        <span className='text-2xl hidden lg:block font-bold text-secondary'>Volunteerly</span>
                    </Link>
                </div>

                {/* Center Menu (visible in large screens) */}
                <div className="hidden lg:flex lg:justify-center">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>

                {/* End Section (visible in large screens) */}
                <div className="hidden lg:flex lg:justify-end lg:items-center space-x-2">
                    <div>
                        <input
                            type="checkbox"
                            value="dark"
                            className="toggle theme-controller mr-2"
                            checked={theme === "dark"}
                            onChange={handleThemeChange}
                        />
                        <span className='text-md text-primary font-bold'>
                            {theme === 'dark' ? 'Light' : 'Dark'}
                        </span>
                    </div>

                    {
                        user ? (
                            <div className="dropdown dropdown-end">
                                <div className="tooltip tooltip-bottom" data-tip={user.displayName}>
                                    <div tabIndex={0} role="button" className="avatar btn btn-ghost btn-circle">
                                        <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                            <img src={user.photoURL} alt="User Avatar" className='object-center' referrerPolicy="no-referrer" />
                                        </div>
                                    </div>
                                </div>

                                <ul
                                    tabIndex={0}
                                    className="mt-3 z-[1] p-2 border shadow-2xl menu menu-sm dropdown-content bg-base-100 rounded-box w-64">
                                    <li className='text-primary font-semibold'>
                                        <Link to="/addVolunteer">Add Volunteer Need Posts</Link>
                                    </li>
                                    <li className='text-primary font-semibold'>
                                        <Link to="/managePosts">Manage My Posts</Link>
                                    </li>
                                    <li>
                                        <button onClick={handleSignOut} className="btn btn-secondary text-white w-full mt-2">Logout</button>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <>
                                <Link to="/login">
                                    <button className="btn btn-primary font-bold">Login</button>
                                </Link>
                                <Link to="/register">
                                    <button className="btn btn-secondary font-bold">Register</button>
                                </Link>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;
