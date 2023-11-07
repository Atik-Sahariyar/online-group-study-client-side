import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import PropTypes from "prop-types"

const PrivateRoute = ({children}) => {
    const { user, loading } = useAuth();
    if(loading) {
        return <progress className="progress w-56"></progress>
    }

    if(user?.email){
        return children;
    }
    return <Navigate to="/login" replace></Navigate>;
};

PrivateRoute.propTypes = {
    children: PropTypes.object
}

export default PrivateRoute;