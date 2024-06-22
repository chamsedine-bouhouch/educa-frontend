import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const TeacherDetails = () => {
    const { id } = useParams();
    const [teacher, setTeacher] = useState(null);

    useEffect(() => {
        // Fetch teacher details and assigned students from the backend
        fetchTeacher(id).then(setTeacher);
    }, [id]);

    if (!teacher) return <div>Loading...</div>;

    return (
        <div className='bg-gray-100 px-16 py-8 h-dvh'>
            <div className='text-2xl mb-4'>Teacher Details</div>
            <h1>{teacher.id} - {teacher.name}</h1>
        </div>
    );
};

const fetchTeacher = async (id) => {
    // Placeholder for API call
    return { id, name: 'Teacher Name' };
};


export default TeacherDetails;
