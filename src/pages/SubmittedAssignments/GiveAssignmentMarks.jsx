import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const GiveAssignmentMarks = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();
    const { id } = useParams()
    const axiosSecure = useAxiosSecure()
    const examinerName = user.displayName;
    const examinerEmail = user.email;
    const status = "completed"

    const handleAssignmentMarksSubmission = async (e) => {
        e.preventDefault();
        const form = e.target;
        const obtainedMarks = form.obtainedMarks.value;
        const examinerFeedback = form.examinerFeedback.value;
        
        const assignmentSubmissionUpdate = {
          examinerFeedback,
          obtainedMarks,
          examinerName,
          examinerEmail,
          status
        }
    
        try {
    
          const response = await axiosSecure.patch(`/assignmentSubmission/${id}`, assignmentSubmissionUpdate );

          if (response.status === 201) {
            Swal.fire("Assignment marks given successfully");
            navigate(location?.state ? location?.state : '/submitted-assignments')
          } else {
            Swal.fire("Failed to give assignment marks");
          }
        } catch (error) {
          console.error(error);
          Swal.fire("Failed to give assignment marks. Please try again later.");
        }
      };
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white w-96 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Give Assignment marks</h2>
          <form onSubmit={handleAssignmentMarksSubmission}>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-600 mb-2">Obtained Marks:</label>
              <input
                type="text"
                placeholder="Obtained marks"
                className="w-full p-2 border border-gray-300 rounded"
                name="obtainedMarks"
                required
  
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-600 mb-2">Examiner Feedback:</label>
              <label className="input-group">
                <textarea className=" pl-2 w-full" rows='3' cols='20' name="examinerFeedback" placeholder="Examiner Feedback..."></textarea>
              </label>
            </div>
            <div className="flex justify-center gap-5">
              <input type="submit" value="Submit"
                className=" bg-blue-600 hover:bg-blue-800 text-white py-2 px-3 rounded-md w-1/2 " />
              <Link to="/submitted-assignments">
                <button
                  className="ml-5 bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400 focus:outline-none">
                  Cancel
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
};

export default GiveAssignmentMarks;