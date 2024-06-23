import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AddAssignmentForm from './AddAssignmentForm';
 import { faker } from '@faker-js/faker';
 import AssignmentList from './AssignmentList';

const StudentDetails = () => {
    const { id } = useParams();
    const [student, setStudent] = useState(null);
    const [assignments, setAssignments] = useState([]);

    useEffect(() => {
        // Fetch student details and assignments from the backend
        fetchStudent(id).then(setStudent);
        fetchAssignmentsByStudent(id).then(setAssignments);
    }, [id]);

    if (!student) return <div>Loading...</div>;

    return (
        <div className='bg-gray-100 md:px-16 md:py-4 px-8 h-full'>
            <div className='text-2xl mb-4'>Student Details</div>
            <div className='flex flex-col items-center justify-center mb-4'>
                <img className="inline-block h-64 w-64 rounded-full ring-2 ring-white mb-4" src={student.image} alt={student.name} />
                <div className='text-2xl mb-2'>{student.name}</div>
                <div> {student.email}</div>
            </div>
            <AddAssignmentForm studentId={student.id} />

            <div className='text-2xl mt-8 mb-4'>Students List</div>

            <AssignmentList assignments={assignments} />

        </div>
    );
};

const fetchStudent = async (id) => {
    // Placeholder for API call
    return { id: 1, name: 'Student 1', image: faker.image.avatar() };
};

const fetchAssignmentsByStudent = async (studentId) => {
    // Placeholder for API call
    return [
        { id: 1, title: 'Assignment One' },
        { id: 2, title: 'Assignment Two' },
        // Add more assignments as needed
    ];
};

export default StudentDetails;
