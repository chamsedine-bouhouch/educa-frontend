import { faker } from '@faker-js/faker';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import StudentList from './StudentList';
import AddStudentForm from './AddStudentForm';
import TeacherContext from '../context/teachers';

const TeacherDetails = () => {
    const { id } = useParams();
    const { teacher, students, fetchTeacher, error } = useContext(TeacherContext);
    const [localError, setLocalError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                await fetchTeacher(id);
                setLocalError(null);
            } catch (err) {
                setLocalError('Failed to load teacher details.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id, fetchTeacher]);
    
    // handle loading & error
    if (loading) {
        return <div className='flex justify-center mt-4 text-xl'>Loading...</div>;
    }

    if (localError || error) {
        return <div className='flex justify-center mt-4 text-xl text-red-500'>{localError || error}</div>;
    }

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

export default TeacherDetails;
