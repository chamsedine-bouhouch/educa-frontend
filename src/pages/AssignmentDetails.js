// src/components/AssignmentDetails.js
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import UseTeachersContext from '../hooks/use-teachers-context';

const AssignmentDetails = () => {
    const { id } = useParams();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const { assignment, fetchAssignment, updateAssignmentGrade } = UseTeachersContext();

    useEffect(() => {
        const getAssignment = async () => {
            try {
                await fetchAssignment(id);
            } catch (err) {
                setError('Failed to fetch assignment.');
            } finally {
                setLoading(false);
            }
        };
        getAssignment();
    }, [id, fetchAssignment]);

    const toggleGrade = async () => {
        const newGrade = assignment.status === 'Pass' ? 'Fail' : 'Pass';
        try {
            await updateAssignmentGrade(id, newGrade);
            setError('');
        } catch (err) {
            setError('Failed to update assignment grade.');
        }
    };

    if (loading) return <div className='flex justify-center mt-4 text-xl'>Loading...</div>;
    if (error) return <div className="flex justify-center mt-4 text-xl text-red-500">{error}</div>;


    if (!assignment) {
        return <div className='flex justify-center mt-4 text-xl text-red-500'>Assignment not found</div>;
    }
    return (

        <div className='min-h-screen bg-gray-100 md:px-16 md:py-4 px-8 '>
            <div className='text-2xl mt-8 mb-4'>Assignment Details</div>
            <div className='flex flex-col items-center justify-center' >
                <div className='text-xl my-4 '>{assignment.title}</div>
                <div className='mb-4 text-lg text-gray-600'>
                    Status: {assignment.status === 'Pass' ? 'Pass' : 'Fail'}
                </div>
                <div>
                    <button
                        className={`mt-4 px-8 py-2 rounded text-white ${assignment.status === 'Pass' ? 'bg-red-700' : 'bg-green-700'}`}
                        onClick={toggleGrade}
                    >
                        {assignment.status === 'Pass' ? 'Fail' : 'Pass'}
                    </button>
                </div>
            </div>
            <Link to="/" className="text-blue-500 hover:underline mt-4 block">
                Back to Home
            </Link>
        </div>
    );
};

export default AssignmentDetails;
