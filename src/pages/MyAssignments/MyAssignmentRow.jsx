import PropTypes from "prop-types"

const MyAssignmentRow = ({ myAssignment }) => {
    return (
        <tr className="hover:bg-base-200">
            <td>{myAssignment?.assignment.assignmentTitle}</td>
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