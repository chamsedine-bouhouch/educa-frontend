import { Link } from "react-router-dom"

const AssignmentList = ({ assignments }) => {
    return (
        <ul className='items-center rounded bg-white'>
            {assignments.map((assignment) => (
                <li className="flex items-center p-4 hover:bg-gray-200 border" key={assignment.id}>
                    {/* <img className="inline-block h-6 w-6 rounded-full ring-2 ring-white mr-4" src={assignment.image} alt={assignment.name} /> */}
                    <Link to={`/assignments/${assignment.id}`}>{assignment.title}</Link>
                    </li>
            ))}
        </ul>
    )
}

export default AssignmentList