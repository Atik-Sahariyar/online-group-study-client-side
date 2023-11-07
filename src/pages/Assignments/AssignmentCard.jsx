import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AssignmentCard = ({ assignment }) => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { _id,creatorEmail, assignmentTitle, marks, difficultyLevel, thumbnailImgURL } = assignment;
    console.log(assignment);
    const userEmail = user.email;
    // // delete assignment function
    const handleDeleteAssignment = async(id, email ) => {
        const proceed = confirm('Are You sure you want to delete');
        if(proceed && email === creatorEmail) {
            try{
                const response = await axiosSecure.delete(`/assignments/${id}`);
                console.log(response.data);
                
            } catch (error) {
                console.error("Error fetching assinment: ", error)
            }
        }
    }

    return (
        <div className="card w-96 h-[440px]  bg-base-100 shadow-xl relative">
            <figure className="px-6 pt-8">
                <img src={thumbnailImgURL} alt={assignmentTitle} className="rounded-xl w-[336px] h-[196px]" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{assignmentTitle}</h2>
                <div className=" flex justify-between" >
                    <p className="text-xl ">Marks: {marks}</p>
                    <p className="text-xl">Difficulty: {difficultyLevel}</p>
                </div>

                {
                    user ?
                        <div className="card-actions absolute bottom-3 ">
                            <Link to={`/view-assignment/${_id}`}>
                                <button className=" btn btn-primary">View</button>
                            </Link>
                            <Link to={`/update-assignment/${_id}`}>
                                <button className="mx-8 btn btn-primary">Update</button>
                            </Link>
                            
                                <button onClick={() => handleDeleteAssignment(_id, userEmail)} className="btn btn-primary">Delete</button>
                            
                        </div> 
                        :
                        <div className="card-actions absolute bottom-3 ">
                        <Link to="/signIn">
                            <button className=" btn btn-primary">View</button>
                        </Link>
                        <Link to="/signIn">
                            <button className="mx-8 btn btn-primary">Update</button>
                        </Link>
                        <Link to="/signIn">
                            <button className="btn btn-primary">Delete</button>
                        </Link>
                    </div>
              }
            </div>
        </div>
    );
};
AssignmentCard.propTypes = {
    assignment: PropTypes.object
}
export default AssignmentCard;