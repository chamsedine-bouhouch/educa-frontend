import { faker } from '@faker-js/faker';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import StudentList from '../components/StudentList';
import AddStudentForm from '../components/AddStudentForm';
import TeacherContext from '../context/teachers';

const TeacherDetails = () => {
    const { id } = useParams();
    const { teacher, fetchTeacher, error } = useContext(TeacherContext);
    const [localError, setLocalError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showAddStudentForm, setShowAddStudentForm] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState('');

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

    useEffect(() => {
        if (teacher) {
            setAvatarUrl(faker.image.avatar());
        }
    }, [teacher]);

    const handleAddStudent = () => {
        setShowAddStudentForm(!showAddStudentForm);
    };

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
        <div className='bg-gray-100 md:px-16 md:py-4 px-8 min-h-screen'>
            <div className='text-2xl mb-4'>Teacher Details</div>
            <div className='flex flex-col items-center justify-center mb-4'>
                <img className="inline-block h-64 w-64 rounded-full ring-2 ring-white mb-4" src={avatarUrl} alt={teacher.name} />
                <div className='text-2xl mb-2'>{teacher.name}</div>
                <div>{teacher.email}</div>
            </div>
            {/* Button to trigger the form */}
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
                onClick={handleAddStudent}
            >
                {showAddStudentForm ? 'Hide Form' : 'Assign Student'}
            </button>

            {showAddStudentForm && <AddStudentForm teacherId={teacher.id} />}
            {teacher?.students.length > 0 && <StudentList students={teacher.students} />}
            <Link to="/" className="text-blue-500 hover:underline mt-4 block">
                Back to Home
            </Link>
        </div>
    );
};

export default TeacherDetails;
