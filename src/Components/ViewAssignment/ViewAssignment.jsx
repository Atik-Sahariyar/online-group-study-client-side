import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import AssignmentSubmission from "./AssignmentSubmission";


const ViewAssignment = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const [assignment, setassignment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchAssignment = async () => {
            try {
                const response = await axiosSecure.get(`/assignments/${id}`);
                setassignment(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching assinment: ", error)
                setError("Failed to fetch assignment details. Please try again later.");
                setLoading(false);
            }
        };

        fetchAssignment();
    }, [id, axiosSecure])

    if (loading) {
        return <div className="text-center h-[80vh] flex justify-center items-center">Loading...</div>;
    }

    if (error) {
        return <div className="text-center h-[80vh] flex justify-center items-center">{error}</div>;
    }

    if (!assignment) {
        return <div className="text-center h-[80vh] ">No assignment found with the provided ID.</div>;
    }

    const { assignmentTitle, description, marks, difficultyLevel, thumbnailImgURL, dueDate } = assignment;



    return (
        <div className="mx-5 md:mx-8 lg:mx-10 relative">
            <div className={`w-1/2 mx-auto rounded overflow-hidden shadow-lg  h-full `}>
                <img src={thumbnailImgURL} alt={assignmentTitle} className="w-full h-[300px] object-cover" />
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{assignmentTitle}</div>
                    <p className="text-gray-700 text-base mb-2">Difficulty level:  {difficultyLevel}</p>
                    <p className="text-gray-900 font-semibold text-lg mb-2">Marks: {marks}</p>
                    <p className="text-gray-700 text-base mb-2">{description}</p>
                    <p>Last Date: {dueDate}</p>


                    <div className=" flex justify-center my-3">
                        
                          <div>
                                <div className="  hidden">
                                   <AssignmentSubmission assignment={assignment} />
                                </div>
                                <Link to={`/assignmentSubmission/${id}`}>

                                    <button className=" bg-blue-500 px-3 py-2 rounded-lg text-white hover:bg-blue-800">Take assignment</button>
                                </Link>
                            </div>
                        
                    </div>
                </div>
            </div>


        </div>
    );
};

export default ViewAssignment;