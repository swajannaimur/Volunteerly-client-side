import React, { useContext, useState } from 'react';
import { useParams } from 'react-router';
import { AuthContext } from '../../contexts/AuthContexts';
import { useQuery } from '@tanstack/react-query';
import Loader from '../Loader/Loader';
import Swal from 'sweetalert2';
import axios from 'axios';

const BeVolunteer = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [isRequested, setIsRequested] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['volunteerDetails', id],
    queryFn: async () => {
      const res = await fetch(`https://volunteerly-server-side.vercel.app/volunteers/${id}`);
      if (!res.ok) throw new Error('Failed to fetch volunteer post');
      return res.json();
    },
    enabled: !!id,
  });

  if (isLoading) return <Loader />;
  if (isError) return <p className="text-center text-red-500">Failed to load volunteer post.</p>;
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
          {/* Read-only volunteer post fields */}
          {[
            { label: "Thumbnail", name: "thumbnail", value: thumbnail },
            { label: "Post Title", name: "postTitle", value: postTitle },
            { label: "Description", name: "description", value: description },
            { label: "Location", name: "location", value: location },
            { label: "No. of Volunteers Needed", name: "volunteersNeeded", value: volunteersNeeded, type: "number" },
            { label: "Organizer Name", name: "organizerName", value: organizerName },
            { label: "Organizer Email", name: "organizerEmail", value: organizerEmail, type: "email" },
            { label: "Deadline", name: "deadline", value: deadline },
            { label: "Category", name: "category", value: category }
          ].map((field, i) => (
            <fieldset key={i}>
              <legend className="text-sm font-bold text-secondary mb-1">{field.label}</legend>
              <input
                type={field.type || "text"}
                readOnly
                defaultValue={field.value}
                name={field.name}
                className="input w-full border-primary border-2"
              />
            </fieldset>
          ))}

          {/* Request input fields */}
          <fieldset>
            <legend className="text-sm font-bold text-secondary mb-1">Volunteer Name</legend>
            <input type="text" readOnly defaultValue={user.displayName} name='volunteerName' className="input w-full border-primary border-2" />
          </fieldset>

          <fieldset>
            <legend className="text-sm font-bold text-secondary mb-1">Volunteer Email</legend>
            <input type="email" readOnly defaultValue={user.email} name='volunteerEmail' className="input w-full border-primary border-2" />
          </fieldset>

          <fieldset>
            <legend className="text-sm font-bold text-secondary mb-1">Suggestions</legend>
            <input type="text" name='suggestions' className="input w-full border-primary border-2" required placeholder="Give any feedback" />
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
