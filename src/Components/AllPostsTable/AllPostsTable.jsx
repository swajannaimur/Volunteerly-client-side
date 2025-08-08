import React from 'react';
import { Link } from 'react-router';

const AllPostsTable = ({ volunteer, index }) => {
    const { _id, thumbnail, postTitle, volunteersNeeded, organizerName } = volunteer;

    return (
        <tr className="hover:bg-gray-50">
            <th className="border border-gray-300 px-2 sm:px-4 py-2">
                {index + 1}
            </th>
            <td className="border border-gray-300 px-2 sm:px-4 py-2">
                <div className="flex items-center gap-2 sm:gap-3">
                    <div className="avatar">
                        <div className="rounded-full w-10 h-10 sm:w-12 sm:h-12">
                            <img src={thumbnail} alt="thumbnail" className="object-cover" />
                        </div>
                    </div>
                </div>
            </td>
            <td className="border border-gray-300 px-2 sm:px-4 py-2">
                <div className="font-medium text-gray-800">{postTitle}</div>
            </td>
            <td className="border border-gray-300 px-2 sm:px-4 py-2">
                <div className="font-medium text-gray-800">{volunteersNeeded}</div>
            </td>
            <td className="border border-gray-300 px-2 sm:px-4 py-2">
                <div className="font-medium text-gray-800">{organizerName}</div>
            </td>

            <td className="border space-x-5 border-gray-300 px-2 sm:px-4 py-2 ">
                <Link to={`/volunteerDetails/${_id}`}>
                    <button className='btn btn-primary'>
                        View Details
                    </button>
                </Link>
            </td>
        </tr>
    );
};

export default AllPostsTable;