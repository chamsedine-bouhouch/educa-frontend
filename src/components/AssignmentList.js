import { Link } from "react-router-dom"

const AssignmentList = ({ assignments }) => {
    return (
        <>
            <div className='text-2xl mt-8 mb-4'>Attached Assignments</div>
            <ul className='items-center rounded bg-white'>
                {assignments.map((assignment) => (
                    <li className="flex items-center p-4 hover:bg-gray-200 border" key={assignment.id}>
                        <Link to={`/assignments/${assignment.id}`}>{assignment.id} - {assignment.title}</Link>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default AssignmentList