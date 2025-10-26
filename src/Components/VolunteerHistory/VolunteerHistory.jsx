import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContexts';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import Loader from '../../Components/Loader/Loader';

const VolunteerHistory = () => {
    const { user } = useContext(AuthContext);

    const { data: history, isLoading } = useQuery({
        queryKey: ['volunteerHistory', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:3000/history?email=${user.email}`);
            if (!res.ok) throw new Error('Failed to fetch history');
            return res.json();
        },
        enabled: !!user,
    });

    if (isLoading) return <Loader />;

    if (!history || history.length === 0)
        return <p className="text-center text-gray-500">No volunteer history found.</p>;

    return (
        <div>
            <div className="mb-6 text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-primary mt-4">
                    My Volunteer History
                </h2>
                <p className="max-w-3xl mx-auto text-sm sm:text-base text-gray-700 my-3">
                    Here you can see all the volunteer events you have participated in, the hours you contributed,
                    and any feedback or ratings received. Track your impact over time and celebrate your milestones
                    in making a difference in the community.
                </p>
            </div>

            <div className="overflow-x-auto p-4">
                <table className="min-w-full border border-gray-300 rounded-lg shadow-md text-sm sm:text-base">
                    <thead className="bg-secondary text-white">
                        <tr className="text-left">
                            <th className="border border-gray-300 px-2 sm:px-4 py-2">SL No.</th>
                            <th className="border border-gray-300 px-2 sm:px-4 py-2">Event</th>
                            <th className="border border-gray-300 px-2 sm:px-4 py-2">Date</th>
                            <th className="border border-gray-300 px-2 sm:px-4 py-2">Hours</th>
                            <th className="border border-gray-300 px-2 sm:px-4 py-2">Feedback</th>
                            <th className="border border-gray-300 px-2 sm:px-4 py-2">Rating</th>
                            <th className="border border-gray-300 px-2 sm:px-4 py-2">Organizer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.map((h, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="border border-gray-300 px-2 sm:px-4 py-2">{index + 1}</td>
                                <td className="border border-gray-300 px-2 sm:px-4 py-2">{h.postTitle}</td>
                                <td className="border border-gray-300 px-2 sm:px-4 py-2">{new Date(h.date).toLocaleDateString()}</td>
                                <td className="border border-gray-300 px-2 sm:px-4 py-2">{h.hours}</td>
                                <td className="border border-gray-300 px-2 sm:px-4 py-2">{h.feedback || '-'}</td>
                                <td className="border border-gray-300 px-2 sm:px-4 py-2">{h.rating || '-'}</td>
                                <td className="border border-gray-300 px-2 sm:px-4 py-2">
                                    {h.organizer}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default VolunteerHistory;
