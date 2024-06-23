// src/components/AssignmentDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const AssignmentDetails = () => {
    const { id } = useParams();
    const [assignment, setAssignment] = useState(null);

    useEffect(() => {
        // Fetch assignment details from the backend
        fetchAssignment(id).then(setAssignment);
    }, [id]);

    const updateGrade = (newGrade) => {
        // Update the assignment grade
        // Assume updateAssignmentGrade is a function that updates the grade in the backend
        updateAssignmentGrade(id, newGrade).then((updatedAssignment) =>
            setAssignment(updatedAssignment)
        );
    };

    if (!assignment) return <div>Loading...</div>;

    return (
        <div className='bg-gray-100 md:px-16 md:py-4 px-8 h-dvh'>
            <div className='text-2xl mt-8 mb-4'>Assignment Details</div>

            <div className='text-xl my-4 '>{assignment.title}</div>
            <div className='mb-4 text-lg text-gray-600'>status : {assignment.grade}</div>
        <div>
        <button className="bg-green-700 mt-4 px-8 py-2 rounded text-white m-2" onClick={() => updateGrade('Pass')}>Pass</button>
        <button className="bg-red-700 mt-4 px-8 py-2 rounded text-white" onClick={() => updateGrade('Fail')}>Fail</button>
        </div>
        </div>
    );
};

const fetchAssignment = async (id) => {
    // Placeholder for API call
    return { id, title: 'Assignment Title', description: 'Assignment Description', grade: 'Pending' };
};

const updateAssignmentGrade = async (id, newGrade) => {
    // Placeholder for API call
    return { id, title: 'Assignment Title', dueDate: "2024-06-24", grade: newGrade };
};

export default AssignmentDetails;
