import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../Components/Loader/Loader';
import { AuthContext } from '../../contexts/AuthContexts';
import { Link } from 'react-router';

const MyAddedPosts = () => {
  const { user } = useContext(AuthContext);

  const { isLoading, isError, data: myPosts = [] } = useQuery({
    queryKey: ['myAddedPosts', user?.email],
    queryFn: async () => {
      const res = await fetch(`https://volunteerly-server-side.vercel.app/volunteers?email=${user?.email}`);
      if (!res.ok) throw new Error('Failed to fetch posts');
      return res.json();
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <Loader />;
  if (isError) return <p className="text-center text-red-500">Failed to load your posts.</p>;

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-primary mt-6">My Added Volunteer Posts</h2>
        <p className="max-w-2xl my-3 mx-auto text-gray-600">
          Manage and view all the volunteer opportunities you’ve created. You can edit or review how they appear to others.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {myPosts.length > 0 ? (
          myPosts.map((post) => {
            const {
              _id,
              thumbnail,
              postTitle,
              volunteersNeeded,
              organizerName,
              organizerEmail,
            } = post;

            return (
              <div key={_id} className="w-full max-w-sm mx-auto rounded-xl shadow-sm bg-white">
                <div className="p-4">
                  <figure className="w-full mb-4">
                    <img
                      src={thumbnail}
                      alt={postTitle}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </figure>
                  <div className="space-y-2">
                    <h2 className="text-xl font-bold">{postTitle}</h2>
                    <p className="text-base">
                      <span className="font-semibold">Volunteers Needed:</span> {volunteersNeeded}
                    </p>
                    <p className="text-base">
                      <span className="font-semibold">Organizer Name:</span> {organizerName}
                    </p>
                    <p className="text-base">
                      <span className="font-semibold">Organizer Email:</span> {organizerEmail}
                    </p>

                    <div className="text-right pt-4">
                      <Link to={`/volunteerDetails/${_id}`}>
                        <button className="btn btn-primary btn-sm">View Details</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-2xl font-semibold col-span-full text-secondary">
            No posts found.
          </p>
        )}
      </div>
    </div>
  );
};

export default MyAddedPosts;
