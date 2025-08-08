import axios from 'axios';
import React, { use, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AuthContext } from '../../contexts/AuthContexts';
import Loader from '../../Components/Loader/Loader';
import Swal from 'sweetalert2';

const AddVolunteer = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const { user } = use(AuthContext);

    if (!user) {
        return <Loader />;
    }

    const handleAddVolunteer = e => {
        e.preventDefault();
        const form = e.target;
        const data = {
            thumbnail: form.thumbnail.value,
            postTitle: form.postTitle.value,
            description: form.description.value,
            location: form.location.value,
            volunteersNeeded: parseInt(form.volunteersNeeded.value),
            organizerName: form.organizerName.value,
            organizerEmail: form.organizerEmail.value,
            category: form.category.value,
            deadline: selectedDate.toISOString()

        };
        console.log(data);


        axios.post('https://volunteerly-server-side.vercel.app/volunteers', data)
            .then((res) => {
                if (res.data.insertedId) {
                    Swal.fire({
                        title: "Great!",
                        text: "Post Added Successfully",
                        icon: "success"
                    });
                }
                console.log(res.data);
                form.reset();
            }).catch(error => {
                console.log(error);
            });
    };

    return (
        <div className='min-h-screen px-4 py-8'>
            <div className="mb-6 text-center">
                <h2 className="text-2xl sm:text-3xl font-bold text-primary mt-4">Post a Volunteer Opportunity</h2>
                <p className="max-w-2xl mx-auto text-sm sm:text-base text-gray-700 my-3">
                    Help make a difference by posting your volunteer opportunity. Fill out the form below with all the necessary details so passionate individuals can join your cause. Your efforts can inspire meaningful change in your community.
                </p>
            </div>

            <form onSubmit={handleAddVolunteer} className='border-2 border-primary p-4 sm:p-6 rounded-xl bg-white shadow-md'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>

                    <fieldset>
                        <legend className="text-sm font-bold text-secondary mb-1">Thumbnail</legend>
                        <input type="text" required name='thumbnail' className="input w-full border-primary border-2" placeholder="Thumbnail" />
                    </fieldset>

                    <fieldset>
                        <legend className="text-sm font-bold text-secondary mb-1">Post Title</legend>
                        <input type="text" required name='postTitle' className="input w-full border-primary border-2" placeholder="Post Title" />
                    </fieldset>

                    <fieldset>
                        <legend className="text-sm font-bold text-secondary mb-1">Description</legend>
                        <input type="text" required name='description' className="input w-full border-primary border-2" placeholder="Description" />
                    </fieldset>

                    <fieldset>
                        <legend className="text-sm font-bold text-secondary mb-1">Location</legend>
                        <input type="text" required name='location' className="input w-full border-primary border-2" placeholder="Location" />
                    </fieldset>

                    <fieldset>
                        <legend className="text-sm font-bold text-secondary mb-1">No. of Volunteers Needed</legend>
                        <input type="number" required name='volunteersNeeded' className="input w-full border-primary border-2" placeholder="Number of volunteers" />
                    </fieldset>

                    <fieldset>
                        <legend className="text-sm font-bold text-secondary mb-1">Organizer Name</legend>
                        <input type="text" readOnly defaultValue={user.displayName || ''} required name='organizerName' className="input w-full border-primary border-2" placeholder="Organizer name" />
                    </fieldset>

                    <fieldset>
                        <legend className="text-sm font-bold text-secondary mb-1">Organizer Email</legend>
                        <input type="email" readOnly defaultValue={user.email || ''} required name='organizerEmail' className="input w-full border-primary border-2" placeholder="Organizer email" />
                    </fieldset>

                    <fieldset>
                        <legend className="text-sm font-bold text-secondary mb-1">Deadline</legend>
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            className="input w-full border-primary border-2"
                            placeholderText="Select a deadline"
                            dateFormat="dd/MM/yyyy"
                            isClearable
                            required
                        />
                    </fieldset>

                    <fieldset>
                        <legend className="text-sm font-bold text-secondary mb-1">Category</legend>
                        <select name="category" className="select select-bordered w-full border-primary border-2" defaultValue="" required>
                            <option value="" disabled>Select a category</option>
                            <option value="healthcare">Healthcare</option>
                            <option value="education">Education</option>
                            <option value="social-service">Social Service</option>
                            <option value="animal-welfare">Animal Welfare</option>
                        </select>
                    </fieldset>
                </div>

                <button className="btn btn-primary text-base sm:text-lg font-bold mt-6 w-full">Add Post</button>
            </form>
        </div>
    );
};

export default AddVolunteer;
