import { useEffect, useState } from "react";
import useAxiosSecure from "./useAxiosSecure";


const useAssignments = () => {
    const [assignments, setassignments] = useState();
    const axiosSecure = useAxiosSecure()
    const [ loading, setLoading ] = useState(true)
    useEffect(() => {
        const fetchassignments = async () => {
            try {
                const response = await axiosSecure.get('/assignments');
                setassignments(response.data);
                setLoading(false)
            } catch (error) {
                console.error('Error fetching assignments data:', error); 
                setLoading(false)    
            }
        };

        fetchassignments();
    }, [axiosSecure]);
    return  ({assignments, loading});
};

export default useAssignments;