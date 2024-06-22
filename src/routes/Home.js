import React, { useEffect, useState } from 'react';
import TeacherList from '../components/TeacherList';
import { faker } from '@faker-js/faker';
import AddTeacherForm from '../components/AddTeacherForm';

const Home = () => {
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        // Fetch the list of teachers from the backend
        fetchTeachers().then(setTeachers);
    }, []);

    return (
        <div className='bg-gray-100 md:px-16 md:py-4 px-8 h-full'>
            <AddTeacherForm />
            <div className='text-2xl mt-8 mb-4'>Teachers List</div>
            <TeacherList teachers={teachers} />
        </div>
    );
};
function generateTeachers(num) {
    const teachers = [];
    for (let i = 1; i <= num; i++) {
        teachers.push({
            id: i,
            name: faker.person.fullName(),
            email: faker.internet.email(),
            image: faker.image.avatar(),
        });
    }
    return teachers;
}
const fetchTeachers = async () => {
    // Placeholder for API call
    return generateTeachers(20)
};

export default Home;
