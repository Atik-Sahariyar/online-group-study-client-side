import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const SignUp = () => {
    const [weakPassword, setWeakPassword] = useState(null);
    const { createUser, googleSignIn } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure()

    //    new user create function


    const handleRegistration = async (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const name = form.get('name');
        const imgURL = form.get('photo');
        const email = form.get('email');
        const password = form.get('password');

        const userInfo = { name, imgURL, email, password };

        if (password.length < 6 || !/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
            const message = 'Password must be at least 6 characters long and contain both lowercase and uppercase letters.';
            setWeakPassword(message);
            return;
        }

        try {
            await createUser(email, password);

            const response = await axiosSecure.post('/users', userInfo )

            if (response.status === 201) {
                Swal.fire('Registration successful!');
                navigate(location?.state ? location.state : '/');
            } else if (response.status === 400) {
                Swal.fire('Email address is already in use. Please choose a different email.');
            } else {
                Swal.fire('Registration failed. Please try again later.');
            }
        } catch (error) {
            console.error(error);
            Swal.fire('Registration failed. Please try again later.');
        }
    };

    // sign up with google
    const handleGoogleRegister = async () => {
        try {
            const result = await googleSignIn();
            console.log(result);
            navigate(location?.state ? location.state : '/');
            const name = await result.user.displayName;
            const email = await result.user.email;
            const imgURL = await result.user.photoURL;
            const password = '';

            const userInfo = { name, imgURL, email, password };
            console.log(userInfo);
            const response = await axiosSecure.post('/users', userInfo )
            console.log(response.data);

            Swal.fire('Registration successful!');
            
        } catch (error) {
            console.error(error);

        }
    };
   
    return (
        <div className="text-center">

            <h3 className="text-3xl my-8">Please registration</h3>
            <form onSubmit={handleRegistration} className=" mx-auto w-1/2">
                {
                    weakPassword ? <p className="text-red-600">{weakPassword}</p> : ''
                }
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" name="name" placeholder="your name" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Photo URL</span>
                    </label>
                    <input type="text" name="photo" placeholder="photo URL" className="input input-bordered" required />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password" placeholder="password" name="password" className="input input-bordered" required />

                    <label className="label">
                        <a href="#" className="label-text-alt link link-hover ">Forgot password?</a>
                    </label>
                </div>
                <div>
                    <button className="py-2 rounded-lg btn-primary w-full">Sign Up</button>
                </div>
            </form>
            <div>
                <p>---------- Or -----------</p>
                <button type="button" onClick={() => handleGoogleRegister()} className=" text-blue-600 underline border w-1/2 mx-auto py-1 rounded-md hover:bg-gray-400">SignUp with Google</button>
            </div>
            <p className=" mt-2">Already have an account <Link to="/signIn"><span className=" text-blue-700 underline">Lgoin</span></Link></p>
        </div>
    );
};

export default SignUp;