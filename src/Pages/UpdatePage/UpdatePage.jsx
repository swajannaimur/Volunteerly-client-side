import React, { useState, useContext } from 'react';
import DatePicker from 'react-datepicker';
import { useParams } from 'react-router';
import { AuthContext } from '../../contexts/AuthContexts';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../Components/Loader/Loader';
import axios from 'axios';
import { toast } from 'react-toastify';

const UpdatePage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Fetch post data by id using React Query
  const { data, isLoading, isError } = useQuery({
    queryKey: ['volunteerPost', id],
    queryFn: async () => {
      const res = await fetch(`https://volunteerly-server-side.vercel.app/volunteers/${id}`);
      if (!res.ok) throw new Error('Failed to fetch post data');
      return res.json();
    },
    enabled: !!id,
    onSuccess: (post) => {
      // Set initial date when data is loaded
      if (post.deadline) {
        const parts = post.deadline.split("/").reverse().join("-");
        setSelectedDate(new Date(parts));
      }
    },
  });

  if (isLoading) return <Loader />;
  if (isError) return <p className="text-center text-red-500">Failed to load post data.</p>;
  if (!user) return <Loader />;

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

  const handleUpdatePost = e => {
    e.preventDefault();
    const form = e.target;

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
          toast.success("Post Updated Successfully");
        }
      })
      .catch(error => {
        toast.error(error.message);
      });
  };

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

      <form onSubmit={handleUpdatePost} className='border-2 border-primary p-4 sm:p-6 rounded-xl bg-white shadow-md max-w-6xl mx-auto'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {[
            { label: "Thumbnail", name: "thumbnail", value: thumbnail },
            { label: "Post Title", name: "postTitle", value: postTitle },
            { label: "Description", name: "description", value: description },
            { label: "Location", name: "location", value: location },
            { label: "No. of Volunteers Needed", name: "volunteersNeeded", value: volunteersNeeded, type: "number" },
            { label: "Organizer Name", name: "organizerName", value: organizerName, readOnly: true },
            { label: "Organizer Email", name: "organizerEmail", value: organizerEmail, type: "email", readOnly: true }
          ].map((field, i) => (
            <fieldset key={i}>
              <legend className="text-sm font-bold text-secondary mb-1">{field.label}</legend>
              <input
                type={field.type || "text"}
                readOnly={field.readOnly || false}
                required
                defaultValue={field.value}
                name={field.name}
                className="input w-full border-primary border-2"
              />
            </fieldset>
          ))}

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
