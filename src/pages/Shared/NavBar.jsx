import { Link, NavLink } from "react-router-dom";
// import useAuth from "../../hooks/useAuth";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const NavBar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [userName, setUserName] = useState('')
    const [userPhoto, setUserPhoto] = useState('')


    useEffect(() => {
        if (user) {
            const { displayName, photoURL } = user;
            setUserName(displayName);
            setUserPhoto(photoURL);
        }  else {
            setUserName('');
            setUserPhoto('');
        }
    }, [user])

    // user log out function
    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error))
    }

    const navItems = <>
        <li><NavLink to="/">Home</NavLink> </li>
        <li> <NavLink to="/about">About</NavLink> </li>
        {user?.email ? <>
             <li> <NavLink to="/createAssignment"> Create Assignment</NavLink></li>
            <li><button onClick={handleLogOut}>Log out</button></li>
        </>
            : <>
                 <li> <NavLink to="/signUp">Sign Up</NavLink> </li>
            </>
        }
    </>
    return (
        <div className="navbar bg-base-100 ">
        <div className="navbar-start">
            <div className="dropdown">
                <label tabIndex={0} className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                    {navItems}
                </ul>
            </div>
            <div className=" flex flex-col md:flex-row lg:flex-row items-center">
                <img className=" w-16 h-16 rounded-full" src="https://i.ibb.co/G7dr43F/logo.jpg" alt="" />
                <a className=" btn btn-ghost normal-case text-xl">Online Group Study</a>
            </div>
        </div>
        <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
                {navItems}
            </ul>
        </div>
        <div className="navbar-end">
            {
                user ? (
                    <div className=" flex flex-col md:flex-row lg:flex-row gap-1 items-center">
                        <div className=" flex flex-col md:flex-row lg:flex-row items-center">
                            <img src={userPhoto} className=" w-12 h-12 rounded-full" alt="" />
                            <p>{userName}</p></div>
                        <button onClick={handleLogOut} className="btn">Sign Out</button>
                    </div>
                )
                    :
                    <Link to="/signIn">
                        <button className="btn">Sign In</button>
                    </Link>
            }
        </div>
    </div>
    );
};

export default NavBar;