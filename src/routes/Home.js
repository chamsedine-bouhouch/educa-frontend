import React from 'react';
import TeacherList from '../components/TeacherList';
 import { Link } from 'react-router-dom';

const Home = () => {
    
    return (
        <div className='bg-gray-100 md:px-16 md:py-4 px-8 min-h-screen'>
             <Link to="/add-teacher" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 inline-block">
                Add Teacher
            </Link>
            <div className='text-2xl mt-8 mb-4'>Teachers List</div>
            <TeacherList />
        </div>
    );
};

export default Home;
