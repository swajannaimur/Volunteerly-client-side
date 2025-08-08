import React, { use, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useLoaderData } from 'react-router';
import { AuthContext } from '../../contexts/AuthContexts';
import Loader from '../../Components/Loader/Loader';
import axios from 'axios';
import { toast } from 'react-toastify';

const UpdatePage = () => {
    const dataPromise = useLoaderData()
    const { user } = use(AuthContext);

    const { _id, thumbnail, postTitle, description, location, volunteersNeeded, organizerName, organizerEmail, category, deadline } = dataPromise;

    const [selectedDate, setSelectedDate] = useState(new Date(deadline.split("/").reverse().join("-")));

    if (!user) {
        return <Loader />;
    }


    const handleAddVolunteer = e => {
        e.preventDefault()
        const form = e.target

        const updatedPost = {
            thumbnail: form.thumbnail.value,
            postTitle: form.postTitle.value,
            description: form.description.value,
            location: form.location.value,
            volunteersNeeded: parseInt(form.volunteersNeeded.value),
            organizerName: form.organizerName.value,
            organizerEmail: form.organizerEmail.value,
            deadline: selectedDate,
            category: form.category.value,
        };

        axios.put(`https://volunteerly-server-side.vercel.app/volunteers/${_id}`, updatedPost)
            .then(res => {
                if (res.data.modifiedCount) {
                    toast.success("Post Updated Successfully")
                }
            })
            .catch(error => {
                toast.error(error.message)
            })

    }

    return (
        <div className='min-h-screen px-2 sm:px-4 py-6 bg-gray-50'>
            <div className="mb-6 text-center">
                <h2 className="text-2xl sm:text-3xl font-bold text-primary mt-4">
                    Update Your Volunteer Opportunity
                </h2>
                <p className="max-w-2xl mx-auto text-sm sm:text-base text-gray-700 my-3">
                    Make any necessary changes to your volunteer opportunity details below.
                    Keeping your post up-to-date ensures interested volunteers have the latest information to join your cause and help create a positive impact.
                </p>
            </div>

            <form onSubmit={handleAddVolunteer} className='border-2 border-primary p-4 sm:p-6 rounded-xl bg-white shadow-md max-w-6xl mx-auto'>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                    <fieldset>
                        <legend className="text-sm font-bold text-secondary mb-1">Thumbnail</legend>
                        <input type="text" required defaultValue={thumbnail} name='thumbnail' className="input w-full border-primary border-2" placeholder="Thumbnail" />
                    </fieldset>

                    <fieldset>
                        <legend className="text-sm font-bold text-secondary mb-1">Post Title</legend>
                        <input type="text" required defaultValue={postTitle} name='postTitle' className="input w-full border-primary border-2" placeholder="Post Title" />
                    </fieldset>

                    <fieldset>
                        <legend className="text-sm font-bold text-secondary mb-1">Description</legend>
                        <input type="text" required defaultValue={description} name='description' className="input w-full border-primary border-2" placeholder="Description" />
                    </fieldset>

                    <fieldset>
                        <legend className="text-sm font-bold text-secondary mb-1">Location</legend>
                        <input type="text" required defaultValue={location} name='location' className="input w-full border-primary border-2" placeholder="Location" />
                    </fieldset>

                    <fieldset>
                        <legend className="text-sm font-bold text-secondary mb-1">No. of Volunteers Needed</legend>
                        <input type="number" required defaultValue={volunteersNeeded} name='volunteersNeeded' className="input w-full border-primary border-2" placeholder="Number of volunteers" />
                    </fieldset>

                    <fieldset>
                        <legend className="text-sm font-bold text-secondary mb-1">Organizer Name</legend>
                        <input type="text" readOnly defaultValue={organizerName} required name='organizerName' className="input w-full border-primary border-2" placeholder="Organizer name" />
                    </fieldset>

                    <fieldset>
                        <legend className="text-sm font-bold text-secondary mb-1">Organizer Email</legend>
                        <input type="email" readOnly defaultValue={organizerEmail} required name='organizerEmail' className="input w-full border-primary border-2" placeholder="Organizer email" />
                    </fieldset>

                    <fieldset>
                        <legend className="text-sm font-bold text-secondary mb-1">Deadline</legend>
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date) => {
                                setSelectedDate(date)
                                console.log(date);
                            }}
                            className="input w-full border-primary border-2"
                            placeholderText="Select a deadline"
                            dateFormat="dd/MM/yyyy"
                            isClearable
                            required
                        />
                    </fieldset>

                    <fieldset>
                        <legend className="text-sm font-bold text-secondary mb-1">Category</legend>
                        <select name="category" className="select select-bordered w-full border-primary border-2" defaultValue={category} required>
                            <option value="" disabled>Select a category</option>
                            <option value="healthcare">Healthcare</option>
                            <option value="education">Education</option>
                            <option value="social-service">Social Service</option>
                            <option value="animal-welfare">Animal Welfare</option>
                        </select>
                    </fieldset>
                </div>
                <button className="btn btn-primary text-base sm:text-lg font-bold mt-6 w-full">
                    Update Post
                </button>
            </form>
        </div>
    );

};

export default UpdatePage;