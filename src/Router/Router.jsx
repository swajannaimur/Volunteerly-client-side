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
                Component: Home
            },
            {
                path: 'allPosts',
                Component: AllPosts,
            },
            {
                path: 'volunteerDetails/:id',
                element: <PrivateRoute><VolunteerDetails></VolunteerDetails></PrivateRoute>
            },
            {
                path: '/beVolunteer/:id',
                Component: BeVolunteer
            },
            {
                path: 'update/:id',
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