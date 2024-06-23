import { faker } from "@faker-js/faker"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import UseTeachersContext from "../hooks/use-teachers-context";

const TeacherList = () => {
    const { teachers, fetchTeachers, error } = UseTeachersContext();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchTeachers();
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [fetchTeachers]);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            {error && <p className="mb-2 text-red-500 ">{error}</p>}
            <ul className='items-center rounded bg-white'>
                {teachers.map((teacher) => (
                    <li className="flex items-center p-4 hover:bg-gray-200 border" key={teacher.id}>
                        <img className="inline-block h-6 w-6 rounded-full ring-2 ring-white mr-4" src={faker.image.avatar()} alt={teacher.name} />
                        <Link className="text-lg cursor-pointer hover:text-green-500 " to={`/teachers/${teacher.id}`}>
                            {teacher.id} - {teacher.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default TeacherList