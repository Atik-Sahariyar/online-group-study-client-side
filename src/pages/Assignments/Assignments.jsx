import { useEffect, useState } from "react";
import useAssignments from "../../hooks/useAssignments";
import AssignmentCard from "./AssignmentCard";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const Assignments = () => {
    const [selectedLevel, setSelectedLevel] = useState(null);
    const [ loadingFilter, setLoadingFilter ] = useState(true)
    const [ filteredAssignments, setFilteredAssignments ] = useState();
    const { assignments, loading } = useAssignments([]);
    const axiosSecure = useAxiosSecure()
  

    // deficulty level select
    const handleSelectedLevel = e => {
        e.preventDefault();
        setSelectedLevel(e.target.value)
    }
    console.log(selectedLevel);


    useEffect(() => {
        const fetchassignments = async () => {
            try {
                const response = await axiosSecure.get(`/assignments/filteredAssignments/${selectedLevel}`);
                setFilteredAssignments(response.data);
                setLoadingFilter(false)
            } catch (error) {
                console.error('Error fetching assignments data:', error); 
                setLoadingFilter(false)    
            }
        };

        fetchassignments();
    }, [axiosSecure, selectedLevel]);

    return (
        <div className="mx-5 md:mx-8 lg:mx-10 mb-5">

            <div className="mt-5 text-gray-700 text-center mb-2">             
                <p>Explore the assignments below and start working on your tasks. If you have any questions or need assistance, feel free to reach out to us.</p>
                <div className="my-4">
                <h2 className=" text-start">Search with assignment difficulty level</h2>
                
                 <label className="input-group">
                    <select name="difficultyLevel" value={selectedLevel} onChange={handleSelectedLevel} className="w-1/4">
                        <option value="all">All</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </label>
                
                </div>
            </div>
            {loading || loadingFilter ? (
                <span className=" h-[80vh] flex justify-center items-center">
                    <p className="text-center text-5xl">Loading assignments...</p>
                </span>
            ) :
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {
                        !selectedLevel || selectedLevel === 'all'?
                        assignments?.map(assignment => <AssignmentCard key={assignment._id} assignment={assignment}></AssignmentCard>)
                        :
                        filteredAssignments?.map(assignment => <AssignmentCard key={assignment._id} assignment={assignment}></AssignmentCard>)
                    }
                </div>
            }
        </div>
    );
};

export default Assignments;