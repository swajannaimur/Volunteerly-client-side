import React, { useEffect, useState } from 'react';
import NeedVolunteersNow from '../NeedVolunteersNow/NeedVolunteersNow';
import Loader from '../Loader/Loader';
import { Link } from 'react-router';

const VolunteerNeeds = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://volunteerly-server-side.vercel.app/volunteers/upcoming')
            .then(res => res.json())
            .then(data => {
                setPosts(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch posts:', err);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <div className='text-center'>
                <h2 className="text-2xl sm:text-3xl font-bold text-primary my-4">Apply to Be a Volunteer</h2>
                <p className="text-sm max-w-9/12 mx-auto sm:text-xl font-semibold  text-secondary text-center mb-4">
                    Explore the most urgent volunteering opportunities and make a positive impact in your community. Find a cause you care about and sign up to help today.
                </p>
            </div>
            <div>
                {loading ? (
                    <Loader></Loader>
                ) : (
                    <NeedVolunteersNow postsPromise={posts} />
                )}
            </div>
            <div className='text-center my-12'>
                <Link to='/allPosts'>  <button className='btn btn-secondary text-lg'>See All</button></Link>
            </div>
        </div>
    );
};

export default VolunteerNeeds;
