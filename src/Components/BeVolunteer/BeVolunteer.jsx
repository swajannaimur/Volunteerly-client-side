import React, { useContext, useState, useEffect } from 'react';
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
  const [rating, setRating] = useState(0); // Rating state for stars
  const [hoverRating, setHoverRating] = useState(0); // Hover effect

  const { data, isLoading, isError } = useQuery({
    queryKey: ['volunteerDetails', id],
    queryFn: async () => {
      const res = await fetch(`https://volunteerly-server-side.vercel.app/volunteers/${id}`);
      if (!res.ok) throw new Error('Failed to fetch volunteer post');
      return res.json();
    },
    enabled: !!id,
  });

  // Check if user has already requested this post
  useEffect(() => {
    if (!user || !id) return;
    axios
      .get(`https://volunteerly-server-side.vercel.app/myRequests?email=${user.email}`)
      .then(res => {
        const alreadyRequested = res.data.some(r => r.volunteerPostId === id);
        if (alreadyRequested) setIsRequested(true);
      })
      .catch(err => console.error(err));
  }, [user, id]);

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
    deadline,
  } = data;

  if (volunteersNeeded <= 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
        <h2 className="text-2xl font-bold text-red-600 mb-4">No Volunteers Needed</h2>
        <p className="text-lg text-gray-700 max-w-md">
          Sorry, this volunteer post has already reached its required number of volunteers.
        </p>
      </div>
    );
  }

  const handleAddVolunteer = (e) => {
    e.preventDefault();

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
      status: 'requested',
    };

    axios
      .post('https://volunteerly-server-side.vercel.app/requests', requestData)
      .then((res) => {
        if (res.data?.insertResult?.insertedId) {
          Swal.fire({
            title: 'Great!',
            text: 'Requested Successfully',
            icon: 'success',
          });
          setIsRequested(true);
        }
        form.reset();
      })
      .catch((error) => console.error(error));
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      Swal.fire({
        title: 'Oops!',
        text: 'Please select a rating before submitting.',
        icon: 'warning',
      });
      return;
    }

    const form = e.target;
    const feedbackData = {
      volunteerPostId: _id.toString(),
      volunteerName: user.displayName,
      volunteerEmail: user.email,
      feedback: form.feedback.value,
      rating: rating,
      createdAt: new Date(),
    };

    axios
      .post('https://volunteerly-server-side.vercel.app/', feedbackData)
      .then((res) => {
        if (res.data?.insertedId) {
          Swal.fire({
            title: 'Thank You!',
            text: 'Your feedback has been submitted successfully',
            icon: 'success',
          });
          setRating(0);
          setHoverRating(0);
          form.reset();
          document.getElementById('feedbackModal').close();
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="min-h-screen">
      <div className="mb-6 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-primary mt-4">Apply to Be a Volunteer</h2>
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-gray-700 my-3">
          Ready to make a positive impact? Fill out the form below to apply as a volunteer.
        </p>
      </div>

      <form
        onSubmit={handleAddVolunteer}
        className="border-2 border-primary p-4 sm:p-6 rounded-xl bg-white shadow-md"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { label: 'Thumbnail', name: 'thumbnail', value: thumbnail },
            { label: 'Post Title', name: 'postTitle', value: postTitle },
            { label: 'Description', name: 'description', value: description },
            { label: 'Location', name: 'location', value: location },
            {
              label: 'No. of Volunteers Needed',
              name: 'volunteersNeeded',
              value: volunteersNeeded,
              type: 'number',
            },
            { label: 'Organizer Name', name: 'organizerName', value: organizerName },
            {
              label: 'Organizer Email',
              name: 'organizerEmail',
              value: organizerEmail,
              type: 'email',
            },
            { label: 'Deadline', name: 'deadline', value: deadline },
            { label: 'Category', name: 'category', value: category },
          ].map((field, i) => (
            <fieldset key={i}>
              <legend className="text-sm font-bold text-secondary mb-1">{field.label}</legend>
              <input
                type={field.type || 'text'}
                readOnly
                defaultValue={field.value}
                name={field.name}
                className="input w-full border-primary border-2"
              />
            </fieldset>
          ))}

          <fieldset>
            <legend className="text-sm font-bold text-secondary mb-1">Volunteer Name</legend>
            <input
              type="text"
              readOnly
              defaultValue={user.displayName}
              name="volunteerName"
              className="input w-full border-primary border-2"
            />
          </fieldset>

          <fieldset>
            <legend className="text-sm font-bold text-secondary mb-1">Volunteer Email</legend>
            <input
              type="email"
              readOnly
              defaultValue={user.email}
              name="volunteerEmail"
              className="input w-full border-primary border-2"
            />
          </fieldset>

          <fieldset>
            <legend className="text-sm font-bold text-secondary mb-1">Suggestions</legend>
            <input
              type="text"
              name="suggestions"
              className="input w-full border-primary border-2"
              required
              placeholder="Give any feedback"
            />
          </fieldset>
        </div>

        <button
          disabled={isRequested}
          className={`btn text-base sm:text-lg font-bold mt-6 w-full ${
            isRequested ? 'btn-outline text-gray-500 cursor-not-allowed' : 'btn-primary'
          }`}
        >
          {isRequested ? 'Requested' : 'Request'}
        </button>
      </form>

      {isRequested && (
        <div className="mt-6 text-center">
          <button
            className="btn btn-secondary"
            onClick={() => document.getElementById('feedbackModal').showModal()}
          >
            Give Feedback & Rating
          </button>

          <dialog id="feedbackModal" className="modal p-0">
            <form
              onSubmit={handleFeedbackSubmit}
              className="modal-box bg-white rounded-xl p-6 flex flex-col gap-4 shadow-lg"
            >
              <h3 className="font-bold text-xl text-center mb-4">Submit Feedback & Rating</h3>

              <textarea
                name="feedback"
                required
                placeholder="Write your feedback..."
                className="border-2 border-primary rounded p-2 w-full resize-none h-24"
              />

              <div className="flex justify-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`w-8 h-8 cursor-pointer transition-colors ${
                        (hoverRating || rating) >= star ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                      />
                    </svg>
                  </button>
                ))}
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => document.getElementById('feedbackModal').close()}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </dialog>
        </div>
      )}
    </div>
  );
};

export default BeVolunteer;
