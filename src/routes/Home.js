import React from 'react';
import TeacherList from '../components/TeacherList';
import AddTeacherForm from '../components/AddTeacherForm';

const Home = () => {
    
    return (
        <div className='bg-gray-100 md:px-16 md:py-4 px-8 h-full'>
            <AddTeacherForm />
            <div className='text-2xl mt-8 mb-4'>Teachers List</div>
            <TeacherList />
        </div>
    );
};

export default Home;
