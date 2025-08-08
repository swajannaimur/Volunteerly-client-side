import React, { useEffect, useState } from 'react';
import { myPostApi } from '../../api/MyPostApi';
import Loader from '../../Components/Loader/Loader';

const MyAddedPosts = () => {
      const [myPosts, setMyPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        myPostApi()
            .then(data => {
                setMyPosts(data);
                setLoading(false);
                console.log(data);
                
            })
            .catch(error => {
                console.error('Failed to fetch requests:', error);
                setLoading(false);
            });
    }, [myPostApi]);

    if (loading) {
        return <Loader></Loader>;
    }
    return (
        <div>
            <h2>this is my Post</h2>
        </div>
    );
};

export default MyAddedPosts;