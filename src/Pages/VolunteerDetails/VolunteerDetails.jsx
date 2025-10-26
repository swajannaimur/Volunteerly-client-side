import React from 'react';
import { useParams, Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../Components/Loader/Loader';


const VolunteerDetails = () => {
  const { id } = useParams();

  const { data: details, isLoading, isError } = useQuery({
    queryKey: ['volunteerDetails', id],
    queryFn: async () => {
      const res = await fetch(`https://volunteerly-server-side.vercel.app/volunteers/${id}`);
      if (!res.ok) throw new Error('Failed to fetch volunteer details');
      return res.json();
    },
    enabled: !!id,
  });

  if (isLoading) return <Loader></Loader>
  if (isError) return <p className="text-center text-red-500">Failed to load volunteer details.</p>;

  const { _id, thumbnail, postTitle, description, location, volunteersNeeded, organizerName, organizerEmail, category, deadline } = details;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10">
        <img
          src={thumbnail}
          alt={postTitle}
          className="w-full h-64 object-cover rounded-xl mb-6"
        />
        <h2 className="text-3xl font-bold text-primary mb-4">{postTitle}</h2>
        <p className="text-gray-700 text-lg mb-6">{description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <p className="text-primary text-lg font-bold">Category</p>
            <p className="font-semibold">{category}</p>
          </div>
          <div>
            <p className="text-primary text-lg font-bold">Location</p>
            <p className="font-semibold">{location}</p>
          </div>
          <div>
            <p className="text-primary text-lg font-bold">Volunteers Needed</p>
            <p className="font-semibold">{volunteersNeeded}</p>
          </div>
          <div>
            <p className="text-primary text-lg font-bold">Deadline</p>
            <p className="font-semibold">
              {new Date(deadline).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-primary text-lg font-bold">Organizer Name</p>
            <p className="font-semibold">{organizerName}</p>
          </div>
          <div>
            <p className="text-primary text-lg font-bold">Organizer Email</p>
            <p className="font-semibold">{organizerEmail}</p>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link to={`/beVolunteer/${_id}`}>
            <button className='btn btn-primary text-lg'>Be a Volunteer</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VolunteerDetails;
