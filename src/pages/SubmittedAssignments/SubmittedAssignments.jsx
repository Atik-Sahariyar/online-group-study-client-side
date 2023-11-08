import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import SubmittedAssignmentRow from "./SubmittedAssignmentRow";

const SubmittedAssignments = () => {
    const [pendingAssignments, setPendingAssignments] = useState([]);
    const axiosSecure = useAxiosSecure()

    // Fetch pending assignments from the API
    useEffect(() => {
        const fetchPendingAssignments = async () => {
            try {
                const response = await axiosSecure.get("/submittedAssignments");
                setPendingAssignments(response.data);
            } catch (error) {
                console.error("Error fetching pending assignments: ", error);
            }
        };

        fetchPendingAssignments();
    }, [axiosSecure])
    
    
    return (
        <div>
            <h4 className=" text-center text-4xl my-8 font-bold">All Submitted assignments</h4>
            <div className=" w-11/12 mx-auto overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Examinee Name</th>
                            <th>Assignment title</th>
                            <th>Assignment pdf</th>
                            <th>Marks</th>
                            <th>Status</th>
                            <th>Give marks</th>
                           
                        </tr>
                    </thead>
                    <tbody>
                        {
                            pendingAssignments?.map(pendingAssignment => <SubmittedAssignmentRow key={pendingAssignment._id} pendingAssignment={pendingAssignment}></SubmittedAssignmentRow>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SubmittedAssignments;