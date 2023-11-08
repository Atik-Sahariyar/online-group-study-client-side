import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import PropTypes from "prop-types"

const FeaturedCard = ({assignment}) => {
    const { user } = useAuth();
    const { _id, assignmentTitle, marks, difficultyLevel, thumbnailImgURL } = assignment;


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
                        <div className="card-actions  absolute bottom-3  w-full">
                            <Link to={`/view-assignment/${_id}`}>
                                <button className=" btn btn-primary w-full">View Details</button>
                            </Link>
                        </div> 
                        :
                        <div className="card-actions absolute bottom-3 ">
                        <Link to="/signIn">
                            <button className=" btn btn-primary">View Details</button>
                        </Link>
        
                    </div>
              }
            </div>
        </div>
    );
};

FeaturedCard.propTypes = {
    assignment: PropTypes.object
}
export default FeaturedCard;