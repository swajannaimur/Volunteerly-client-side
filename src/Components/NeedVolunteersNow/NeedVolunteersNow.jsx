import React from 'react';
import SingleNeed from './SingleNeed';

const NeedVolunteersNow = ({ postsPromise }) => {

    return (
        <div className='grid grid-cols-3 gap-4'>
            {
                postsPromise.map(post => <SingleNeed post={post} key={post._id}></SingleNeed>)
            }
        </div>
    );
};

export default NeedVolunteersNow;