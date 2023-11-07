import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const CreateAssignment = () => {
    const [selectedLevel, setSelectedLevel] = useState('easy');
    const [dueDate, setDueDate] = useState(null);
    const [isFeature, setIsFeature] = useState(false);
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure()
    const createdBy = user.displayName;
    const creatorEmail = user.email;
   
 
    // deficulty level select
    const handleSelectedLevel = e => {
        e.preventDefault();
        setSelectedLevel(e.target.value)
    }

    // assignment creation

const handleCreateAssignment = async (e) => {
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
        const response = await axiosSecure.post('/assignments', assignmentInfo);

        if (response.status === 201) {
            Swal.fire('Assignment created successfully');
            form.reset();
            console.log(response.data);
        } else if (response.status === 400) {
            Swal.fire('Assignment with this title already exists');
        } else {
            Swal.fire('Failed to create assignment');
        }
    } catch (error) {
        console.error(error);
        Swal.fire('Failed to create assignment. Please try again later.');
    }
};


    return (
        <div className="bg-[#F4F3F0] p-24">
            <h2 className="text-3xl font-extrabold text-center">Create Assignment</h2>
            <form onSubmit={handleCreateAssignment} >
                {/* form name and marks row */}
                <div className="md:flex mb-8">
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text">Assignment Name</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name="assignmentTitle" placeholder="Assignment Name" className="input input-bordered w-full" required />
                        </label>
                    </div>
                    <div className="form-control md:w-1/2 ml-4">
                        <label className="label">
                            <span className="label-text">Marks</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name="marks" placeholder="Marks" className="input input-bordered w-full" required />
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
                            <textarea className=" w-full pl-2" rows='3' cols='20' name="description" placeholder="Enter description..."></textarea>
                        </label>
                    </div>
                    <div className="form-control grid grid-cols-2 md:w-1/2 ml-4">
                        <div className="w-1/2">
                            <label className="label">
                                <span className="label-text"> Difficulty level</span>
                            </label>
                            <label className="input-group">
                                <select name="difficultyLevel" value={selectedLevel} onChange={handleSelectedLevel} className="w-1/2">
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
                            <input type="text" name="thumbnailImgURL" placeholder="Image URL" className="input input-bordered w-full" required />
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
                                onChange={(e) => setIsFeature(e.target.checked)}
                                className="checkbox"
                            />
                        </div>
                    </div>

                </div>

                <div className="w-full">
                    <input type="submit" value="Create Assignment" className=" bg-blue-600 hover:bg-blue-800 text-white py-2 px-3 rounded-md w-1/2  " />
                </div>
            </form>
        </div>
    );
};

export default CreateAssignment;