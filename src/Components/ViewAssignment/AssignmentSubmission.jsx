
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";


const AssignmentSubmission = () => {
  const [assignment, setassignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const examineeName = user.displayName;
  const examineeEmail = user.email;
  const status = 'pending';

  console.log(user);

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
  }, [id, axiosSecure]);

  if (loading) {
    return <div className="text-center h-[80vh] flex justify-center items-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center h-[80vh] flex justify-center items-center">{error}</div>;
  }

  if (!assignment) {
    return <div className="text-center h-[80vh] ">No assignment found with the provided ID.</div>;
  }

  console.log(id);
  console.log(assignment);


  const handleAssignmentSubmission = async (e) => {
    e.preventDefault();
    const form = e.target;
    const queckNote = form.queckNote.value;
    const pdfLink = form.pdfLink.value;
    const assignmentSubmission = {
      assignment,
      pdfLink,
      queckNote,
      examineeName,
      examineeEmail,
      status
    }

    try {

      const response = await axiosSecure.post(`/assignmentSubmission`, assignmentSubmission, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.status === 201) {
        Swal.fire("Assignment submitted successfully");
        navigate(location?.state ? location?.state : '/assignments')
      } else {
        Swal.fire("Failed to submit assignment");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Failed to submit assignment. Please try again later.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white w-96 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Submit Assignment</h2>
        <form onSubmit={handleAssignmentSubmission}>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600 mb-2">PDF Link:</label>
            <input
              type="text"
              placeholder="Assignment pdf link"
              className="w-full p-2 border border-gray-300 rounded"
              name="pdfLink"
              required

            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600 mb-2">Queck Note:</label>
            <label className="input-group">
              <textarea className=" pl-2 w-full" rows='3' cols='20' name="queckNote" placeholder="Queck Note..."></textarea>
            </label>
          </div>
          <div className="flex justify-center gap-5">
            <input type="submit" value="Submit"
              className=" bg-blue-600 hover:bg-blue-800 text-white py-2 px-3 rounded-md w-1/2 " />
            <Link to="/assignments">
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


export default AssignmentSubmission;