import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AddAssignmentForm from '../components/AddAssignmentForm';
import { faker } from '@faker-js/faker';
import AssignmentList from '../components/AssignmentList';
import UseTeachersContext from '../hooks/use-teachers-context';

const StudentDetails = () => {
    const { id } = useParams();
    const { student, fetchStudent } = UseTeachersContext()
    const [showAddAssignmentForm, setShowAddAssignmentForm] = useState(false)

    useEffect(() => {
        fetchStudent(id)
    }, [id, fetchStudent]);

    const handleAddStudent = () => {
        setShowAddAssignmentForm(!showAddAssignmentForm)
    };
    if (!student) return <div>Loading...</div>;

    return (
        <div className='bg-gray-100 md:px-16 md:py-4 px-8 h-full'>
            <div className='text-2xl mb-4'>Student Details</div>
            <div className='flex flex-col items-center justify-center mb-4'>
                <img className="inline-block h-64 w-64 rounded-full ring-2 ring-white mb-4" src={faker.image.avatar()} alt={student.name} />
                <div className='text-2xl mb-2'>{student.name}</div>
            </div>
            {/* Button to trigger the form */}
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
                onClick={handleAddStudent}
            >
                {showAddAssignmentForm ? 'Hide Form' : 'Add Assignment'}

            </button>
            {showAddAssignmentForm && <AddAssignmentForm student={student} />}
            {student?.assignments.length > 0 && <AssignmentList assignments={student.assignments} />}
        </div>
    );
};

export default StudentDetails;
