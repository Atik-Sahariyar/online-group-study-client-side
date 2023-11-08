import PropTypes from "prop-types"
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const SubmittedAssignmentRow = ({ pendingAssignment }) => {
    const { user } = useAuth();
    

    return (

        <tr className="hover:bg-base-200">
            <td>{pendingAssignment.examineeName}</td>
            <td>{pendingAssignment.assignment.assignmentTitle}</td>
            <td className="text-blue-600 hover:text-blue-800"><Link to={pendingAssignment.pdfLink}>View PDF Link</Link></td>
            <td>{pendingAssignment.assignment.marks}</td>
            <td>Pending</td>
            <td>
                {pendingAssignment.examineeEmail !== user.email ?
                    <button className="btn btn-primary"> <Link to = {`/give-assignment-marks/${pendingAssignment._id}`}>Give marks</Link></button>
                    :
                    <button className="btn btn-primary" onClick={ () => Swal.fire('This is your assignment. So you can not give marks')}> Give marks </button>
                }
            </td>
            
        </tr>
    );
};

SubmittedAssignmentRow.propTypes = {
    pendingAssignment: PropTypes.object
}
export default SubmittedAssignmentRow;