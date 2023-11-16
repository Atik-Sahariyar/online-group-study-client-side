import PropTypes from "prop-types"
import { Link } from "react-router-dom";


const MyAssignmentRow = ({ myAssignment }) => {
    return (
        <tr className="hover:bg-base-200">
            <td>{myAssignment?.assignment.assignmentTitle}</td>
            <td className="text-blue-600 hover:text-blue-800"><Link o={myAssignment?.pdfLink}  target="_blank">View PDF Link</Link></td>

            {
                myAssignment?.status === 'pending' ?
                    <span className=" text-red-600">
                        <td>{myAssignment?.status}</td>
                    </span>
                    :
                    <span className=" text-green-600">
                        <td>{myAssignment?.status}</td>
                    </span>
            }
            <td>{myAssignment?.assignment.marks}</td>
            {
                myAssignment?.obtainedMarks ?
                <td>{myAssignment?.obtainedMarks}</td>
                :
                <td>Not seen yet</td>
            }
            {
                myAssignment?.examinerFeedback?
                <td>{myAssignment?.examinerFeedback}</td>
                :
                <td>Not seen yet</td>
            }

        </tr>
    );
};

MyAssignmentRow.propTypes = {
    myAssignment: PropTypes.object
}

export default MyAssignmentRow;