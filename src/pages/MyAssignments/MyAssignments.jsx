import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import MyAssignmentRow from "./MyAssignmentRow";

const MyAssignments = () => {
     const [myAssignments, setMyAssignments ] = useState();
     const { user } = useAuth();
     const axiosSecure = useAxiosSecure();
     const userEmail = user.email;


    // Fetch pending assignments from the API
    useEffect(() => {
        const fetchMyAssignments = async () => {
            try {
                const response = await axiosSecure.get(`/submittedAssignments/myAssignment/${userEmail}`);
                setMyAssignments(response.data);
            } catch (error) {
                console.error("Error fetching my assignments: ", error);
            }
        };

        fetchMyAssignments();
    }, [axiosSecure,userEmail])

    console.log(myAssignments);
    return (
        <div>
        <h4 className=" text-center text-4xl my-8 font-bold">My Submitted assignments</h4>
        <div className=" w-11/12 mx-auto overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                       
                        <th>Assignment title</th>
                        <th>My Submission</th>
                        <th>Assignment Status</th>
                        <th>Marks</th>
                        <th>My Obtained marks</th>
                        <th>Examiner Feedback</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        myAssignments?.map(myAssignment => <MyAssignmentRow key={myAssignment._id} myAssignment={myAssignment}></MyAssignmentRow>)
                    }

                </tbody>
            </table>
        </div>
    </div>
    );
};

export default MyAssignments;