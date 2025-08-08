import React, { use } from 'react';
import { AuthContext } from '../../contexts/AuthContexts';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import lottieLogin from '../../assets/Lotties/Secure Login.json';
import Lottie from 'lottie-react';
import { Link, useNavigate } from 'react-router';


const Login = () => {
    const { signIn, googleSignIn } = use(AuthContext);
    const navigate = useNavigate()

    const handleLogin = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then(res => {
                navigate(`${location.state ? location.state : '/'}`)
                Swal.fire({
                    title: "Great!",
                    text: "Successfully logged In",
                    icon: "success"
                });
                form.reset();
            })
            .catch(error => {
                toast.error(error.message);
            });
    };
    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                navigate(`${location.state ? location.state : '/'}`)
                Swal.fire({
                    title: "Logged In Successfully",
                    icon: "success",
                    draggable: true
                });
            })
            .catch(error => {
                toast.error(error.message)
            })
    }

    return (
        <div className="min-h-screen bg-base-200 flex flex-col items-center px-4 pt-10">

            <h2 className="text-4xl font-extrabold text-center text-primary mb-8">
                Login Now
            </h2>

            <div className="flex flex-col-reverse lg:flex-row justify-center items-center gap-10 w-full max-w-6xl">
                {/* Login Form */}
                <div className="w-full max-w-md bg-base-100 p-8 rounded-lg shadow-md">
                    <form onSubmit={handleLogin} className="space-y-4">
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
                            <h2>New to this site? <Link to='/register'><span className='text-blue-500 underline'>Register now</span></Link></h2>
                        </div>

                        <div className="mt-6 space-y-3">
                            <button type="submit" className="btn btn-primary text-lg w-full">
                                Login
                            </button>
                            <button onClick={handleGoogleSignIn} className="btn bg-white  text-black text-lg border-primary w-full">
                                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                                Login with Google
                            </button>
                        </div>
                    </form>
                </div>

                {/* Lottie Animation */}
                <div className="w-full lg:w-1/2 max-w-md">
                    <Lottie animationData={lottieLogin} loop={true} />
                </div>
            </div>
        </div>
    );
};

export default Login;
