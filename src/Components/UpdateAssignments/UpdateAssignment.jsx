import {  useLocation, useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";



const UpdateAssignment = () => {

    const { id } = useParams();
    const axiosSecure = useAxiosSecure()
    const [ assignment, setassignment ] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedLevel, setSelectedLevel] = useState('easy');
    const [dueDate, setDueDate] = useState(null);
    const [isFeature, setIsFeature] = useState(false);
    const { user } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const createdBy = user.displayName;
    const creatorEmail = user.email;

   
 
    // deficulty level select
    const handleSelectedLevel = e => {
        e.preventDefault();
        setSelectedLevel(e.target.value)
    }


    useEffect(() => {
        const fetchAssignment = async () => {
            try{
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

    const { _id,  assignmentTitle, description , marks, isFeatured, thumbnailImgURL, lastDate } = assignment;
  
  

    console.log(assignment);
    
    // assignment update function
const handleUpdateAssignment = async (e) => {
    e.preventDefault();
    const form = e.target;
    const assignmentTitle = form.assignmentTitle.value;
    const marks = form.marks.value;
    const description = form.description.value;
    const thumbnailImgURL = form.thumbnailImgURL.value;

    const assignmentInfo = {
        assignmentTitle,
        marks,
        description,
        difficultyLevel: selectedLevel,
        lastDate: dueDate,
        isFeatured: isFeature,
        thumbnailImgURL,
        createdBy,
        creatorEmail
    };
    try {
        const response = await axiosSecure.patch(`/assignments/${_id}`, assignmentInfo);

        if (response.status === 201) {
            Swal.fire('Assignment updated successfully');
        
            console.log(response.data);
            navigate(location?.state ? location?.state : '/assignments')
        } else {
            Swal.fire('Failed to update assignment');
        }
    } catch (error) {
        console.error(error);
        Swal.fire('Failed to update assignment. Please try again later.');
    }
};

    return (
        <div className="bg-[#F4F3F0] p-24">
        <h2 className="text-3xl font-extrabold text-center">Update Assignment</h2>
        <form onSubmit={handleUpdateAssignment} >
            {/* form name and marks row */}
            <div className="md:flex mb-8">
                <div className="form-control md:w-1/2">
                    <label className="label">
                        <span className="label-text">Assignment Name</span>
                    </label>
                    <label className="input-group">
                        <input type="text" name="assignmentTitle" defaultValue={assignmentTitle} placeholder="Assignment Name" className="input input-bordered w-full" required />
                    </label>
                </div>
                <div className="form-control md:w-1/2 ml-4">
                    <label className="label">
                        <span className="label-text">Marks</span>
                    </label>
                    <label className="input-group">
                        <input type="text" name="marks" placeholder="Marks" defaultValue={marks} className="input input-bordered w-full" required />
                    </label>
                </div>
            </div>
            {/* form supplier row */}
            <div className="md:flex mb-8">
                <div className="form-control md:w-1/2">
                    <label className="label">
                        <span className="label-text">Description</span>
                    </label>
                    <label className="input-group">
                        <textarea className=" w-full pl-2" rows='3' cols='20' defaultValue={description} name="description" placeholder="Enter description..."></textarea>
                    </label>
                </div>
                <div className="form-control grid grid-cols-2 md:w-1/2 ml-4">
                    <div className="w-1/2">
                        <label className="label">
                            <span className="label-text"> Difficulty level</span>
                        </label>
                        <label className="input-group">
                            <select name="difficultyLevel" value={selectedLevel} defaultValue={selectedLevel}  onChange={handleSelectedLevel} className="w-1/2">
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                            </select>
                        </label>
                    </div>
                    <div className="w-1/2">
                        <label className="label">
                            <span className="label-text">Due Date</span>
                        </label>
                        <DatePicker
                            selected={dueDate}
                            defaultValue = {lastDate}
                            onChange={(date) => setDueDate(date)}
                            minDate={new Date()} // Optional: Set the minimum selectable date (e.g., today)
                            dateFormat="dd/MM/yyyy" // Optional: Specify the date format
                            className="input input-bordered w-full"
                        />
                    </div>
                </div>
            </div>

            {/* form thumbnel url row */}
            <div className="mb-8">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text"> Thumbnail Image URL</span>
                    </label>
                    <label className="input-group">
                        <input type="text" name="thumbnailImgURL" defaultValue={thumbnailImgURL} placeholder="Image URL" className="input input-bordered w-full" required />
                    </label>
                </div>
                <div className="mb-8">
                    <div className="form-control flex flex-row  items-center gap-1 w-full">
                        <label className="label">
                            <span className="label-text">Is Feature?</span>
                        </label>
                        <input
                            type="checkbox"
                            name="isFeature"
                            checked={isFeature}
                            defaultChecked = {isFeatured}
                            onChange={(e) => setIsFeature(e.target.checked)}
                            className="checkbox"
                        />
                    </div>
                </div>

            </div>

            <div className="w-full">
                <input type="submit" value="Update Assignment" className=" bg-blue-600 hover:bg-blue-800 text-white py-2 px-3 rounded-md w-1/2  " />
            </div>
        </form>
    </div>
    );
};

export default UpdateAssignment;