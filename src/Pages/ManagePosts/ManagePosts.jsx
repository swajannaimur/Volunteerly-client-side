import React, { Suspense, use } from 'react';
import MyPost from '../../Components/MyPost/MyPost';
import { myPostApi } from '../../api/MyPostApi';
import { AuthContext } from '../../contexts/AuthContexts';
import Loader from '../../Components/Loader/Loader';
import MyRequest from '../../Components/MyRequest/MyRequest';
import { myRequestApi } from '../../api/MyRequestApi';

const ManagePosts = () => {
    const { user } = use(AuthContext)

    if (!user) {
        return <Loader></Loader>
    }

    return (
        <div className='min-h-screen px-4 py-8'>
            <div>
                <MyPost myPostApi={() => myPostApi(user.email, user.accessToken)}></MyPost>
            </div>

            <div>
                <MyRequest myRequestApi={() => myRequestApi(user.email)} />
            </div>

        </div>
    );
};

export default ManagePosts;