import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import axios from 'axios';

const SignIn = () => {
    const { signIn, googleSignIn } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();


    // sign in with email and password
    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then(result => {
                try{
                    const loggedInUser = result.user;
                    console.log(loggedInUser);
                    const user = { email };
                    // get access token
                    axios.post('http://localhost:5000/jwt', user, {withCredentials: true} )
                        .then(res => {
                            console.log(res.data)
                            if (res.data.success) {
                                navigate(location?.state ? location?.state : '/')
                            }
                        })
                } catch (error){
                    console.error(' iwt error: ' , error);
                    Swal.fire('Sign in failed')
                }


            })
            .catch(error => {
                Swal.fire("Invalid email or password")
                console.log(error)
            });
    }

    // sign in wiht google
    const handleGoogleSignIn = () => {
        googleSignIn()
        .then(result => {
            console.log(result);
            try{
               
                const loggedInUser = result.user;
                console.log(loggedInUser);
                const user  =  loggedInUser.email 
              
                // get access token
                axios.post('http://localhost:5000/jwt', {user}, {withCredentials: true} )
                .then(res => {
                        console.log(res.data)
                        if (res.data.success) {
                            navigate(location?.state ? location?.state : '/')
                        }
                    })
            } catch (error){
                console.error(' iwt error: ' , error);
                Swal.fire('Sign in failed')
            }
        })
        .catch(error => console.log(error));
    }

    
    return (
        <div className="hero min-h-screen bg-base-200 w-full ">
            <div className="hero-content ">
              
                <div className="card flex-shrink-0 w-96 shadow-2xl bg-base-100">
                    <div className="card-body">
                        <h1 className="text-3xl text-center font-bold">Login</h1>
                        <form onSubmit={handleLogin}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="text" name='email' placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name='password' placeholder="password" className="input input-bordered"  required/>
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value="Login"  />
                            </div>
                        </form>
                        <button onClick={() => handleGoogleSignIn()} className='text-center w-full my-3 rounded-md py-2 border border-blue-600 hover:bg-blue-600  hover:text-white'> SignIn with Google</button>
                        <p className='my-4 text-center'>New to group study? <Link className='text-blue-600 font-bold' to="/signUp">Sign Up</Link> </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;