import React, { useContext, } from 'react';
import { AuthContext } from '../../contexts/AuthContexts';

import Loader from '../../Components/Loader/Loader';
import { useQuery } from '@tanstack/react-query';

const Notifications = () => {
    const { user } = useContext(AuthContext);

    const { data: notifications, isPending } = useQuery({
        queryKey: ["notifications"],
        queryFn: async () => {
            const res = await fetch(`https://volunteerly-server-side.vercel.app/notifications?email=${user.email}`)
            return res.json()
        }
    })

    if (isPending) return <Loader />;


    return (
        <div className="min-h-screen px-4 py-8">
            <div className="mb-6 text-center">
                <h2 className="text-2xl sm:text-3xl font-bold text-primary mt-4">Your Upcoming deadlines </h2>
                <p className="max-w-2xl mx-auto text-sm sm:text-base text-gray-700 my-3">
                    See your deadline after requesting
                </p>
            </div>

            {notifications.length === 0 ? (
                <p className="text-center text-gray-500">No upcoming events in the next 7 days.</p>
            ) : (
                <div className="overflow-x-auto bg-white shadow-md rounded-md p-4">
                    <table className="min-w-full border border-gray-300 rounded-lg shadow-md text-sm sm:text-base">
                        <thead className='bg-secondary text-white'>
                            <tr className="">
                                <th className="border border-gray-300 px-2 sm:px-4 py-2">Post Title</th>
                                <th className="border border-gray-300 px-2 sm:px-4 py-2">Deadline</th>
                                <th className="border border-gray-300 px-2 sm:px-4 py-2">Location</th>
                                <th className="border border-gray-300 px-2 sm:px-4 py-2">Organizer</th>
                            </tr>
                        </thead>
                        <tbody>
                            {notifications.map((n, i) => (
                                <tr key={i} className="hover:bg-gray-50">
                                    <td className="border border-gray-300 px-2 sm:px-4 py-2">{n.postTitle}</td>
                                    <td className="border border-gray-300 px-2 sm:px-4 py-2">{new Date(n.deadline).toLocaleDateString()}</td>
                                    <td className="border border-gray-300 px-2 sm:px-4 py-2">{n.location}</td>
                                    <td className="border border-gray-300 px-2 sm:px-4 py-2">{n.organizerName}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Notifications;
