import { useState, useEffect } from 'react';
import VolunteerCard from '../VolunteerCard/VolunteerCard';
import Loader from '../Loader/Loader';
import { FaSearch, FaTable } from 'react-icons/fa';
import AllPostsTable from '../AllPostsTable/AllPostsTable';
import { FiGrid } from "react-icons/fi";


const AllPosts = () => {
    const [searchText, setSearchText] = useState('');
    const [volunteers, setVolunteers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [viewMode, setViewMode] = useState('card'); // 'card' or 'table'

    const fetchVolunteers = async (query = '') => {
        setLoading(true);
        try {
            const res = await fetch(`https://volunteerly-server-side.vercel.app/volunteers?search=${query}`);
            const data = await res.json();
            setVolunteers(data);
        } catch (err) {
            console.error('Failed to fetch volunteers:', err);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchVolunteers();
    }, []);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchText(value);
        fetchVolunteers(value);
    };

    return (
        <div className='min-h-screen px-4 py-8'>
            <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold text-primary mt-6">Explore Volunteer Opportunities</h2>
                <p className="max-w-2xl my-3 mx-auto text-gray-600">
                    Discover meaningful volunteer opportunities posted by passionate organizers. Whether you're looking to support a cause in healthcare, education, social service, or animal welfare — your time and skills can create real impact.
                </p>

                {/* Search */}
                <div className="relative w-full max-w-md mx-auto mt-4 mb-4">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaSearch className="text-secondary text-lg" />
                    </span>
                    <input
                        type="text"
                        value={searchText}
                        onChange={handleSearchChange}
                        placeholder="Search by post title..."
                        className="w-full border-2 border-primary rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                <div className="flex justify-center space-x-4 mt-2">
                    <button
                        className={`px-4 py-2 rounded-md font-medium ${viewMode === 'card' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => setViewMode('card')}
                    >
                        <FiGrid size={22}/>
                    </button>

                    <button
                        className={`px-4 py-2 rounded-md font-medium ${viewMode === 'table' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => setViewMode('table')}
                    >
                      <FaTable size={22}></FaTable>
                    </button>
                </div>
            </div>

            {loading ? (
                <Loader />
            ) : viewMode === 'card' ? (
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {volunteers.length > 0 ? (
                        volunteers.map(volunteer => (
                            <VolunteerCard key={volunteer._id} volunteer={volunteer} />
                        ))
                    ) : (
                        <p className="text-center text-2xl font-semibold col-span-full text-secondary">No posts found.</p>
                    )}
                </div>
            ) : (
                <div className="overflow-x-auto mt-6">
                    <table className="min-w-full border border-gray-300 rounded-lg shadow-md text-sm sm:text-base">
                        <thead className="bg-secondary text-white">
                            <tr className="text-left">
                                <th className="border border-gray-300 px-2 sm:px-4 py-2">SL No.</th>
                                <th className="border border-gray-300 px-2 sm:px-4 py-2">Thumbnail</th>
                                <th className="border border-gray-300 px-2 sm:px-4 py-2">Post Title</th>
                                <th className="border border-gray-300 px-2 sm:px-4 py-2">Volunteer's Need</th>
                                <th className="border border-gray-300 px-2 sm:px-4 py-2">Organizer Name</th>
                                <th className="border border-gray-300 px-2 sm:px-4 py-2">Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {volunteers.map((volunteer, index) => (
                                <AllPostsTable
                                    key={volunteer._id}
                                    index={index}
                                    volunteer={volunteer}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AllPosts;
