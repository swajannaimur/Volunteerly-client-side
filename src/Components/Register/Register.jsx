import React, { use } from 'react';
import { AuthContext } from '../../contexts/AuthContexts';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import lottieRegister from '../../assets/Lotties/Register.json';
import Lottie from 'lottie-react';
import { Link, useNavigate } from 'react-router';

const Register = () => {
    const { createUser } = use(AuthContext);
    const navigate = useNavigate()

    const handleRegister = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        const photo = form.photoUrl.value
        const name = form.name.value

        // const passValidation = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        // if (!passValidation.test(password)) {
        //     toast.error('Password must contain an uppercase, a lowercase, and be at least 6 characters');
        //     return;
        // }

        createUser(email, password, name, photo)
            .then(res => {
                navigate(`${location.state ? location.state : '/'}`)
                Swal.fire({
                    title: "Great!",
                    text: "Account has been created",
                    icon: "success"
                });
                form.reset();
            })
            .catch(error => {
                toast.error(error.message);
            });
    };

    return (
        <div className="min-h-screen bg-base-200 flex flex-col items-center px-4 pt-10">

            <h2 className="text-4xl font-extrabold text-primary text-center mb-8">
                Register Now
            </h2>

            <div className="flex flex-col-reverse lg:flex-row justify-center items-center gap-10 w-full max-w-6xl">

                <div className="w-full max-w-md bg-base-100 p-8 rounded-lg shadow-md">
                    <form onSubmit={handleRegister} className="space-y-4">
                        <div>
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name="name" className="input input-bordered w-full" placeholder="Enter your name" required />
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input type="text" name="photoUrl" className="input input-bordered w-full" placeholder="Enter your photo URL" required />
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" className="input input-bordered w-full" placeholder="Enter your email" required />
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" className="input input-bordered w-full" placeholder="Enter your password" required />
                        </div>

                        <div>
                            <h2>Already have an account? <Link to='/login'><span className='text-blue-500 underline'>Login now</span></Link></h2>
                        </div>

                        <div className="mt-6">
                            <button type="submit" className="btn btn-primary text-lg w-full">
                                Register
                            </button>
                        </div>
                    </form>
                </div>

                <div className="w-full lg:w-1/2 max-w-md">
                    <Lottie animationData={lottieRegister} loop={true} />
                </div>
            </div>
        </div>
    );
};

export default Register;
