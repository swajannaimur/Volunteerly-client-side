import React, { useEffect, useState } from 'react';
import MyPostTable from './MyPostTable';
import Loader from '../Loader/Loader';

const MyPost = ({ myPostApi }) => {
    const [myPosts, setMyPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        myPostApi()
            .then(data => {
                setMyPosts(data);
                setLoading(false);
                console.log(data);
                
            })
            .catch(error => {
                console.error('Failed to fetch requests:', error);
                setLoading(false);
            });
    }, [myPostApi]);

    if (loading) {
        return <Loader></Loader>;
    }

    return (
        <div className=''>
            <div className="mb-6 text-center">
                <h2 className="text-2xl sm:text-3xl font-bold text-primary mt-4">Your Volunteer Posts</h2>
                <p className="max-w-2xl mx-auto text-sm sm:text-base text-gray-700 my-3">
                    Manage all the volunteer opportunities you've created. Track the number of volunteers needed, edit details, and stay organized with your ongoing community initiatives.
                </p>
            </div>
            {
                myPosts.length === 0 ? <div className="text-center text-secondary font-bold mt-12 text-2xl">
                    🎯 You don't have any volunteer posts yet. Create a new post to start making a difference in your community!
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
                                        myPosts.map((myPost, index) => (
                                            <MyPostTable
                                                key={myPost._id}
                                                index={index}
                                                myPost={myPost}
                                                myPosts={myPosts}
                                                setMyRequests={setMyPosts}
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

export default MyPost;