import { NavLink } from "react-router-dom";
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
        } else {
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
        <li> <NavLink to="/assignments">All Assignments</NavLink> </li>
        {user?.email ? <>
            <li> <NavLink to="/create-assignment"> Create Assignment</NavLink></li>
            <li> <NavLink to="/my-assignments"> My Assignmentst</NavLink></li>
            <li> <NavLink to="/submitted-assignments">  Submitted Assignments</NavLink></li>
        </>
            : <>
                <li> <NavLink to="/signUp">Sign Up</NavLink> </li>
                <li> <NavLink to="/signIn">Sign In</NavLink> </li>
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
                            <div className="flex flex-col items-center group lg:mt-6">
                                <img src={userPhoto} className="w-14 h-14 rounded-full transition duration-300 transform group-hover:scale-110" alt="" />
                                <div className="mt-2 opacity-0 group-hover:opacity-100 transition duration-300">{userName}</div>
                            </div>
                            <NavLink to="/"><button onClick={handleLogOut} className="btn">Log out</button></NavLink>
                        </div>
                    )
                        : ''

                }
            </div>
        </div>
    );
};

export default NavBar;