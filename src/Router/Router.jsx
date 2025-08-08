import {
    createBrowserRouter,
} from "react-router";
import RootLayOut from "./RootLayOut";
import Home from "../Pages/Home/Home";
import AllPosts from "../Components/AllPosts/AllPosts";
import Login from "../Components/Login/Login";
import Register from "../Components/Register/Register";
import AddVolunteer from "../Pages/AddVolunteer/AddVolunteer";
import ManagePosts from "../Pages/ManagePosts/ManagePosts";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import PrivateRoute from "../Components/PrivateRoute/PrivateRoute";
import Loader from "../Components/Loader/Loader";
import VolunteerDetails from "../Pages/VolunteerDetails/VolunteerDetails";
import BeVolunteer from "../Components/BeVolunteer/BeVolunteer";
import UpdatePage from "../Pages/UpdatePage/UpdatePage";
import MyAddedPosts from "../Pages/MyPosts/MyAddedPosts";

const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayOut,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                index: true,
                loader: () => fetch('https://volunteerly-server-side.vercel.app/volunteers'),
                hydrateFallbackElement: <Loader></Loader>,
                Component: Home
            },
            {
                path: 'allPosts',
                loader: () => fetch('https://volunteerly-server-side.vercel.app/volunteers'),
                hydrateFallbackElement: <Loader></Loader>,
                Component: AllPosts,
            },
            {
                path: 'volunteerDetails/:id',
                loader: ({ params }) => fetch(`https://volunteerly-server-side.vercel.app/volunteers/${params.id}`),
                hydrateFallbackElement: <Loader></Loader>,
                element: <PrivateRoute><VolunteerDetails></VolunteerDetails></PrivateRoute>
            },
            {
                path: '/beVolunteer/:id',
                loader: ({ params }) => fetch(`https://volunteerly-server-side.vercel.app/volunteers/${params.id}`),
                hydrateFallbackElement: <Loader></Loader>,
                Component: BeVolunteer
            },
            {
                path: 'update/:id',
                loader: ({ params }) => fetch(`https://volunteerly-server-side.vercel.app/volunteers/${params.id}`),
                hydrateFallbackElement: <Loader></Loader>,
                element: <PrivateRoute><UpdatePage></UpdatePage></PrivateRoute>
            },
            { path: 'login', Component: Login },
            { path: 'myPosts', Component: MyAddedPosts },
            { path: 'register', Component: Register },
            { path: 'addVolunteer', element: <PrivateRoute><AddVolunteer></AddVolunteer></PrivateRoute> },
            { path: 'managePosts', Component: ManagePosts },
        ]
    },
]);

export default router;