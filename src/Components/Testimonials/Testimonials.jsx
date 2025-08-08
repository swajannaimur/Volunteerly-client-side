import React from 'react';

const Testimonials = () => {
    return (
        <div className="mb-12 px-4 md:px-16 ">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <div className="card  shadow-md border border-base-300">
                    <div className="card-body">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="avatar">
                                <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img src="https://i.pravatar.cc/100?img=32" alt="User" />
                                </div>
                            </div>
                            <div>
                                <h3 className="font-semibold text-2xl text-primary">Ayesha R.</h3>
                                <p className="text-lg text-secondary">Volunteer</p>
                            </div>
                        </div>
                        <p className="text-md font-semibold mb-2">
                            “Volunteering through this platform has been a rewarding experience. The posts are clear and easy to apply for!”
                        </p>
                        <div className="rating">
                            <input type="radio" name="rating-1" className="mask mask-star-2 bg-orange-400" checked readOnly />
                            <input type="radio" name="rating-1" className="mask mask-star-2 bg-orange-400" checked readOnly />
                            <input type="radio" name="rating-1" className="mask mask-star-2 bg-orange-400" checked readOnly />
                            <input type="radio" name="rating-1" className="mask mask-star-2 bg-orange-400" checked readOnly />
                            <input type="radio" name="rating-1" className="mask mask-star-2 bg-orange-400" readOnly />
                        </div>
                    </div>
                </div>

                <div className="card  shadow-md border border-base-300">
                    <div className="card-body">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="avatar">
                                <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img src="https://i.pravatar.cc/100?img=48" alt="User" />
                                </div>
                            </div>
                            <div>
                                <h3 className="font-semibold text-2xl text-primary">Jonathan K.</h3>
                                <p className="text-lg text-secondary">Organizer</p>
                            </div>
                        </div>
                        <p className="text-md font-semibold mb-2">
                            “The platform helped me find passionate volunteers quickly. Managing posts is simple and effective.”
                        </p>
                        <div className="rating">
                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" checked readOnly />
                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" checked readOnly />
                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" checked readOnly />
                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" checked readOnly />
                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" checked readOnly />
                        </div>
                    </div>
                </div>

                <div className="card  shadow-md border border-base-300">
                    <div className="card-body">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="avatar">
                                <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img src="https://i.pravatar.cc/100?img=15" alt="User" />
                                </div>
                            </div>
                            <div>
                                <h3 className="font-semibold text-2xl text-primary">Neha S.</h3>
                                <p className="text-lg text-secondary">Community Member</p>
                            </div>
                        </div>
                        <p className="text-md font-semibold mb-2">
                            “Finding volunteer opportunities that fit my schedule has never been easier. Highly recommended!”
                        </p>
                        <div className="rating">
                            <input type="radio" name="rating-3" className="mask mask-star-2 bg-orange-400" checked readOnly />
                            <input type="radio" name="rating-3" className="mask mask-star-2 bg-orange-400" checked readOnly />
                            <input type="radio" name="rating-3" className="mask mask-star-2 bg-orange-400" checked readOnly />
                            <input type="radio" name="rating-3" className="mask mask-star-2 bg-orange-400" checked readOnly />
                            <input type="radio" name="rating-3" className="mask mask-star-2 bg-orange-400" checked readOnly />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Testimonials;
