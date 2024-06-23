import { faker } from '@faker-js/faker';
import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import StudentList from './StudentList';
import AddStudentForm from './AddStudentForm';
import TeacherContext from '../context/teachers';

const TeacherDetails = () => {
    const { id } = useParams();
    const { teacher, students, fetchTeacher } = useContext(TeacherContext);

    useEffect(() => {
        fetchTeacher(id)
    }, [id]);

    if (!teacher) {
        return <div className='flex justify-center mt-4 text-xl text-red-500'>Teacher not found</div>;
    }

    return (
        <div className='bg-gray-100 md:px-16 md:py-4 px-8 h-full'>
            <div className='text-2xl mb-4'>Teacher Details</div>
            <div className='flex flex-col items-center justify-center mb-4'>
                <img className="inline-block h-64 w-64 rounded-full ring-2 ring-white mb-4" src={faker.image.avatar()} alt={teacher.name} />
                <div className='text-2xl mb-2'>{teacher.name}</div>
                <div> {teacher.email}</div>
            </div>
            <AddStudentForm teacherId={teacher.id} />
            <div className='text-2xl mt-8 mb-4'>Students List</div>
            <StudentList students={students} />
        </div>
    );
};

// const fetchTeacher = async (id) => {
//     // Placeholder for API call
//     return {
//         id: id,
//         name: faker.person.fullName(),
//         email: faker.internet.email(),
//         image: faker.image.avatar(),
//     };
// };
// const fetchStudentsByTeacher = async (teacherId) => {
//     // Placeholder for API call
//     return [
//         { id: 1, name: 'Student 1', image: faker.image.avatar() },
//         { id: 2, name: 'Student 2', image: faker.image.avatar() },
//         { id: 3, name: 'Student 3', image: faker.image.avatar() },
//         { id: 4, name: 'Student 4', image: faker.image.avatar() },
//         { id: 5, name: 'Student 5', image: faker.image.avatar() },
//         { id: 6, name: 'Student 6', image: faker.image.avatar() },
//         { id: 7, name: 'Student 7', image: faker.image.avatar() },
//         { id: 8, name: 'Student 8', image: faker.image.avatar() },
//         { id: 9, name: 'Student 9', image: faker.image.avatar() },

//     ];
// };


export default TeacherDetails;
