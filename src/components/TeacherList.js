import { Link } from "react-router-dom"

const TeacherList = ({ teachers }) => {
    return (

        <ul className='items-center rounded bg-white'>
            {teachers.map((teacher) => (
                <li className="flex items-center p-4 hover:bg-gray-200 border" key={teacher.id}>
                    <img className="inline-block h-6 w-6 rounded-full ring-2 ring-white mr-4" src={teacher.image} alt={teacher.name} />
                    <Link className="text-lg cursor-pointer hover:text-green-500 " to={`/teachers/${teacher.id}`}> {teacher.id} - {teacher.name} {teacher.name}</Link>
                </li>
            ))}
        </ul>
    )
}

export default TeacherList