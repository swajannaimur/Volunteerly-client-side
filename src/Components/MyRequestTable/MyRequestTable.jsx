import axios from 'axios';
import React from 'react';
import { MdCancel } from 'react-icons/md';
import Swal from 'sweetalert2';

const MyRequestTable = ({ myRequest, index, myRequests, setMyRequests }) => {
    const { _id, thumbnail, postTitle, volunteersNeeded } = myRequest;

    const handleDeletePost = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`https://volunteerly-server-side.vercel.app/requests/${id}`)
                    .then((res) => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your Request has been Canceled.",
                                icon: "success"
                            });
                        }
                        const remainingRequests = myRequests.filter(myRequest => myRequest._id !== _id)
                        setMyRequests(remainingRequests)
                    })
                    .catch((error) => {
                        Swal.fire("Error", error.message, "error");
                    });
            }
        });
    };
    
    return <tr className="hover:bg-gray-50">
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
        <td className="border space-x-5 border-gray-300 px-2 sm:px-4 py-2 ">
            <button onClick={() => handleDeletePost(_id)} className='btn btn-primary'>
                <MdCancel size={20} />
            </button>
        </td>
    </tr>
};

export default MyRequestTable;