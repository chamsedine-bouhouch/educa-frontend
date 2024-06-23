import { faker } from "@faker-js/faker"
import { Link } from "react-router-dom"

const StudentList = ({ students }) => {
    return (
        <>
            <div className='text-2xl mt-8 mb-4'>Students List</div>
            <ul className='items-center rounded bg-white'>
                {students.map((student) => (
                    <li className="flex items-center p-4 hover:bg-gray-200 border" key={student.id}>
                        <img className="inline-block h-6 w-6 rounded-full ring-2 ring-white mr-4" src={faker.image.avatar()} alt={student.id} />
                        <Link className="text-lg cursor-pointer hover:text-green-500 " to={`/students/${student.id}`}> {student.id} - {student.name} </Link>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default StudentList