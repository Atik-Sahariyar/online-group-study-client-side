import useAssignments from "../../hooks/useAssignments";
import AssignmentCard from "./AssignmentCard";


const Assignments = () => {

    const { assignments, loading } = useAssignments([]);
    console.log(assignments, loading);

    return (
        <div className="mx-5 md:mx-8 lg:mx-10">

            <div className="mt-8 text-gray-700 text-center mb-2">
                <h2 className="text-3xl font-bold mb-4 text-black">All Assignments</h2>
                <p>Explore the assignments below and start working on your tasks. If you have any questions or need assistance, feel free to reach out to us.</p>
            </div>
            {loading ? (
                <span className=" h-[80vh] flex justify-center items-center">
                    <p className="text-center text-5xl">Loading assignments...</p>
                </span>
            ) : 
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    assignments?.map(assignment => <AssignmentCard key={assignment._id} assignment={assignment}></AssignmentCard>)
                }
            </div>
            }
        </div>
    );
};

export default Assignments;