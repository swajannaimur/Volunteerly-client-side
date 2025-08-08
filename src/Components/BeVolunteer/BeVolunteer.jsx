import React, { useContext, useState } from 'react';
import { useLoaderData } from 'react-router';
import { AuthContext } from '../../contexts/AuthContexts';
import Loader from '../Loader/Loader';
import Swal from 'sweetalert2';
import axios from 'axios';

const BeVolunteer = () => {
    const data = useLoaderData();
    const { user } = useContext(AuthContext);
    const [isRequested, setIsRequested] = useState(false);
    const {
        _id,
        thumbnail,
        postTitle,
        description,
        location,
        volunteersNeeded,
        organizerName,
        organizerEmail,
        category,
        deadline
    } = data;

    if (!user) {
        return <Loader />;
    }

    
    if (volunteersNeeded <= 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
                <h2 className="text-2xl font-bold text-red-600 mb-4">No Volunteers Needed</h2>
                <p className="text-lg text-gray-700 max-w-md">
                    Sorry, this volunteer post has already reached its required number of volunteers.
                    You cannot request to be a volunteer at this time.
                </p>
            </div>
        );
    }

    const handleAddVolunteer = (e) => {
        e.preventDefault();

        if (volunteersNeeded <= 0) {
            Swal.fire({
                icon: "error",
                title: "Oops!",
                text: "No volunteers are needed for this post currently.",
            });
            return;
        }

        const form = e.target;
        const requestData = {
            thumbnail: form.thumbnail.value,
            postTitle: form.postTitle.value,
            description: form.description.value,
            location: form.location.value,
            volunteersNeeded: parseInt(form.volunteersNeeded.value),
            organizerName: form.organizerName.value,
            organizerEmail: form.organizerEmail.value,
            category: form.category.value,
            deadline: form.deadline.value,
            volunteerPostId: _id.toString(),
            volunteerName: form.volunteerName.value,
            volunteerEmail: form.volunteerEmail.value,
            suggestions: form.suggestions.value,
            status: 'requested'
        };

        axios.post('https://volunteerly-server-side.vercel.app/requests', requestData)
            .then((res) => {
                if (res.data?.insertResult?.insertedId) {
                    Swal.fire({
                        title: "Great!",
                        text: "Requested Successfully",
                        icon: "success"
                    });
                    setIsRequested(true);
                }
                form.reset();
            }).catch(error => {
                console.error(error);
            });
    };

    return (
        <div className='min-h-screen'>
            <div className="mb-6 text-center">
                <h2 className="text-2xl sm:text-3xl font-bold text-primary mt-4">Apply to Be a Volunteer</h2>
                <p className="max-w-2xl mx-auto text-sm sm:text-base text-gray-700 my-3">
                    Ready to make a positive impact? Fill out the form below to apply as a volunteer. Your dedication can bring meaningful change to the community and support those who need it most.
                </p>
            </div>

            <form onSubmit={handleAddVolunteer} className='border-2 border-primary p-4 sm:p-6 rounded-xl bg-white shadow-md'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    <fieldset>
                        <legend className="text-sm font-bold text-secondary mb-1">Thumbnail</legend>
                        <input type="text" readOnly defaultValue={thumbnail} name='thumbnail' className="input w-full border-primary border-2" placeholder="Thumbnail" />
                    </fieldset>

                    <fieldset>
                        <legend className="text-sm font-bold text-secondary mb-1">Post Title</legend>
                        <input type="text" readOnly defaultValue={postTitle} name='postTitle' className="input w-full border-primary border-2" placeholder="Post Title" />
                    </fieldset>

                    <fieldset>
                        <legend className="text-sm font-bold text-secondary mb-1">Description</legend>
                        <input type="text" readOnly defaultValue={description} name='description' className="input w-full border-primary border-2" placeholder="Description" />
                    </fieldset>

                    <fieldset>
                        <legend className="text-sm font-bold text-secondary mb-1">Location</legend>
                        <input type="text" readOnly defaultValue={location} name='location' className="input w-full border-primary border-2" placeholder="Location" />
                    </fieldset>

                    <fieldset>
                        <legend className="text-sm font-bold text-secondary mb-1">No. of Volunteers Needed</legend>
                        <input type="number" readOnly defaultValue={volunteersNeeded} name='volunteersNeeded' className="input w-full border-primary border-2" placeholder="Number of volunteers" />
                    </fieldset>

                    <fieldset>
                        <legend className="text-sm font-bold text-secondary mb-1">Organizer Name</legend>
                        <input type="text" readOnly defaultValue={organizerName} name='organizerName' className="input w-full border-primary border-2" placeholder="Organizer name" />
                    </fieldset>

                    <fieldset>
                        <legend className="text-sm font-bold text-secondary mb-1">Organizer Email</legend>
                        <input type="email" readOnly defaultValue={organizerEmail} name='organizerEmail' className="input w-full border-primary border-2" placeholder="Organizer email" />
                    </fieldset>

                    <fieldset>
                        <legend className="text-sm font-bold text-secondary mb-1">Deadline</legend>
                        <input type="text" readOnly defaultValue={deadline} name="deadline" className="input w-full border-primary border-2" placeholder="Deadline" />
                    </fieldset>

                    <fieldset>
                        <legend className="text-sm font-bold text-secondary mb-1">Category</legend>
                        <input type="text" readOnly defaultValue={category} name="category" className="input w-full border-primary border-2" placeholder="Category" />
                    </fieldset>

                    {/* request input field */}
                    <fieldset>
                        <legend className="text-sm font-bold text-secondary mb-1">Volunteer Name</legend>
                        <input type="text" readOnly defaultValue={user.displayName} name='volunteerName' className="input w-full border-primary border-2" placeholder="Volunteer name" />
                    </fieldset>

                    <fieldset>
                        <legend className="text-sm font-bold text-secondary mb-1">Volunteer Email</legend>
                        <input type="email" readOnly defaultValue={user.email} name='volunteerEmail' className="input w-full border-primary border-2" placeholder="Volunteer email" />
                    </fieldset>

                    <fieldset>
                        <legend className="text-sm font-bold text-secondary mb-1">Suggestions</legend>
                        <input type="text" name='suggestions' className="input w-full border-primary border-2" required placeholder="Give any feedback " />
                    </fieldset>
                </div>

                <button
                    disabled={isRequested}
                    className="btn btn-primary text-base sm:text-lg font-bold mt-6 w-full"
                >
                    Request
                </button>
            </form>
        </div>
    );
};

export default BeVolunteer;
