import React, { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';
import MyRequestTable from '../MyRequestTable/MyRequestTable';

const MyRequest = ({ myRequestApi }) => {
    const [myRequests, setMyRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        myRequestApi()
            .then(data => {
                setMyRequests(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Failed to fetch requests:', error);
                setLoading(false);
            });
    }, [myRequestApi]);

    if (loading) {
        return <Loader></Loader>;
    }

    return (
        <div>
            <div className="mb-6 text-center">
                <h2 className="text-2xl sm:text-3xl font-bold text-primary mt-4">My Requests to be a Volunteer</h2>
                <p className="max-w-2xl mx-auto text-sm sm:text-base text-gray-700 my-3">
                    View and manage the volunteer requests you've submitted. Stay informed about your application status and track the opportunities you've shown interest in.
                </p>
            </div>

            {
                myRequests.length === 0 ? <div className="text-center text-secondary font-bold mt-12 text-2xl">
                    🎯 You don't have any Requests yet. Create a new request to start making a difference in your community!
                </div>

                    : <>
                        <div className="overflow-x-auto p-4">
                            <table className="min-w-full border border-gray-300 rounded-lg shadow-md text-sm sm:text-base">
                                <thead className="bg-secondary text-white">
                                    <tr className="text-left">
                                        <th className="border border-gray-300 px-2 sm:px-4 py-2">SL No.</th>
                                        <th className="border border-gray-300 px-2 sm:px-4 py-2">Thumbnail</th>
                                        <th className="border border-gray-300 px-2 sm:px-4 py-2">Post Title</th>
                                        <th className="border border-gray-300 px-2 sm:px-4 py-2">Volunteer's Need</th>
                                        <th className="border border-gray-300 px-2 sm:px-4 py-2">Manage Posts</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        myRequests.map((myRequest, index) => (
                                            <MyRequestTable
                                                key={myRequest._id}
                                                index={index}
                                                myRequest={myRequest}
                                                myRequests={myRequests}
                                                setMyRequests={setMyRequests}
                                            />
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </>
            }


        </div>
    );
};

export default MyRequest;
