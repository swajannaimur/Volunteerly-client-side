import React from 'react';

const Faq = () => {
    return (
        <div>
            <div className="space-y-4">
                <div className="collapse collapse-arrow bg-base-100 border-2 border-primary">
                    <input type="radio" name="faq-accordion" />
                    <div className="collapse-title text-primary font-bold">
                        How do I apply to volunteer for a post?
                    </div>
                    <div className="collapse-content font-semibold text-md">
                        Browse volunteer opportunities, click on a post, and then submit your application through the provided form.
                    </div>
                </div>

                <div className="collapse collapse-arrow bg-base-100 border-2 border-primary">
                    <input type="radio" name="faq-accordion" />
                    <div className="collapse-title text-primary font-bold">
                        Can I volunteer remotely?
                    </div>
                    <div className="collapse-content font-semibold text-md">
                        Some volunteer opportunities allow remote participation. Check each post’s details to see if remote volunteering is possible.
                    </div>
                </div>

                <div className="collapse collapse-arrow bg-base-100 border-2 border-primary">
                    <input type="radio" name="faq-accordion" />
                    <div className="collapse-title text-primary font-bold">
                        How do I create a volunteer post as an organizer?
                    </div>
                    <div className="collapse-content font-semibold text-md">
                        Register as an organizer and use the “Add Volunteer Post” option to create and share your volunteer opportunities.
                    </div>
                </div>

                <div className="collapse collapse-arrow bg-base-100 border-2 border-primary">
                    <input type="radio" name="faq-accordion" />
                    <div className="collapse-title text-primary font-bold">
                        Is volunteering free? Are there any fees involved?
                    </div>
                    <div className="collapse-content font-semibold text-md">
                        Yes, volunteering through our platform is completely free. There are no charges or fees to participate.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Faq;
