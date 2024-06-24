import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AddAssignmentForm from '../components/AddAssignmentForm';
import { faker } from '@faker-js/faker';
import AssignmentList from '../components/AssignmentList';
import UseTeachersContext from '../hooks/use-teachers-context';

const StudentDetails = () => {
    const { id } = useParams();
    const { student, fetchStudent, error } = UseTeachersContext();
    const [localError, setLocalError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showAddAssignmentForm, setShowAddAssignmentForm] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState('');

    useEffect(() => {
        const getStudent = async () => {
            try {
                await fetchStudent(id);
                setLocalError(null);
            } catch (err) {
                setLocalError('Failed to fetch student.');
            } finally {
                setLoading(false);
            }
        };

        getStudent();
    }, [id, fetchStudent]);

    useEffect(() => {
        if (student) {
            setAvatarUrl(faker.image.avatar());
        }
    }, [student]);

    const handleAddAssignmentToggle = () => {
        setShowAddAssignmentForm(!showAddAssignmentForm);
    };

    if (loading) {
        return <div className='flex justify-center mt-4 text-xl'>Loading...</div>;
    }

    if (localError || error) {
        return <div className='flex justify-center mt-4 text-xl text-red-500'>{localError || error}</div>;
    }

    if (!student) {
        return <div className='flex justify-center mt-4 text-xl text-red-500'>Student not found</div>;
    }

    return (
        <div className='bg-gray-100 md:px-16 md:py-4 px-8 min-h-screen'>
            <div className='text-2xl mb-4'>Student Details</div>
            <div className='flex flex-col items-center justify-center mb-4'>
                <img className="inline-block h-64 w-64 rounded-full ring-2 ring-white mb-4" src={avatarUrl} alt={student.name} />
                <div className='text-2xl mb-2'>{student.name}</div>
            </div>
            {/* Button to trigger the form */}
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
                onClick={handleAddAssignmentToggle}
            >
                {showAddAssignmentForm ? 'Hide Form' : 'Add Assignment'}
            </button>
            {showAddAssignmentForm && <AddAssignmentForm student={student} />}
            {student?.assignments.length > 0 && <AssignmentList assignments={student.assignments} />}
            <Link to="/" className="text-blue-500 hover:underline mt-4 block">
                Back to Home
            </Link>
        </div>
    );
};

export default StudentDetails;
